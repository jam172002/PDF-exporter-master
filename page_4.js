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


function Container4(doc) {
    // First, call the building value table
    let yPos = buildingValueTable(doc);
    yPos += 10; // Add some spacing between tables
    
    // Now create the second table
    const leftMargin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const tableWidth = pageWidth - (leftMargin + rightMargin);
    
    // Define column widths
    const colWidths = {
        serial: 15,
        description: tableWidth - 85, // Adjust this width
        amount: 70
    };
    
    // Function to add a row
    function addRow(label, description, amount, isBold = false) {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(8);
        
        // Draw cells
        doc.rect(leftMargin, yPos, colWidths.serial, 7);
        doc.rect(leftMargin + colWidths.serial, yPos, colWidths.description, 7);
        doc.rect(leftMargin + colWidths.serial + colWidths.description, yPos, colWidths.amount, 7);
        
        // Add text
        if (label) {
            doc.text(label.toString(), leftMargin + 2, yPos + 5);
        }
        doc.text(description, leftMargin + colWidths.serial + 2, yPos + 5);
        if (amount) {
            doc.text(amount, leftMargin + colWidths.serial + colWidths.description + 2, yPos + 5);
        }
        
        yPos += 7;
    }
    
    // Add section B: EXTRA ITEM
    addRow('B', 'EXTRA ITEM', 'Amount in Rs.', true);
    addRow('1', 'Portico', 'Under Construction');
    addRow('2', 'Ornamental front door', '"');
    addRow('3', 'Sit out / Verandah with steel grills', '"');
    addRow('4', 'Bore well / Overhead Tank / Sump / Solar', 'Provided');
    addRow('5', 'Extra steel / Collapsible gates', 'Under Construction');
    addRow('', 'Total', 'Rs.2,50,000.00', true);
    
    // Add section C: AMENITIES
    addRow('C', 'AMENITIES', '', true);
    addRow('1', 'Wardrobes', '');
    addRow('2', 'Glazed Tiles', '');
    addRow('3', 'Extra sinks & bath tubs', '');
    addRow('4', 'Marble / Ceramic tiles flooring', '');
    addRow('5', 'Interior decorations', 'Under Construction');
    addRow('6', 'Architectural Elevation works', '');
    addRow('7', 'Paneling works', '');
    addRow('8', 'Aluminium works', '');
    addRow('9', 'Aluminium hand rails', '');
    addRow('10', 'False ceilings', '');
    addRow('', 'Total', 'Rs.0.00', true);
    

    
    return yPos;
}

