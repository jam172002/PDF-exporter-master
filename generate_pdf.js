// Initialize Ace editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

// Initial code for the editor
const initialCode = `function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Create an image element
    const img = new Image();
    img.src = 'images/logo.png';

    // Wait for image to load before creating PDF
    return new Promise((resolve) => {
        img.onload = function() {
            // Add image to PDF
            doc.addImage(img, 'PNG', 10, 10, 50, 50); // Adjust x, y, width, height as needed

            doc.setFontSize(14);
            doc.text('Hello, this is a sample PDF!', 20, 80);

            resolve(doc);
        };
        
        img.onerror = function() {
            console.error('Error loading image');
            doc.setFontSize(14);
            doc.text('Error loading image', 20, 20);
            resolve(doc);
        };
    });
}`;

editor.setValue(initialCode);

// Function to update the preview
async function updatePreview() {
    const code = editor.getValue();
    try {
        // Evaluate the code
        eval(code);
        
        // Generate the PDF
        const doc = await generatePDF();
        
        // Convert to blob
        const blob = doc.output('blob');
        
        // Create object URL
        const url = URL.createObjectURL(blob);
        
        // Load PDF.js
        pdfjsLib.getDocument(url).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                page.render(renderContext);
                
                const previewDiv = document.getElementById('preview');
                previewDiv.innerHTML = '';
                previewDiv.appendChild(canvas);
            });
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        document.getElementById('preview').innerHTML = '<p>Error generating PDF. Check the console for details.</p>';
    }
}

// Add event listener for changes in the editor
editor.session.on('change', () => {
    updatePreview().catch(console.error);
});

// Initial preview update
updatePreview().catch(console.error);