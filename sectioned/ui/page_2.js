function Container2(doc) {

    const Container_2 = JSON.parse(localStorage.getItem('Container_2'));
    console.log(Container_2);

    // Initial settings
    const leftMargin = 25.7;  
    const rightMargin = 17.5; 
    const pageWidth = doc.internal.pageSize.getWidth();    
    let yPosition = 0;

    // Add logo on the right side
    const img = new Image();
    img.src = 'images/logo.png';

    return new Promise((resolve) => {
        img.onload = function() {
            // Logo dimensions
            const logoWidth = 30;
            const logoHeight = 30;
            const logoX = pageWidth - rightMargin - logoWidth - 6;
            yPosition += 2; 
            doc.addImage(img, 'PNG', logoX , yPosition, logoWidth, logoHeight);

            // Move yPosition downward to prevent overlap
            yPosition += logoHeight + 2;  

            const font_size = 8;
            doc.setFontSize(font_size);

            let table = createTable(doc, yPosition, '', '');
            let yPos = table.getPosition();
            yPos = table.addRow('f)', 'Details of Accommodations', 'As per Actual');
            yPos = table.addRow('i', 'Living/ Dinning', Container_2.livingStatus);
            yPos = table.addRow('ii', 'Bed Room & Pooja Room', Container_2.bedroomStatus);
            yPos = table.addRow('iii', 'Toilet', Container_2.toiletStatus);
            yPos = table.addRow('iv', 'Kitchen', Container_2.kitchenStatus);
            yPos = table.addRow('g', 'Total No of Floors', Container_2.totalFloors);
            yPos = table.addRow('h', 'Floor on which the property is located', Container_2.propertyFloor);
            yPos = table.addRow('i', 'Year of construction', constructionYear);
            yPos = table.addRow('j', 'Approx. age of the Property', Container_2.propertyAge);
            yPos = table.addRow('h', 'Residual age of the Property', Container_2.residualAge);
            yPos = table.addRow('k', 'Type of structure', Container_2.structureType);
            yPos = table.addRow('l', 'Amenities provided', Container_2.amenities);
            yPos = table.addRow('7', 'Tenure / Occupancy Details', '', 8, true);
            yPos = table.addRow('', 'Status of Tenure', '', 8, true);
            yPos = table.addRow('i', 'Owned /Rented', Container_2.ownedOrRented);
            yPos = table.addRow('ii', 'No. of years of Occupancy', Container_2.occupancyYears);
            yPos = table.addRow('iii', 'Relationship of tenant or owner', Container_2.relationOfTenant);
            yPos = table.addRow('8', 'Building Status', '', 8, true);
            yPos = table.addRow('i', 'Existing building', Container_2.existingBuilding);
            yPos = table.addRow('ii', 'Stage of construction', Container_2.constructionStage, 16);
            yPos = table.addRow('iii', 'If under construction, extent of completion ', Container_2.workCompletion);
            yPos = table.addRow('9', 'Violations if any observed', '', 8, true);
            yPos = table.addRow('i', 'Nature and extent of violations', Container_2.violations, 16);
            yPos = table.addRow('10', 'Area Details of the Property', '', 8, true);

            //yPos = table.addRow('i', 'Site Area', '', null, true);
            const siteAreaData = {
                row1: ['East to West', Container_2.eastToWest],
                row2: ['North to South', Container_2.northToSouth],
                row3: ['Totally Measuring', Container_2.totallyMeasuring],
            };
            yPos = table.addAddressRow('i', 'Site Area', siteAreaData);

            yPos = table.addRow('ii', 'Plinth area', Container_2.plinthArea);
            yPos = table.addRow('iii', 'Carpet area', Container_2.carpetArea);
            yPos = table.addRow('iv', 'Saleable area', Container_2.saleableArea);
            yPos = table.addRow('v', 'Remarks', Container_2.remarks);

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
    const leftMargin = 25.7;  
    const rightMargin = 17.5; 
    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (leftMargin + rightMargin); 

    const lineHeightMultiplier = 0.2; // Adjust this to change line height ratio
    const paddingMultiplier = 0.25;   // Adjust this to change padding ratio
    const baseOffset = font_size * 0.375; // Vertical text position offset
    
    const lineHeight = font_size * lineHeightMultiplier;
    const padding = font_size * paddingMultiplier;
   
        if (subtitle) {
            yPosition += 5;
            doc.rect(leftMargin, yPosition, tableWidth, 8);  // Updated to use leftMargin
            doc.setFontSize(9);
            doc.text(subtitle, pageWidth / 2, yPosition + 5.5, { align: 'center' });
            yPosition += 8;
        }
        
        const col1Width = 7;
        const col2Width = 80;
        const col3Width = tableWidth - col1Width - col2Width;
    
        function addAddressRow(number, description, addressData) {
           // Set consistent font size and calculate widths
            const col1Width = 7; // First column for serial number
            const col2Width = 80; // Set to the same width as in addRow method
            const remainingWidth = tableWidth - col1Width - col2Width; // Remaining width for the other two columns
            const col3Width = remainingWidth / 2; // Third column occupies half of the remaining width
            const col4Width = remainingWidth / 2; // Fourth column occupies the other half of the remaining width

            // Calculate max text length for each row to determine height
            const calculateRowHeight = (texts) => {
                const lineHeight = 3.1;
                const padding = 2;
                let maxLines = 1;
        
                texts.forEach(text => {
                    if (text) {
                        // Add extra padding to ensure text stays within cell
                        const splitText = doc.splitTextToSize(text, col3Width - 6); 
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
            doc.rect(leftMargin + col1Width + col2Width, yPosition, col3Width, totalHeight);
            doc.rect(leftMargin + col1Width + col2Width + col3Width, yPosition, col4Width, totalHeight);
        
            // Starting position for third column
            const col3Start = leftMargin + col1Width + col2Width;
        
            // Current Y position tracker
            let currentY = yPosition;
        
            // Draw and fill first three rows
            const drawRow = (rowData, rowHeight) => {
                for (let j = 0; j < 2; j++) {
                    doc.rect(
                        col3Start + (j * col3Width),
                        currentY,
                        col3Width,
                        rowHeight
                    );
        
                    // Add text with proper wrapping
                    if (rowData[j]) {
                        const splitText = doc.splitTextToSize(rowData[j], col3Width - 6);
                        doc.text(splitText, col3Start + (j * col3Width) + 2, currentY + 4);
                    }
                }
                currentY += rowHeight;
            };
        
            // Draw first three rows
            drawRow(addressData.row1, row1Height);
            drawRow(addressData.row2, row2Height);
            drawRow(addressData.row3, row3Height);
        
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
            const col2Width = 80;
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