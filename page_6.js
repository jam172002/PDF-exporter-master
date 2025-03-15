function header(doc, page=1){
    // Set page margins and initial position
   const margin = 10;
   const pageWidth = doc.internal.pageSize.getWidth();
   let yPosition = margin;
   
   // Add company name
   doc.setFontSize(16);
   doc.setTextColor(65, 105, 225);
   doc.setFont('helvetica', 'bold');
   doc.text('TRUE PEAK HOUSE LLP', pageWidth / 3, yPosition, { align: 'center' });
   
   // Add company details
   yPosition += 5;
   doc.setFontSize(9);
   doc.setFont('helvetica', 'normal');
   const address = 'GSTIN: 29AAUFT3926A1ZW, #240/C, FIRST FLOOR, 3RD BLOCK, NAGARABHAVI 2ND STAGE,';
   doc.text(address, pageWidth / 2.4, yPosition, { align: 'center' });
   
   // Add contact details
   yPosition += 5;
   doc.setFontSize(11);
   
   const contact = 'Bengaluru: 560072. MOB: +91 9743142447 | balakrishna@truepeak.in | www.truepeak.in';
   doc.text(contact, pageWidth / 2.3, yPosition, { align: 'center' });
   doc.setTextColor(0, 0, 0); // Reset back to black for subsequent text

   // Add horizontal line
   yPosition += 2;
   doc.setLineWidth(0.1);
   doc.line(margin, yPosition, pageWidth - margin, yPosition);
   
   if(page==1){
       // Add recipient details
       yPosition += 11;
       doc.setFont('helvetica', 'normal');
       doc.text('To,', margin + 5, yPosition);
       yPosition += 5;
       doc.setFont('helvetica', 'bold');
       doc.text('THE MANAGER (Branch Head),', margin + 5, yPosition);
       yPosition += 5;
       doc.text('THE JANATHA CO-OPERATIVE BANK Ltd,', margin + 5, yPosition);
       yPosition += 5;
       doc.text('MALLESHWARAM,', margin + 5, yPosition);
   }
}


function Container6(doc) {
    let yPos = 30;
    const leftMargin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const textWidth = pageWidth - (leftMargin + rightMargin);
    
    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('VALUATION CERTIFICATE', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Add valuation text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    const valuationText = `As a result of my appraisal and analysis, it is my considered opinion that the present fair market value of the above property in the prevailing condition with aforesaid specifications is Rs.3,73,00,000/- RUPEES THREE CRORE SEVENTY THREE LAKHS ONLY. The Realizable value of the property is Rs.3,35,00,000/- RUPEES THREE CRORE THIRTY FIVE LAKHS ONLY and the Distress / Forced Sale value is Rs.2,90,00,000/- RUPEES TWO CRORE NINTY LAKHS ONLY.`;
    
    const splitText = doc.splitTextToSize(valuationText, textWidth);
    const lineHeight = 6; // Adjust this value to change line spacing
    
    splitText.forEach((line, index) => {
        doc.text(line, leftMargin, yPos + (index * lineHeight));
    });
    yPos += splitText.length *7;

    // Declaration table
    const colWidths = {
        serial: 20,
        content: textWidth - 20
    };

    // Function to add declaration row
    function addDeclarationRow(serial, content, isBold = false) {
        const height = Math.max(7, Math.ceil(doc.splitTextToSize(content, colWidths.content - 4).length * 7));
        
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(9);
        
        // Draw cells
        doc.rect(leftMargin, yPos, colWidths.serial, height);
        doc.rect(leftMargin + colWidths.serial, yPos, colWidths.content, height);
        
        // Add text
        if(serial) {
            doc.text(serial.toString(), leftMargin + 2, yPos + 5);
        }
        
        const splitContent = doc.splitTextToSize(content, colWidths.content - 4);
        doc.text(splitContent, leftMargin + colWidths.serial + 2, yPos + 5);
        
        yPos += height;
        return height;
    }

    // Add declaration rows
    addDeclarationRow('16', 'Declaration', true);
    addDeclarationRow('a', 'I hereby declare that', true);
    addDeclarationRow('i)', 'The information provided is true and correct to the best of my knowledge and belief.');
    addDeclarationRow('ii)', 'The analysis and conclusion are limited by the reported assumptions and conditions.');
    addDeclarationRow('iii)', 'I have read the Handbook on policy, Standard and Procedures for real Estate valuation by banks and HFIs in India, 2011, issued by IBA and NHB, fully understood the provisions of the same and followed the provisions of the same to the best of my ability and this report is in conformity to the standards of Reporting enshrined in the above Handbook.');
    addDeclarationRow('iv)', 'I have no direct or indirect interest in the above property valued.');
    addDeclarationRow('v)', 'The Property was inspected by me on 03/12/2024 along with the Owner.');
    addDeclarationRow('vi)', 'I am a registered valuer under section 34AB of Wealth tax act, 1957, CAT-I/Reg.No.02/PCIT-I/CCIT/BNG-1/2023-24 for valuing property.');
    addDeclarationRow('vii)', 'The valuation made with reference to the photocopies given only irrespective of the legal opinion');
    addDeclarationRow('viii )', 'The validity of the report is only for 3 months and is to be used purpose intended for and not for any other purpose');

    return yPos;
} 
function addFooter(doc) {
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add horizontal line at the bottom
    const footerY = pageHeight - 20;
    doc.setLineWidth(0.1);
    doc.line(margin, footerY + 4, pageWidth - margin, footerY + 4);
    
    // Add the chartered engineers text
    doc.setFontSize(9);
    doc.setTextColor(65, 105, 225); // Blue color
    doc.setFont('helvetica', 'bold');
    doc.text('CHARTERED ENGINEERS | STRUCTURAL CONSULTANTS | N.D.T | R&R | VALUATION OF IMMOVABLE PROPERTIES.', 
        pageWidth / 2, footerY + 9, { align: 'center' });
    
    // Add reference number and page number on next line
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0); // Reset back to black for subsequent text
    // Reference number on left
    doc.text('TP/JCB/K-BKR/R-09/12/2024-25', margin + 5, footerY + 15);
    // Page number on right
    doc.text('Page 1', pageWidth - margin - 20, footerY + 15);
 }

function generatePDF() {
   const { jsPDF } = window.jspdf;
   const doc = new jsPDF();

   
//   doc.addPage()
   header(doc,2)
   Container6(doc)
   addFooter(doc)
//   doc.save('valuation_report_first_page.pdf');
   return doc;
}