function buildingValueTable(doc) {
    const startY = 30;
    const leftMargin = 10;
    const rightMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (leftMargin + rightMargin);
    
    let yPosition = startY;
    
    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('BUILDING VALUE:', leftMargin, yPosition);
    yPosition += 8;

    // Define column widths (adjusted for 9 columns)
    const colWidths = {
        slNo: 12,
        particulars: 29,
        roof: 13,
        area: 19,
        rate: 20,
        amountIn: 30,
        deprnIn: 20,
        deprnAmount: 25,
        netAmount: 25
    };

    // Header row
    doc.setFontSize(7);
    doc.rect(leftMargin, yPosition, colWidths.slNo, 10);
    doc.text('SL\nNo.', leftMargin + 1, yPosition + 4);
    
    let xPos = leftMargin + colWidths.slNo;
    doc.rect(xPos, yPosition, colWidths.particulars, 10);
    doc.text('PARTICULARS', xPos + 2, yPosition + 6);
    
    xPos += colWidths.particulars;
    doc.rect(xPos, yPosition, colWidths.roof, 10);
    doc.text('ROOF', xPos + 2, yPosition + 6);
    
    xPos += colWidths.roof;
    doc.rect(xPos, yPosition, colWidths.area, 10);
    doc.text('AREA IN\nSFT', xPos + 2, yPosition + 4);
    
    xPos += colWidths.area;
    doc.rect(xPos, yPosition, colWidths.rate, 10);
    doc.text('RATE IN\nRs', xPos + 2, yPosition + 4);
    
    xPos += colWidths.rate;
    doc.rect(xPos, yPosition, colWidths.amountIn, 10);
    doc.text('AMOUNT IN\nRs', xPos + 2, yPosition + 4);
    
    xPos += colWidths.amountIn;
    doc.rect(xPos, yPosition, colWidths.deprnIn, 10);
    doc.text('DEPRN\nIN %', xPos + 2, yPosition + 4);
    
    xPos += colWidths.deprnIn;
    doc.rect(xPos, yPosition, colWidths.deprnAmount, 10);
    doc.text('DEPRN\nAMOUNT', xPos + 2, yPosition + 4);
    
    xPos += colWidths.deprnAmount;
    doc.rect(xPos, yPosition, colWidths.netAmount, 10);
    doc.text('NET\nAMOUNT', xPos + 2, yPosition + 4);

    yPosition += 10;

    // Function to add a row
    function addRow(slNo, particulars, roof, area, rate, amountIn, deprnIn, deprnAmount, netAmount) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        
        let xPos = leftMargin;
        doc.rect(xPos, yPosition, colWidths.slNo, 7);
        if(slNo) doc.text(slNo.toString(), xPos + 1, yPosition + 4);
        
        xPos += colWidths.slNo;
        doc.rect(xPos, yPosition, colWidths.particulars, 7);
        doc.text(particulars, xPos + 1, yPosition + 4);
        
        xPos += colWidths.particulars;
        doc.rect(xPos, yPosition, colWidths.roof, 7);
        doc.text(roof, xPos + 1, yPosition + 4);
        
        xPos += colWidths.roof;
        doc.rect(xPos, yPosition, colWidths.area, 7);
        if(area) doc.text(area.toString(), xPos + 1, yPosition + 4);
        
        xPos += colWidths.area;
        doc.rect(xPos, yPosition, colWidths.rate, 7);
        if(rate) doc.text(rate.toString(), xPos + 1, yPosition + 4);
        
        xPos += colWidths.rate;
        doc.rect(xPos, yPosition, colWidths.amountIn, 7);
        if(amountIn) doc.text(amountIn.toString(), xPos + 1, yPosition + 4);
        
        xPos += colWidths.amountIn;
        doc.rect(xPos, yPosition, colWidths.deprnIn, 7);
        if(deprnIn) doc.text(deprnIn.toString(), xPos + 1, yPosition + 4);
        
        xPos += colWidths.deprnIn;
        doc.rect(xPos, yPosition, colWidths.deprnAmount, 7);
        if(deprnAmount) doc.text(deprnAmount.toString(), xPos + 1, yPosition + 4);
        
        xPos += colWidths.deprnAmount;
        doc.rect(xPos, yPosition, colWidths.netAmount, 7);
        if(netAmount) doc.text(netAmount.toString(), xPos + 1, yPosition + 4);
        
        yPosition += 7;
    }

    // Add data rows with all columns
    addRow('', 'AS PER ACTUALS', '', '', '', '', '', '', '');
    addRow('1', 'Stilt Floor', 'RCC', '2,000.00', '500.00', '10,00,000.00', '0.00', '0.00', '10,00,000.00');
    addRow('2', 'Ground Floor', 'RCC', '2,000.00', '300.00', '6,00,000.00', '0.00', '0.00', '6,00,000.00');
    addRow('', 'Total', '', '4,000.00', '', '16,00,000.00', '', '0.00', '16,00,000.00');
    addRow('', 'AS PER PLAN- For Present Stage Considered', '', '', '', '', '', '', '');
    addRow('1', 'Stilt Floor', 'RCC', '1,371.79', '500.00', '6,85,896.20', '0.00', '0.00', '6,85,896.20');
    addRow('2', 'Ground Floor', 'RCC', '1,371.79', '300.00', '4,11,537.72', '0.00', '0.00', '4,11,537.72');
    addRow('3', 'First Floor', 'RCC', '1,371.79', '0.00', '0.00', '0.00', '0.00', '0.00');
    addRow('4', 'Second Floor', 'RCC', '1,371.79', '0.00', '0.00', '0.00', '0.00', '0.00');
    addRow('5', 'Third Floor', 'RCC', '1,371.79', '0.00', '0.00', '0.00', '0.00', '0.00');
    addRow('6', 'Terrace Floor', 'RCC', '265.56', '0.00', '0.00', '0.00', '0.00', '0.00');
    addRow('', 'Total', '', '7,124.52', '', '10,97,433.92', '', '0.00', '10,97,433.92');

    return yPosition;
}
function createTable(doc, startY, title, subtitle = null) {
    let yPosition = startY;
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 18;  // Changed to 10
    const rightMargin = 10; // Kept as 20
    const tableWidth = pageWidth - (leftMargin + rightMargin); // Updated calculation
    
    // Only add title and subtitle if they are provided
    if (title) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
        
        // Add underline for title
        const lineWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
        const lineStart = (pageWidth - lineWidth) / 2;
        doc.line(lineStart, yPosition + 1, lineStart + lineWidth, yPosition + 1);
    }
    
    if (subtitle) {
        yPosition += 5;
        doc.rect(leftMargin, yPosition, tableWidth, 8);  // Updated to use leftMargin
        doc.setFontSize(11);
        doc.text(subtitle, pageWidth / 2, yPosition + 5.5, { align: 'center' });
        yPosition += 8;
    }
    
    const col1Width = 10;
    const col2Width = 85;
    const col3Width = tableWidth - col1Width - col2Width;
    
    function addRow(number, description, value, height = 8, no_column = false) {
        if (no_column) {
            // Draw only two columns when no_column is true
            doc.rect(leftMargin, yPosition, col1Width, height);  // Updated to use leftMargin
            doc.rect(leftMargin + col1Width, yPosition, col2Width + col3Width, height);  // Updated to use leftMargin
            
            if (number) {
                doc.setFont('helvetica', 'normal');
                doc.text(number.toString(), leftMargin + 1, yPosition + 5);  // Updated to use leftMargin
            }
            
            // Set bold font for description when no_column is true
            doc.setFont('helvetica', 'bold');
            const splitDescription = doc.splitTextToSize(description, (col2Width + col3Width) - 4);
            doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 5);  // Updated to use leftMargin
        } else {
            // Original three-column layout
            doc.rect(leftMargin, yPosition, col1Width, height);  // Updated to use leftMargin
            doc.rect(leftMargin + col1Width, yPosition, col2Width, height);  // Updated to use leftMargin
            doc.rect(leftMargin + col1Width + col2Width, yPosition, col3Width, height);  // Updated to use leftMargin
            
            if (number) {
                doc.setFont('helvetica', 'normal');
                doc.text(number.toString(), leftMargin + 2, yPosition + 5);  // Updated to use leftMargin
            }
            
            doc.setFont('helvetica', 'normal');
            const splitDescription = doc.splitTextToSize(description, col2Width - 4);
            doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 5);  // Updated to use leftMargin
            
            const splitValue = doc.splitTextToSize(value, col3Width - 4);
            if (value.includes('Mrs')) {
                doc.setFont('helvetica', 'bold');
            }
            doc.text(splitValue, leftMargin + col1Width + col2Width + 2, yPosition + 5);  // Updated to use leftMargin
        }
        
        yPosition += height;
        return yPosition;
    }
    
    return {
        addRow,
        getPosition: () => yPosition
    };
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

function generatePDF(formData) {
   const { jsPDF } = window.jspdf;
   const doc = new jsPDF();
   
//   header(doc)
//   Container1(doc)
//   addFooter(doc)
   
//   doc.addPage()
//   header(doc,2)
//   Container2(doc)
//   addFooter(doc)
   
//   doc.addPage()
   header(doc,2)
   Container4(doc)
   addFooter(doc)
//   doc.save('valuation_report_first_page.pdf');
   return doc;
}