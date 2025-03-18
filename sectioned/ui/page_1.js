

function Container1(doc) {

    const Container_1 = JSON.parse(localStorage.getItem('Container_1'));
    console.log(Container_1);
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
                       
            // Company header
            doc.setFontSize(16);
            doc.setTextColor(65, 105, 225);
            doc.setFont('helvetica', 'bold');
            doc.text('TRUE PEAK HOUSE LLP', pageWidth / 5, yPosition + 10);

            // Company details
            yPosition += 15;
            doc.setTextColor(55, 65, 81);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            const address = 'GSTIN: 29AAUFT3926A1ZW, #240/C, FIRST FLOOR, 3RD BLOCK, NAGARABHAVI 2ND STAGE,';
            doc.text(address, pageWidth / 9, yPosition);

            // Contact details
            yPosition += 5;
            const contact = 'Bengaluru: 560072. MOB: +91 9743142447 | balakrishna@truepeak.in | www.truepeak.in';
            doc.text(contact, pageWidth / 9, yPosition);  
            doc.setTextColor(0, 0, 255); // Blue #0000FF

            // Draw a line below the title
            doc.setLineWidth(0.5);
            yPosition += 4; 
            doc.line(margin, yPosition, margin + tableWidth, yPosition);          

            // Bank details
            // Reset color for lines
            doc.setTextColor(0, 0, 0);
            yPosition += 2;
            doc.setFont('helvetica', 'normal');
            doc.text('To,', margin + 5, yPosition + 5);
            doc.setFont('times', 'bold');
            doc.text(Container_1.bankInfo.managerDesignation.toUpperCase(), margin + 5, yPosition + 12);
            doc.text(Container_1.bankInfo.bankName.toUpperCase(), margin + 5, yPosition + 19);
            doc.text(Container_1.bankInfo.branchLocation.toUpperCase(), margin + 5, yPosition + 26);
        
            // Title section
            yPosition += 28;
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);

            // Centered title
            doc.text('VALUATION REPORT - IMMOVABLE PROPERTY', pageWidth / 2, yPosition + 5.5, { align: 'center' });

            // Get text width to align underline properly
            let textWidth = doc.getTextWidth('VALUATION REPORT - IMMOVABLE PROPERTY');
            let textX = (pageWidth - textWidth) / 2; // Centering the underline

            // Draw underline
            doc.line(textX, yPosition + 6, textX + textWidth, yPosition + 6); // Adjust `+7` for spacing

            // Create table instance
            yPosition += 5;
            let table = createTable(doc, yPosition, null, 'Type of Property – Under Construction Residential Land & Building');
            let yPos = table.getPosition();

            doc.setFontSize(8);

            // Purpose of Valuation
            yPos = table.addSplitColumnRow('1', 'Purpose of Valuation', [
                'Purpose',
                'Type',
                'Banks Purpose',
                'Construction Loan'
            ]);

            // Accompanying Person
            yPos = table.addRow('2', 'Persons Accompanying / Contact No.', Container_1.customerDetails.personAccompanyingContactNo);

            // Customer Details
            yPos = table.addRow('3', 'Customer Details', '', null, true);
            yPos = table.addRow('a', 'Name of Owner', Container_1.customerDetails.customerName);
            yPos = table.addRow('b', 'Name of Purchaser', Container_1.customerDetails.nameOfPurchaser);
            yPos = table.addRow('c', 'Application No', Container_1.customerDetails.applicationNo);

            // Property Details with Address Array
            yPos = table.addRow('4', 'Property Details', '', null, true);
           /* const addressData = {
                row1: ['PLOT/ SITE NO', Container_1.propertyDetails.propertyType, 'Survey.No', Container_1.propertyDetails.mainPurpose],
                row2: ['LOCALITY', Container_1.propertyLocation.address, 'DISTRICT', Container_1.propertyLocation.nearbyLandmark],
                row3: ['LAND MARK NEAR', Container_1.propertyDetails.subPurpose, 'DISTANCE ', 'N/A'],
                row4: ['LEGAL ADDRESS', Container_1.documentDetails.legalDocuments]
            };
            */
            yPos = table.addAddressRow('a', 'Address', Container_1.propertyLocation.address);

            yPos = table.addRow('b', 'Nearby Landmark/Google Map / Independent access to the property', Container_1.propertyLocation.nearbyLandmark);

            // Document Details
            yPos = table.addRow('5', 'Document Details', '', null, true);
            yPos = table.addRow('a', 'Building Plan', Container_1.documentDetails.buildingPlan);
            yPos = table.addRow('i)', 'Yes/No', 'Yes');
            yPos = table.addRow('ii)', 'Name of Approving Authority', Container_1.documentDetails.nameOfApprovingAuthority);
            yPos = table.addRow('iii)', 'Approval No / Date / Details', Container_1.documentDetails.approvalNoDetails);
            yPos = table.addRow('b', 'Legal & Other Documents', Container_1.documentDetails.legalDocuments);

            // Add Physical Details section
            yPos = table.addRow('6', 'Physical Details', '', null, true);

            // Add header row
            yPos = table.addAdjoiningPropertiesRow('a', 'Adjoining Properties:', 'As per Document', 'As per Actuals');
            
            // Add direction rows
            yPos = table.addAdjoiningPropertiesRow('i', 'East', Container_1.boundaries.east.doc, Container_1.boundaries.east.actual);
            yPos = table.addAdjoiningPropertiesRow('ii', 'West', Container_1.boundaries.west.doc, Container_1.boundaries.west.actual);
            yPos = table.addAdjoiningPropertiesRow('iii', 'North', Container_1.boundaries.north.doc, Container_1.boundaries.north.actual);
            yPos = table.addAdjoiningPropertiesRow('iv', 'South', Container_1.boundaries.south.doc, Container_1.boundaries.south.actual);
            yPos = table.addRow('b', 'Matching of Boundaries', Container_1.otherDetails.boundaryMatch);
            yPos = table.addRow('c', 'Plot Demarcated', Container_1.otherDetails.plotDemarcation);
            yPos = table.addRow('d)', 'Approved and Land Use', Container_1.otherDetails.landUse);
            yPos = table.addRow('e)', 'Types of property', Container_1.otherDetails.typeOfProperty);

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
    const leftMargin = 18;  
    const rightMargin = 10; 
    const tableWidth = pageWidth - (leftMargin + rightMargin); 
    
    if (subtitle) {
        yPosition += 5;
        doc.rect(leftMargin, yPosition, tableWidth, 8);  
        doc.setFontSize(9);
        doc.text(subtitle, pageWidth / 2, yPosition + 5.5, { align: 'center' });
        yPosition += 8;
    }
    
    const col1Width = 7;
    const col2Width = 85;
    const col3Width = tableWidth - col1Width - col2Width;


