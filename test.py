from app.telemetry.logger_config import get_logger, set_discussion_id
from app.utils.conversation_utils import ConversationUtils
from app.connection.establish_db_connection import get_mongo_db, get_node_db
from app.conversation.conversation_finder import ConversationFinder
from app.routes.chat_route import ChatContext
from app.utils.logs_utils import get_path
from llm_wrapper.utils.base_tools import DynamicToolFactory, ToolRegistry
from llm_wrapper.core.llm_interface import LLMInterface
from app.utils.kg_inspect.kg_tool import KgTools
from app.utils.kg_inspect.knowledge_cli import get_model_name
import json
import litellm
import asyncio
from uuid import uuid4

def answer_question_sync(reporter, session_id, project_id, user_id, question, discussion_id=None):
    try:
        print("Starting answer_question_sync")
        asyncio.run(answer_question(reporter, session_id, project_id, user_id, question, discussion_id))
    except Exception as e:
        print(f"Exception {e}")

logger = get_logger(__name__)

async def answer_question(reporter, session_id, project_id, user_id, question, message_uuid, discussion_id=None):
    try:
        print("Starting answer_question")
        reporter.is_answering_question = True
        
        context = ChatContext(
            project_id=project_id,
            user_id=user_id,
            message=question,
            discussion_id=discussion_id,
            agent_name='code_query'
        )
        
        _utils = ConversationUtils(context)
        _chat = ConversationFinder(context)
        node_db = get_node_db()
        user_prompt = question
        
        system_prompt = 'You are an expert software engineer. Your task is to answer questions about a software project.  Use the provided tools to get ' \
                    'information about the project codebase and to determine what files in the project are relevant to the question. ' \
                    'Use mermaid charts for diagrams and Title of the charts, unless other mechanisms were requested by the user.' \
        
        docs_prompt = '''
           You are an expert technical writer as well. Your task is to convert software project information into clear, well-structured documentation.
            1. Document Structure Requirements:
                - Use clear hierarchical sections (1.0, 1.1, etc.)
                - Always start the document generation with Document:

            2. Writing Style:
                - STRICTLY: Use complete sentences or paragraph to explain all sections and sub sections.
                - When using bullet points PROVIDE detailed description for the same   
        '''

        
                    
        if discussion_id:
            messages = await _utils._load_discussion(int(context.discussion_id),count=10)      
            
        else:
            messages = []
            discussion_id = await _chat._create_conversation('code_query', context.user_id , session_id)
            
        # Generate message UUID for user's question
        messages.append({
            "role": "system",
            "content": system_prompt + docs_prompt
        })
        
        
        
        try:
            set_discussion_id(discussion_id)
            
            litellm.drop_params=True

            model_name = await get_model_name("code_inspection",user_id)
                    
            general_registry = ToolRegistry()
            general_registry.register_tool("KgTools", KgTools)
            
            general_factory = DynamicToolFactory(general_registry)
            general_exec_agent = general_factory.create_dynamic_tool(["KgTools"])
            kg_tool = general_exec_agent('/test', logger=None, user_id=session_id)
            
            llm = LLMInterface(str(get_path()), 'knowledge', user_id, int(project_id), 'code_query', mongo_handler=get_mongo_db())
            cp = messages.copy()
            messages.append({
                "role": "user",
                "content": user_prompt 
            })
            logger.info(messages)
            logger.info(kg_tool.function_schemas)
            logger.info(kg_tool.function_executor)
            
            
            
            completion = await llm.llm_interaction_wrapper(
                messages=cp,
                user_prompt=user_prompt,
                system_prompt=None,
                model=model_name,
                stream=True,
                response_format={"type": "json_object"},
                function_schemas=kg_tool.function_schemas,
                function_executor=kg_tool.function_executor
            )   
            
            llm_response = ""
            STREAM_DELAY = 0.1  # 100ms delay between chunks
            
            async for res in completion:
                if "Checking the data" in res:
                    yield f"data: {json.dumps({'content': 'Your code-related insights will be available shortly...', 'message_uuid': message_uuid})}\n\n"
                    await asyncio.sleep(STREAM_DELAY)
                    
                elif "Reading File:" in res:
                    reporter.send_message("code_query", {
                        "message": res,
                        "message_uuid": message_uuid
                    })
                    yield f"data: {json.dumps({'content': res, 'message_uuid': message_uuid})}\n\n"
                    await asyncio.sleep(STREAM_DELAY)
                    
                else:
                    llm_response += res
                    reporter.send_message("code_query", {
                        "message": llm_response,
                        "discussion_id": discussion_id,
                        "message_uuid": message_uuid
                    })
                    yield f"data: {json.dumps({'content': llm_response, 'discussion_id': discussion_id, 'message_uuid': message_uuid})}\n\n"
                    await asyncio.sleep(STREAM_DELAY)

            logger.info(f"Final Response : {llm_response}")
            
            def add_document_end_marker(message):
                if '-------------------\nDocument:' in message and not message.endswith('-------------------'):
                    return message + '\n\n-------------------'
                return message

            reporter.send_message("code_query", {
                "message_end": True,
                "message": add_document_end_marker(llm_response),
                "message_uuid": message_uuid
            })
            
            # Generate message UUID for assistant's response
            assistant_message_uuid = str(uuid4())
            messages.append({
                "role": "assistant",
                "content": llm_response
            })
            
            
            await node_db.update_node_by_id(int(discussion_id), {'Discussion': json.dumps(messages)})            
                
        except Exception as e:
            print(f"Exception {e}")
    except Exception as e:
        print(f"Exception {e}")
    finally:
        reporter.is_answering_question = False