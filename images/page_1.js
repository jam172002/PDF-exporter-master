

function Container1(doc) {
    // Initial settings
    const margin = 18;
    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (margin * 1.55);
    let yPosition = 10;

    // Add logo on the right side
    const img = new Image();
    img.src = 'images/logo.png';

    return new Promise((resolve) => {
        img.onload = function() {
            // Logo dimensions
            const logoWidth = 30;
            const logoHeight = 30;
            const logoX = pageWidth - margin - logoWidth - 3;
            doc.addImage(img, 'PNG', logoX + 8, yPosition - 2, logoWidth, logoHeight);

            // Draw the main outer box
            const pageHeight = doc.internal.pageSize.getHeight() - 30;
            doc.rect(margin, yPosition, tableWidth, pageHeight - yPosition - 188);

            // Company header
            doc.setFontSize(16);
            doc.setTextColor(65, 105, 225);
            doc.setFont('helvetica', 'bold');
            doc.text('TRUE PEAK HOUSE LLP', pageWidth / 9, yPosition + 10);

            // Company details
            yPosition += 15;
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            const address = 'GSTIN: 29AAUFT3926A1ZW, #240/C, FIRST FLOOR, 3RD BLOCK, NAGARABHAVI 2ND STAGE,';
            doc.text(address, pageWidth / 9, yPosition);

            // Contact details
            yPosition += 5;
            const contact = 'Bengaluru: 560072. MOB: +91 9743142447 | balakrishna@truepeak.in | www.truepeak.in';
            doc.text(contact, pageWidth / 9, yPosition);

            // Title section
            yPosition += 6;
            doc.setTextColor(0, 0, 0);
            doc.rect(margin, yPosition, tableWidth, 8);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text('VALUATION REPORT - IMMOVABLE PROPERTY', pageWidth / 2, yPosition + 5.5, { align: 'center' });

            // Bank details
            yPosition += 10;
            doc.setFont('helvetica', 'normal');
            doc.text('To,', margin + 5, yPosition + 5);
            doc.setFont('helvetica', 'bold');
            doc.text('THE MANAGER (Branch Head),', margin + 5, yPosition + 12);
            doc.text('THE JANATHA CO-OPERATIVE BANK Ltd,', margin + 5, yPosition + 19);
            doc.text('MALLESHWARAM,', margin + 5, yPosition + 26);

            // Create table instance
            yPosition += 28;
            let table = createTable(doc, yPosition, null, 'Type of Property – Under Construction Residential Land & Building');
            let yPos = table.getPosition();

            // Purpose of Valuation
            yPos = table.addSplitColumnRow('1', 'Purpose of Valution', [
                'Purpose',
                'Type',
                'Banks Purpose',
                'Construction Loan'
            ]);

            // Accompanying Person
            yPos = table.addRow('2', 'Persons Accompanying / Contact No.', 'visited independently');

            // Customer Details
            yPos = table.addRow('3', 'Customer Details', '', null, true);
            yPos = table.addRow('a', 'Name of Owner', 'Mrs RIZWANA.A.PATEL & Mr ALTAF.D.PATEL');
            yPos = table.addRow('b', 'Name of Purchaser', 'NA');
            yPos = table.addRow('c', 'Application No', 'Not Available');

            // Property Details with Address Array
            yPos = table.addRow('4', 'Property Details', '', null, true);
            const addressData = {
                row1: ['PLOT/ SITE NO', 'test', 'Survey.No', 'test'],
                row2: ['LOCALITY', 'test', 'DISTRICT', 'test'],
                row3: ['LAND MARK NEAR', 'test', 'DISTANCE ', 'test'],
                row4: ['LEGAL ADDRESS', 'test']
            };
            yPos = table.addAddressRow('a', 'Address', addressData);

            yPos = table.addRow('b', 'Nearby Landmark/Google Map /\nIndependent access to the property', 
                'Located near to R T Nagar Police Station on 80 ft Main Road, R T Nagar. Road, R T Nagar. It is about 09 kms from Bangalore City Bus Stand & Railway Station/ Google Map enclosed/ Yes it is Independently accessible.');

            // Document Details
            yPos = table.addRow('5', 'Document Details', '', null, true);
            yPos = table.addRow('a', 'Building Plan', '', null, true);
            yPos = table.addRow('i)', 'Yes/No', 'Yes');
            yPos = table.addRow('ii)', 'Name of Approving Authority', 'Approved by ADTP (East), BBMP');
            yPos = table.addRow('iii)', 'Approval No / Date / Details', 'BBMP/Ad.com/EST/0101/24-25');
            yPos = table.addRow('b', 'Legal & Other Documents', 
                'Photo Copies of Sale Deed dated 12/04/2001, Katha dated  /04/2001, Katha dated /04/2001, Katha dated /04/2001, Katha dated /04/2001, Katha dated /04/2001, Katha dated /04/2001, Katha dated //04/2001, Katha dated/04/2001, Katha dated/04/2001, Katha dated/04/2001, Katha dated/04/2001, Katha dated/04/2001, Katha dated/04/2001, Katha dated04/2001, Katha dated30/03/2024, Tax paid receipt dated 03/04/2024 & Sanction Plan', 16);

            resolve(yPos);
        };

        img.onerror = function() {
            console.error('Error loading logo');
            resolve(yPos);
        };
    });
}



