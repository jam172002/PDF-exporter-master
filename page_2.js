function Container2(doc) {
    const font_size = 8
    doc.setFontSize(font_size);
   let table = createTable(
       doc, 
       10, // startY
       '', // title
       '' // subtitle
   );
   
   let yPos = table.getPosition();
  

   // Document Details section
   yPos = table.addRow('b', 'Matching of Boundaries', 'Yes');
   yPos = table.addRow('c', 'Plot Demarcated', 'Yes');
   yPos = table.addRow('d)', 'Approved and Land Use', 'Residental use');
   yPos = table.addRow('e)', 'Types of property', 'Under Construction Residential Land & Building');
   yPos = table.addRow('f)', 'Details of Accommodations', 'As per Actual');
   yPos = table.addRow('b', 'Legal & Other Documents', ' Tax paid receipt dated 03/04/2024 &  Sanction Plan');


   yPos = table.addRow('i', 'Living/ Dinning', 'UC');
   yPos = table.addRow('ii', 'Bed Room & Pooja Room', 'UC');
   yPos = table.addRow('iii', 'Toilet', 'UC');
   yPos = table.addRow('iv', 'Kitchen', 'UC');

   yPos = table.addRow('g', 'Total No of Floors', 'Stilt + GF + 3 Upper floor + Terrace (As per Plan)');
   yPos = table.addRow('h', 'Floor on which the property is located', 'NA');

   yPos = table.addRow('i', 'Year of construction', 'UC');

   yPos = table.addRow('j', 'Approx. age of the Property', 'test');

   yPos = table.addRow('h', 'Residual age of the Property ', '60 Years after completion');
   yPos = table.addRow('k', 'Type of structure', 'Structure')
   yPos = table.addRow('', 'Amenities provided', 'BW & Sump Provided')
   yPos = table.addRow('7', 'Tenure / Occupancy Details', '',null, true)
   yPos = table.addRow('', 'Status of Tenure', '',null, true)
   yPos = table.addRow('i', 'Owned /Rented ', 'UC');
   yPos = table.addRow('ii', 'No. of years of Occupancy', '-');
   yPos = table.addRow('iii', 'Relationship of tenant or owner ', '-');

   return yPos;
}

function createTable(doc, startY, title, subtitle = null, font_size = 8) {
    let yPosition = startY;
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 18;  // Changed to 10
    const rightMargin = 10; // Kept as 20
    const tableWidth = pageWidth - (leftMargin + rightMargin); // Updated calculation
    
    const lineHeightMultiplier = 0.4; // Adjust this to change line height ratio
    const paddingMultiplier = 0.25;   // Adjust this to change padding ratio
    const baseOffset = font_size * 0.375; // Vertical text position offset
    
    const lineHeight = font_size * lineHeightMultiplier;
    const padding = font_size * paddingMultiplier;
    
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
        const lineHeight = 3.1;
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
        // Split text for measurement
        const splitDescription = doc.splitTextToSize(description, col2Width - 4);
        const splitValue = value ? doc.splitTextToSize(value, col3Width - 4) : [''];
        
        // Calculate height based on content
        const maxLines = Math.max(splitDescription.length, splitValue.length);
        const calculatedHeight = (maxLines * lineHeight) + padding * 2;
        
        // If height parameter is provided, use it as minimum height
        const rowHeight = height ? Math.max(calculatedHeight, height) : calculatedHeight;

        if (no_column) {
            // Draw only two columns when no_column is true
            doc.rect(leftMargin, yPosition, col1Width, rowHeight);
            
            if (number) {
                doc.setFont('helvetica', 'normal');
                doc.text(number.toString(), leftMargin + 1, yPosition + baseOffset);
                doc.rect(leftMargin + col1Width, yPosition, col2Width + col3Width, rowHeight);
            }
            
            // Set bold font for description
            doc.setFont('helvetica', 'bold');
            doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + baseOffset);
        } else {
            // Original three-column layout
            doc.rect(leftMargin, yPosition, col1Width, rowHeight);
            doc.rect(leftMargin + col1Width, yPosition, col2Width, rowHeight);
            doc.rect(leftMargin + col1Width + col2Width, yPosition, col3Width, rowHeight);
            
            if (number) {
                doc.setFont('helvetica', 'normal');
                doc.text(number.toString(), leftMargin + 2, yPosition + baseOffset);
            }
            
            doc.setFont('helvetica', 'normal');
            doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + baseOffset);
            
            if (value) {
                doc.text(splitValue, leftMargin + col1Width + col2Width + 2, yPosition + baseOffset);
            }
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

function generatePDF() {
   const { jsPDF } = window.jspdf;
   const doc = new jsPDF();
   
//   header(doc)
//   Container1(doc)
//   addFooter(doc)
   
//   doc.addPage()
   Container2(doc)
   addFooter(doc)
//   doc.save('valuation_report_first_page.pdf');
   return doc;
}