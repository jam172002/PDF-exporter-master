function Container2(doc) {

    const Container_2 = JSON.parse(localStorage.getItem('Container_2'));
    console.log(Container_2);

    // Initial settings
    const margin = 18;
    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (margin * 1.55);
    let yPosition = 0;

    // Add logo on the right side
    const img = new Image();
    img.src = 'images/logo.png';

    return new Promise((resolve) => {
        img.onload = function() {
            // Logo dimensions
            const logoWidth = 30;
            const logoHeight = 30;
            const logoX = pageWidth - margin - logoWidth - 3;
            doc.addImage(img, 'PNG', logoX + 8, yPosition, logoWidth, logoHeight);

            // Move yPosition downward to prevent overlap
            yPosition += logoHeight + 2;  

            const font_size = 8;
            doc.setFontSize(font_size);

            let table = createTable(doc, yPosition, '', '');
            let yPos = table.getPosition();
            yPos = table.addRow('f)', 'Details of Accommodations', 'As per Actual');
            yPos = table.addRow('b', 'Legal & Other Documents', 'Tax paid receipt dated 03/04/2024 & Sanction Plan');
            yPos = table.addRow('i', 'Living/ Dinning', 'UC');
            yPos = table.addRow('ii', 'Bed Room & Pooja Room', 'UC');
            yPos = table.addRow('iii', 'Toilet', 'UC');
            yPos = table.addRow('iv', 'Kitchen', 'UC');
            yPos = table.addRow('g', 'Total No of Floors', 'Stilt + GF + 3 Upper floor + Terrace (As per Plan)');
            yPos = table.addRow('h', 'Floor on which the property is located', 'NA');
            yPos = table.addRow('i', 'Year of construction', 'UC');
            yPos = table.addRow('j', 'Approx. age of the Property', 'test');
            yPos = table.addRow('h', 'Residual age of the Property', '60 Years after completion');
            yPos = table.addRow('k', 'Type of structure', 'Structure');
            yPos = table.addRow('l', 'Amenities provided', 'BW & Sump Provided');
            yPos = table.addRow('7', 'Tenure / Occupancy Details', '', 8, true);
            yPos = table.addRow('', 'Status of Tenure', '', 8, true);
            yPos = table.addRow('i', 'Owned /Rented', 'UC');
            yPos = table.addRow('ii', 'No. of years of Occupancy', '-');
            yPos = table.addRow('iii', 'Relationship of tenant or owner');
            yPos = table.addRow('8', 'Building Status', '', 8, true);
            yPos = table.addRow('i', 'Existing building', 'UC');
            yPos = table.addRow('ii', 'Stage of construction', 'Foundation work, Stilt floor roof work completed & Ground floor roof slab yet to be done.', 16);
            yPos = table.addRow('iii', 'Existing building', 'Overall below 25% of work completed');
            yPos = table.addRow('9', 'Violations if any observed', '', 8, true);
            yPos = table.addRow('i', 'Nature and extent of violations', 'Deviation observed in floor area. Sanction Plan area considered in our report', 16);
            yPos = table.addRow('10', 'Area Details of the Property', '', 8, true);

            //yPos = table.addRow('i', 'Site Area', '', null, true);
            const siteAreaData = {
                row1: ['East to West', 'testtesttesttesttesttesttest'],
                row2: ['North to South', 'test'],
                row3: ['Totally Measuring', 'test'],
            };
            yPos = table.addAddressRow('i', 'Site Area', siteAreaData);

            yPos = table.addRow('ii', 'Plinth area', 'Refer Table below');
            yPos = table.addRow('iii', 'Carpet area', 'NA');
            yPos = table.addRow('iv', 'Saleable area', 'NA');
            yPos = table.addRow('v', 'Remarks', 'No');

        // Resolve the promise after the table is completed
        resolve(yPos);
    };

    img.onerror = function() {
        console.error('Error loading logo');
        resolve(yPos);
    };
    });
}


function createTable(doc, startY, title, subtitle = null, font_size = 8) {
    let yPosition = startY;
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 18;  
    const rightMargin = 10; 
    const tableWidth = pageWidth - (leftMargin + rightMargin); 
    
    const lineHeightMultiplier = 0.2; // Adjust this to change line height ratio
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
        
        
        const totalHeight = row1Height + row2Height + row3Height;
        
        // Draw main columns
        doc.rect(leftMargin, yPosition, col1Width, totalHeight);
        doc.rect(leftMargin + col1Width, yPosition, col2Width, totalHeight);
        
        // Starting position for third column
        const col3Start = leftMargin + col1Width + col2Width;
        
        // Current Y position tracker
        let currentY = yPosition;
        
        // Draw and fill first three rows
        const drawRow = (rowData, rowHeight, rowIndex) => {
            for (let j = 0; j < 2; j++) {
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
        //const lastRowCol1Width = col3Width / 4;
        //doc.rect(col3Start, currentY, lastRowCol1Width);
        //doc.rect(col3Start + lastRowCol1Width, currentY, col3Width - lastRowCol1Width);        
        
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
   
   await Container2(doc, Container_2)
   addFooter(doc)
   doc.save('auto-adjustment-pg-2.pdf');
   return doc;
}