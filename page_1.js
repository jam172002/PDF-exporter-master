

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
            
            doc.setFontSize(8);
            
            // Purpose of Valuation
            yPos = table.addSplitColumnRow('1', 'Purpose of Valution', [
                'Purpose',
                'Type',
                'Banks Purpose',
                'Constrution Loan'
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
                row1: ['PLOT/ SITE NO', 'testtesttesttesttesttesttest', 'Survey.No', 'test'],
                row2: ['LOCALITY', 'test', 'DISTRICT', 'test'],
                row3: ['LAND MARK NEAR', 'test', 'DISTANCE ', 'testtesttesttesttesttesttesttest'],
                row4: ['LEGAL ADDRESS', 'ttes test test test sdf test ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest ']
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
            
            // Add Physical Details section
            yPos = table.addRow('6', 'Physical Details', '', null, true);
            

            // Add header row
            yPos = table.addAdjoiningPropertiesRow('a', 'Adjoining Properties:', 'As per Document', 'As per Actuals');
            
            // Add direction rows
            yPos = table.addAdjoiningPropertiesRow('i', 'East', 'Road', '30 feet Road');
            yPos = table.addAdjoiningPropertiesRow('ii', 'West', 'Site No.161', 'RCC Building');
            yPos = table.addAdjoiningPropertiesRow('iii', 'North', 'Site No.197', 'RCC Building');
            yPos = table.addAdjoiningPropertiesRow('iv', 'South', 'Site No.199', 'RCC Building');

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
    // Set consistent font size and calculate widths
    
    const col1Width = 7;
    const col2Width = 45;
    const col3Width = tableWidth - col1Width - col2Width;
    const col3SplitWidth = col3Width / 4;  // Split into 4 equal columns
    
    const calculateRow4Height = (texts) => {
        const lineHeight = 3.;
        let basePadding = 2;
        let maxLines = 1;
        
        // Special handling for legal address
        if (texts[0] === 'LEGAL ADDRESS') {
            const legalAddressText = texts[1] || '';
            const splitText = doc.splitTextToSize(legalAddressText, (col3Width - col3SplitWidth) - 6);
            
            // Increase padding if text is longer than threshold (adjust threshold as needed)
            if (legalAddressText.length > 30) {  // you can adjust this threshold
                basePadding = 6;  // triple the padding
            }
            
            maxLines = Math.max(maxLines, splitText.length);
        } else {
            // Original calculation for non-legal address rows
            texts.forEach(text => {
                if (text) {
                    const splitText = doc.splitTextToSize(text, col3SplitWidth - 6);
                    maxLines = Math.max(maxLines, splitText.length);
                }
            });
        }
        
        return (maxLines * lineHeight) + basePadding - 2;
    };
    
    
    // Calculate max text length for each row to determine height
    const calculateRowHeight = (texts) => {
        const lineHeight = 3.1;
        const padding = 2;
        let maxLines = 1;
        
        texts.forEach(text => {
            if (text) {
                // Add extra padding to ensure text stays within cell
                const splitText = doc.splitTextToSize(text, col3SplitWidth - 6); 
                maxLines = Math.max(maxLines, splitText.length);
            }
        });
        
        return (maxLines * lineHeight) + padding * 2; // Added extra padding
    };
    
    // Calculate heights for each row
    const row1Height = calculateRowHeight(addressData.row1);
    const row2Height = calculateRowHeight(addressData.row2);
    const row3Height = calculateRowHeight(addressData.row3);
    const row4Height = calculateRow4Height([addressData.row4[0], addressData.row4[1]]);
    
    const totalHeight = row1Height + row2Height + row3Height + row4Height;
    
    // Draw main columns
    doc.rect(leftMargin, yPosition, col1Width, totalHeight);
    doc.rect(leftMargin + col1Width, yPosition, col2Width, totalHeight);
    
    // Starting position for third column
    const col3Start = leftMargin + col1Width + col2Width;
    
    // Current Y position tracker
    let currentY = yPosition;
    
    // Draw and fill first three rows
    const drawRow = (rowData, rowHeight, rowIndex) => {
        for (let j = 0; j < 4; j++) {
            doc.rect(
                col3Start + (j * col3SplitWidth),
                currentY,
                col3SplitWidth,
                rowHeight
            );
            
            // Add text with proper wrapping
            if (rowData[j]) {
                const splitText = doc.splitTextToSize(rowData[j], col3SplitWidth - 6);
                doc.text(splitText, col3Start + (j * col3SplitWidth) + 2, currentY + 4);
            }
        }
        currentY += rowHeight;
    };
    
    // Draw first three rows
    drawRow(addressData.row1, row1Height, 0);
    drawRow(addressData.row2, row2Height, 1);
    drawRow(addressData.row3, row3Height, 2);
    
    // Draw last row with two columns
    const lastRowCol1Width = col3Width / 4;
    doc.rect(col3Start, currentY, lastRowCol1Width, row4Height);
    doc.rect(col3Start + lastRowCol1Width, currentY, col3Width - lastRowCol1Width, row4Height);
    
    // Add text for last row with proper wrapping
    if (addressData.row4[0]) {
        const splitText = doc.splitTextToSize(addressData.row4[0], lastRowCol1Width - 6);
        doc.text(splitText, col3Start + 2, currentY + 4);
    }
    if (addressData.row4[1]) {
        const splitText = doc.splitTextToSize(addressData.row4[1], (col3Width - lastRowCol1Width) - 6);
        doc.text(splitText, col3Start + lastRowCol1Width + 2, currentY + 4);
    }
    
    // Add number and description
    doc.setFont('helvetica', 'normal');
    doc.text(number.toString(), leftMargin + 2, yPosition + 4);
    const descriptionSplit = doc.splitTextToSize(description, col2Width - 4);
    doc.text(descriptionSplit, leftMargin + col1Width + 2, yPosition + 4);
    
    yPosition += totalHeight;
    return yPosition;
}

function addAdjoiningPropertiesRow(number, description, docValue, actualValue) {
    // Set font size consistently and calculate widths
    doc.setFontSize(8);
    const col1Width = 7;
    const col2Width = 85;
    const remainingWidth = tableWidth - col1Width - col2Width;
    const col3Width = remainingWidth / 2;  // Split remaining width into two equal parts
    const col4Width = remainingWidth / 2;

    // Calculate text heights for auto-adjustment
    const splitDescription = doc.splitTextToSize(description, col2Width - 4);
    const splitDocValue = doc.splitTextToSize(docValue, col3Width - 4);
    const splitActualValue = doc.splitTextToSize(actualValue, col4Width - 4);

    // Calculate max lines for height
    const descriptionLines = splitDescription.length;
    const docValueLines = splitDocValue.length;
    const actualValueLines = splitActualValue.length;
    const maxLines = Math.max(descriptionLines, docValueLines, actualValueLines);

    // Calculate height
    const lineHeight = 3.1;
    const padding = 2;
    const rowHeight = (maxLines * lineHeight) + padding * 2;

    // Draw columns
    doc.rect(leftMargin, yPosition, col1Width, rowHeight);
    doc.rect(leftMargin + col1Width, yPosition, col2Width, rowHeight);
    doc.rect(leftMargin + col1Width + col2Width, yPosition, col3Width, rowHeight);
    doc.rect(leftMargin + col1Width + col2Width + col3Width, yPosition, col4Width, rowHeight);

    // Add text
    doc.setFont('helvetica', 'normal');
    if (number) {
        doc.text(number.toString(), leftMargin + 2, yPosition + 4);
    }

    // Add description
    doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 4);

    // Add document value and actual value with conditional bold
    if (docValue === 'As per Document' && actualValue === 'As per Actuals') {
        // Make headers bold
        doc.setFont('helvetica', 'bold');
        doc.text(splitDocValue, leftMargin + col1Width + col2Width + 2, yPosition + 4);
        doc.text(splitActualValue, leftMargin + col1Width + col2Width + col3Width + 2, yPosition + 4);
    } else {
        // Normal text for other rows
        doc.setFont('helvetica', 'normal');
        doc.text(splitDocValue, leftMargin + col1Width + col2Width + 2, yPosition + 4);
        doc.text(splitActualValue, leftMargin + col1Width + col2Width + col3Width + 2, yPosition + 4);
    }

    yPosition += rowHeight;
    return yPosition;
}