// Update the createTable function to accept null title/subtitle
function createTable(doc, startY, title, subtitle = null) {
    let yPosition = startY;
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 18;  // Changed to 10
    const rightMargin = 10; // Kept as 20
    const tableWidth = pageWidth - (leftMargin + rightMargin); // Updated calculation
    
    // Only add title and subtitle if they are provided
    // if (title) {
    //     doc.setFont('helvetica', 'bold');
    //     doc.setFontSize(12);
    //     doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
        
    //     // Add underline for title
    //     const lineWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
    //     const lineStart = (pageWidth - lineWidth) / 2;
    //     doc.line(lineStart, yPosition + 1, lineStart + lineWidth, yPosition + 1);
    // }
    
    if (subtitle) {
        yPosition += 5;
        doc.rect(leftMargin, yPosition, tableWidth, 8);  // Updated to use leftMargin
        doc.setFontSize(9);
        doc.text(subtitle, pageWidth / 2, yPosition + 5.5, { align: 'center' });
        yPosition += 8;
    }
    
    const col1Width = 7;
    const col2Width = 85;
    const col3Width = tableWidth - col1Width - col2Width;
    
    

    function addAddressRow(number, description, addressData) {
        const rowHeight = 30;
        const childRowHeight = rowHeight / 4;
        const col1Width = 7;
        const col2Width = 45;  // Reduced width for Address column
        const col3Width = tableWidth - col1Width - col2Width;
        const col3SplitWidth = col3Width / 4;  // Split into 4 equal columns
        
        // Draw main columns
        doc.rect(leftMargin, yPosition, col1Width, rowHeight);
        doc.rect(leftMargin + col1Width, yPosition, col2Width, rowHeight);
        
        // Starting position for third column
        const col3Start = leftMargin + col1Width + col2Width;
        
        // Draw first three rows with 4 columns each
        for (let i = 0; i < 3; i++) {
            // Draw 4 columns for each row
            for (let j = 0; j < 4; j++) {
                doc.rect(
                    col3Start + (j * col3SplitWidth), 
                    yPosition + (i * childRowHeight), 
                    col3SplitWidth, 
                    childRowHeight
                );
            }
        }
        
        // Draw last row with two columns
        const lastRowCol1Width = col3Width / 4;  // Width for Site No. 78
        doc.rect(col3Start, yPosition + (3 * childRowHeight), lastRowCol1Width, childRowHeight);
        doc.rect(col3Start + lastRowCol1Width, yPosition + (3 * childRowHeight), col3Width - lastRowCol1Width, childRowHeight);
        
        // Add number and description
        doc.setFont('helvetica', 'normal');
        doc.text(number.toString(), leftMargin + 2, yPosition + 15);
        doc.text(description, leftMargin + col1Width + 2, yPosition + 15);
        
        // Add text in grid cells using addressData
        doc.setFontSize(8);
        
        // First row cells
        const row1 = addressData.row1;
        doc.text(row1[0], col3Start + 2, yPosition + 5);
        doc.text(row1[1], col3Start + col3SplitWidth + 2, yPosition + 5);
        doc.text(row1[2], col3Start + (2 * col3SplitWidth) + 2, yPosition + 5);
        doc.text(row1[3], col3Start + (3 * col3SplitWidth) + 2, yPosition + 5);
        
        // Second row cells
        const row2 = addressData.row2;
        doc.text(row2[0], col3Start + 2, yPosition + childRowHeight + 5);
        doc.text(row2[1], col3Start + col3SplitWidth + 2, yPosition + childRowHeight + 5);
        doc.text(row2[2], col3Start + (2 * col3SplitWidth) + 2, yPosition + childRowHeight + 5);
        doc.text(row2[3], col3Start + (3 * col3SplitWidth) + 2, yPosition + childRowHeight + 5);
        
        // Third row cells
        const row3 = addressData.row3;
        doc.text(row3[0], col3Start + 2, yPosition + (2 * childRowHeight) + 5);
        doc.text(row3[1], col3Start + col3SplitWidth + 2, yPosition + (2 * childRowHeight) + 5);
        doc.text(row3[2], col3Start + (2 * col3SplitWidth) + 2, yPosition + (2 * childRowHeight) + 5);
        doc.text(row3[3], col3Start + (3 * col3SplitWidth) + 2, yPosition + (2 * childRowHeight) + 5);
        
        // Last row (two columns)
        const row4 = addressData.row4;
        doc.text(row4[0], col3Start + 2, yPosition + (3 * childRowHeight) + 5);
        doc.text(row4[1], col3Start + lastRowCol1Width + 2, yPosition + (3 * childRowHeight) + 5);
        
        yPosition += rowHeight;
        return yPosition;
    }

    function addSplitColumnRow(number, description, col3Texts = ['Own Purpose', 'CAPITAL GAINS', 'Banks Purpose', 'Construction Loan']) {
        const rowHeight = 10;
        const singleRowHeight = rowHeight / 2;
        const col1Width = 7;
        const col2Width = 85;
        const col3Width = tableWidth - col1Width - col2Width;
        const col3SplitWidth = col3Width / 2;
        
        // Draw columns
        doc.rect(leftMargin, yPosition, col1Width, rowHeight);
        doc.rect(leftMargin + col1Width, yPosition, col2Width, rowHeight);
        doc.setFontSize(8);
        
        // Starting position for third column
        const col3Start = leftMargin + col1Width + col2Width;
        
        // Draw third column grid (2x2)
        doc.rect(col3Start, yPosition, col3SplitWidth, singleRowHeight);
        doc.rect(col3Start + col3SplitWidth, yPosition, col3SplitWidth, singleRowHeight);
        doc.rect(col3Start, yPosition + singleRowHeight, col3SplitWidth, singleRowHeight);
        doc.rect(col3Start + col3SplitWidth, yPosition + singleRowHeight, col3SplitWidth, singleRowHeight);
        
        // Reduced text baseline offset from 8 to 4 for number and description
        const textBaselineOffset = 4;
        
        // Add number and description
        doc.setFont('helvetica', 'normal');
        doc.text(number.toString(), leftMargin + 2, yPosition + textBaselineOffset);
        doc.text(description, leftMargin + col1Width + 2, yPosition + textBaselineOffset);
        
        // Reduced text baseline offset from 5 to 3 for grid cells
        const gridTextOffset = 3;
        
        // Add text in top row (bold)
        doc.setFont('helvetica', 'bold');
        doc.text(col3Texts[0], col3Start + 2, yPosition + gridTextOffset);
        doc.text(col3Texts[1], col3Start + col3SplitWidth + 2, yPosition + gridTextOffset);
        
        // Add text in bottom row (normal)
        doc.setFont('helvetica', 'normal');
        doc.text(col3Texts[2], col3Start + 2, yPosition + singleRowHeight + gridTextOffset);
        doc.text(col3Texts[3], col3Start + col3SplitWidth + 2, yPosition + singleRowHeight + gridTextOffset);
        
        yPosition += rowHeight;
        return yPosition;
    }

    function addRow(number, description, value, height = null, no_column = false) {
    // Set font size consistently
    doc.setFontSize(8);
    
    // Calculate text length
    const textLength = description.length + (value ? value.length : 0);
    
    // Split text for measurement
    const splitDescription = doc.splitTextToSize(description, col2Width - 4);
    const splitValue = value ? doc.splitTextToSize(value, col3Width - 4) : [''];
    
    // Get number of lines for both description and value
    const descriptionLines = splitDescription.length;
    const valueLines = splitValue.length;
    
    // Use the maximum number of lines to determine height
    const maxLines = Math.max(descriptionLines, valueLines);
    const lineHeight = 3.1; // Reduced base height per line
    const padding = 2; // Minimum padding
    
    // Calculate height based on content
    let calculatedHeight;
    if (maxLines === 1) {
        calculatedHeight = lineHeight + padding; // Minimum height for single line
    } else {
        calculatedHeight = (maxLines * lineHeight) + padding; // Height for multiple lines
    }
    
    
    // If height parameter is provided, use it as minimum height
    const rowHeight = height ? Math.max(calculatedHeight, height) : calculatedHeight;

    if (no_column) {
        // Draw only two columns when no_column is true
        doc.rect(leftMargin , yPosition, col1Width, rowHeight);
        
        if (number) {
            doc.setFont('helvetica', 'normal');
            doc.text(number.toString(), leftMargin + 1, yPosition + 3);
            doc.rect(leftMargin + col1Width, yPosition, col2Width + col3Width, rowHeight);

        }
        
        // Set bold font for description when no_column is true
        doc.setFont('helvetica', 'bold');
        doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 3);
    } else {
        // Original three-column layout
        doc.rect(leftMargin, yPosition, col1Width, rowHeight);
        doc.rect(leftMargin + col1Width, yPosition, col2Width, rowHeight);
        doc.rect(leftMargin + col1Width + col2Width, yPosition, col3Width, rowHeight);
        
        if (number) {
            doc.setFont('helvetica', 'normal');
            doc.text(number.toString(), leftMargin + 2, yPosition + 3);
        }
        
        doc.setFont('helvetica', 'normal');
        doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 3);
        
        if (value && value.includes('Mrs')) {
            doc.setFont('helvetica', 'bold');
        }
        doc.text(splitValue, leftMargin + col1Width + col2Width + 2, yPosition + 3);
    }
    
    yPosition += rowHeight;
    return yPosition;
}
    
    return {
        addRow,
        addSplitColumnRow,
        addAddressRow,
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
async function generatePDF() {
   const { jsPDF } = window.jspdf;
   const doc = new jsPDF();
   
  await Container1(doc)
  addFooter(doc)
   
//   doc.addPage()
//   header(doc,2)
//   Container2(doc)
//   addFooter(doc)
//   doc.save('auto-adjustment-pg-1.pdf');
   return doc;
}