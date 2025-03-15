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


function Container5(doc) {
    let yPos = 30;
    const leftMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const tableWidth = pageWidth - (leftMargin + rightMargin);
    
    // Define column widths for first table
    const colWidths = {
        serial: 15,
        description: tableWidth - 85,
        amount: 70
    };
    
    // Function to add a row for first table
    function addRow(label, description, amount, isBold = false) {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(8);
        
        doc.rect(leftMargin, yPos, colWidths.serial, 7);
        doc.rect(leftMargin + colWidths.serial, yPos, colWidths.description, 7);
        doc.rect(leftMargin + colWidths.serial + colWidths.description, yPos, colWidths.amount, 7);
        
        if (label) {
            doc.text(label.toString(), leftMargin + 2, yPos + 5);
        }
        doc.text(description, leftMargin + colWidths.serial + 2, yPos + 5);
        if (amount) {
            doc.text(amount, leftMargin + colWidths.serial + colWidths.description + 2, yPos + 5);
        }
        
        yPos += 7;
    }
    
    // Add section D: MISCELLANEOUS
    addRow('D', 'MISCELLANEOUS', '', true);
    addRow('1', 'Separate toilet room', 'Under Construction');
    addRow('2', 'Separate lumber room', '"');
    addRow('', 'Total', 'Rs.0.00', true);
    
    // Add section E: SERVICES
    addRow('E', 'SERVICES', '', true);
    addRow('1', 'Water supply arrangements', 'Under Construction');
    addRow('2', 'Drainage arrangements', '"');
    addRow('3', 'Compound wall / gate', '"');
    addRow('4', 'C.B. Deposits, Fittings, Power etc.,', '"');
    addRow('5', 'Pavement', '"');
    addRow('', 'Total', 'Rs.0.00', true);

    // Add spacing between tables
    yPos += 5;

    // Define column widths for summary table
    const summaryColWidths = {
        serial: 15,
        description: 50,
        amount: 30,
        deprn: 30,
        deprnAmount: 30,
        netAmount: 30
    };

    // Function to add a row for summary table
    function addSummaryRow(serial, description, amount, deprn, deprnAmount, netAmount, isBold = false) {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(8);
        
        let xPos = leftMargin;
        
        // Draw cells
        doc.rect(xPos, yPos, summaryColWidths.serial, 7);
        xPos += summaryColWidths.serial;
        
        doc.rect(xPos, yPos, summaryColWidths.description, 7);
        xPos += summaryColWidths.description;
        
        doc.rect(xPos, yPos, summaryColWidths.amount, 7);
        xPos += summaryColWidths.amount;
        
        doc.rect(xPos, yPos, summaryColWidths.deprn, 7);
        xPos += summaryColWidths.deprn;
        
        doc.rect(xPos, yPos, summaryColWidths.deprnAmount, 7);
        xPos += summaryColWidths.deprnAmount;
        
        doc.rect(xPos, yPos, summaryColWidths.netAmount, 7);
        
        // Add text
        xPos = leftMargin;
        if(serial) doc.text(serial.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.serial;
        doc.text(description, xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.description;
        if(amount) doc.text(amount.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.amount;
        if(deprn) doc.text(deprn.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.deprn;
        if(deprnAmount) doc.text(deprnAmount.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.deprnAmount;
        if(netAmount) doc.text(netAmount.toString(), xPos + 2, yPos + 5);
        
        yPos += 7;
    }

    // Add summary table rows
    addSummaryRow('1', 'EXTRA ITEM', '250000.00', '0.00', '0.00', '250000.00');
    addSummaryRow('2', 'AMENITIES', '0.00', '0.00', '0.00', '0.00');
    addSummaryRow('3', 'MISCELLANEOUS', '0.00', '0.00', '0.00', '0.00');
    addSummaryRow('4', 'SERVICES', '0.00', '0.00', '0.00', '0.00');
    addSummaryRow('', 'TOTAL', '250000.00', '', '0.00', '250000.00', true);
    
    yPos += 7;

    // Add title for the abstract table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL ABSTRACT OF THE ENTIRE PROPERTY', leftMargin, yPos);
    yPos += 5;

    // Define column widths for abstract table
    const abstractColWidths = {
        slNo: 30,
        particulars: pageWidth - (leftMargin + rightMargin) - 100,
        amount: 70
    };

    // Function to add row for abstract table
    function addAbstractRow(slNo, particulars, amount, isBold = false, indent = false) {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(8);
        
        // Draw cells
        doc.rect(leftMargin, yPos, abstractColWidths.slNo, 7);
        doc.rect(leftMargin + abstractColWidths.slNo, yPos, abstractColWidths.particulars, 7);
        doc.rect(leftMargin + abstractColWidths.slNo + abstractColWidths.particulars, yPos, abstractColWidths.amount, 7);
        
        // Add text
        if(slNo) {
            let xOffset = indent ? 5 : 2;
            doc.text(slNo, leftMargin + xOffset, yPos + 5);
        }
        doc.text(particulars, leftMargin + abstractColWidths.slNo + 2, yPos + 5);
        if(amount) {
            doc.text(amount, leftMargin + abstractColWidths.slNo + abstractColWidths.particulars + 2, yPos + 5);
        }
        
        yPos += 7;
    }

    // Add abstract table rows
    addAbstractRow('I', 'MARKET VALUE OF THE PROPERTY', '', true);
    addAbstractRow('A', 'LAND', '3,60,00,000.00', false, true);
    addAbstractRow('B', 'BUILDING', '10,97,433.92', false, true);
    addAbstractRow('C', 'EXTRA ITEM', '', false, true);
    addAbstractRow('D', 'AMENITIES', '', false, true);
    addAbstractRow('E', 'MISCELLANEOUS', '2,50,000.00', false, true);
    addAbstractRow('F', 'SERVICES', '', false, true);
    addAbstractRow('', 'TOTAL', '3,73,47,433.92', true);
    addAbstractRow('', 'SAY', '3,73,00,000.00', true);
    addAbstractRow('', 'REALISABLE SALE VALUE', '3,35,00,000.00');
    addAbstractRow('', 'FORCED SALE VALUE', '2,90,00,000.00');
    addAbstractRow('II', 'GUIDANCE VALUE OF THE PROPERTY', '', true);
    addAbstractRow('A', 'LAND', '1,90,03,717.47', false, true);
    addAbstractRow('B', 'BUILDING', '10,97,433.92', false, true);
    addAbstractRow('', 'TOTAL', '2,01,01,151.39', true);
    addAbstractRow('', 'SAY', '2,01,00,000.00', true);


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
   Container5(doc)
   addFooter(doc)
//   doc.save('valuation_report_first_page.pdf');
   return doc;
}