function addSplitColumnRow(number, description, col3Texts = ['Own Purpose', 'CAPITAL GAINS', 'Banks Purpose', 'Construction Loan']) {
    // Set font size consistently and calculate widths
    
    const col1Width = 7;
    const col2Width = 85;
    const col3Width = tableWidth - col1Width - col2Width;
    const col3SplitWidth = col3Width / 2;  // Split into 2 equal columns for grid
    
    // Helper function to calculate lines for a text within a width
    const getTextLines = (text, width) => {
        return doc.splitTextToSize(text, width - 6).length;
    };
    
    // Calculate required height only for bottom row in the grid
    const bottomRowLines = Math.max(
        getTextLines(col3Texts[2], col3SplitWidth),
        getTextLines(col3Texts[3], col3SplitWidth)
    );
    
    // Calculate description lines
    const descriptionSplit = doc.splitTextToSize(description, col2Width - 6);
    const descriptionLines = descriptionSplit.length;
    
    // Calculate row heights
    const lineHeight = 2.5;
    const padding = 2;
    const topRowHeight = lineHeight + padding * 2;  // Fixed height for top row
    const bottomRowHeight = (bottomRowLines * lineHeight) + padding * 2;
    const descriptionHeight = (descriptionLines * lineHeight) + padding * 2;
    
    // Total height should be maximum of description or sum of grid rows
    const rowHeight = Math.max(descriptionHeight, topRowHeight + bottomRowHeight);
    
    // Draw main columns
    doc.rect(leftMargin, yPosition, col1Width, rowHeight);
    doc.rect(leftMargin + col1Width, yPosition, col2Width, rowHeight);
    
    // Draw grid in third column
    const col3Start = leftMargin + col1Width + col2Width;
    
    // Draw grid cells with fixed height for top row
    doc.rect(col3Start, yPosition, col3SplitWidth, topRowHeight);
    doc.rect(col3Start + col3SplitWidth, yPosition, col3SplitWidth, topRowHeight);
    doc.rect(col3Start, yPosition + topRowHeight, col3SplitWidth, rowHeight - topRowHeight);
    doc.rect(col3Start + col3SplitWidth, yPosition + topRowHeight, col3SplitWidth, rowHeight - topRowHeight);
    
    // Add text content with proper wrapping
    doc.setFont('helvetica', 'normal');
    doc.text(number.toString(), leftMargin + 2, yPosition + 4);
    doc.text(descriptionSplit, leftMargin + col1Width + 2, yPosition + 4);
    
    // Helper function to add wrapped text
    const addWrappedText = (text, x, y, width) => {
        const splitText = doc.splitTextToSize(text, width - 6);
        doc.text(splitText, x, y);
    };
    
    // Add grid cell text - top row with fixed text
    doc.setFont('helvetica', 'bold');
    doc.text(col3Texts[0], col3Start + 2, yPosition + 4);
    doc.text(col3Texts[1], col3Start + col3SplitWidth + 2, yPosition + 4);
    
    // Bottom row with auto-wrapped text
    doc.setFont('helvetica', 'normal');
    addWrappedText(col3Texts[2], col3Start + 2, yPosition + topRowHeight + 4, col3SplitWidth);
    addWrappedText(col3Texts[3], col3Start + col3SplitWidth + 2, yPosition + topRowHeight + 4, col3SplitWidth);
    
    yPosition += rowHeight;
    return yPosition;
}

    function addRow(number, description, value, height = null, no_column = false) {
    // Set font size consistently
    
    
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
        addAdjoiningPropertiesRow,
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
//   doc.save('auto-adjustment-pg-2.pdf');
   return doc;
}