function addAddressRow(number, description, address) {
    const lineHeight = 3.1;
    const padding = 4; // Extra padding for readability

    // Split text for wrapping within column widths
    const splitAddress = doc.splitTextToSize(address, col3Width - 6);
    const splitDescription = doc.splitTextToSize(description, col2Width - 6);
    
    // Find the max number of lines needed for any column
    const maxLines = Math.max(splitAddress.length, splitDescription.length, 1);

    // Calculate dynamic row height
    const rowHeight = (maxLines * lineHeight) + padding;

    // Draw table row with dynamic height
    doc.rect(leftMargin, yPosition, col1Width, rowHeight); // Column 1 (Number)
    doc.rect(leftMargin + col1Width, yPosition, col2Width, rowHeight); // Column 2 (Description)
    doc.rect(leftMargin + col1Width + col2Width, yPosition, col3Width, rowHeight); // Column 3 (Address)

    // Add text to each column
    doc.setFont('helvetica', 'normal');
    doc.text(number.toString(), leftMargin + 2, yPosition + 4);
    doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 4);
    doc.text(splitAddress, leftMargin + col1Width + col2Width + 2, yPosition + 4);

    // Move Y position for the next row
    yPosition += rowHeight;
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
   
   await Container1(doc, Container_1)
   addFooter(doc)
   doc.save('auto-adjustment-pg-2.pdf');
   return doc;
}