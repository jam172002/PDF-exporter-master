
function Container4(doc) {
    const Container_4 = JSON.parse(localStorage.getItem('Container_4'));
    console.log(Container_4);
    
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
    
            // Add section B: EXTRA ITEM
            yPos = table.addRow('B', 'EXTRA ITEM', 'Amount in Rs.', true);
            yPos = table.addRow('1', 'Portico', Container_4.porticoStatus);
            yPos = table.addRow('2', 'Ornamental front door', Container_4.frontDoorStatus);
            yPos = table.addRow('3', 'Sit out / Verandah with steel grills', Container_4.verandahStatus);
            yPos = table.addRow('4', 'Bore well / Overhead Tank / Sump / Solar', Container_4.boreWellStatus);
            yPos = table.addRow('5', 'Extra steel / Collapsible gates', Container_4.gatesStatus);
            yPos = table.addRow('', 'Total', Container_4.extraItemsTotal, true);
            
            // Add section C: AMENITIES
            yPos = table.addRow('C', 'AMENITIES', '', true);
            yPos = table.addRow('1', 'Wardrobes', Container_4.wardrobesStatus);
            yPos = table.addRow('2', 'Glazed Tiles', Container_4.glazedTilesStatus);
            yPos = table.addRow('3', 'Extra sinks & bath tubs', Container_4.bathTubsStatus);
            yPos = table.addRow('4', 'Marble / Ceramic tiles flooring', Container_4.marbleFlooringStatus);
            yPos = table.addRow('5', 'Interior decorations', Container_4.interiorStatus);
            yPos = table.addRow('6', 'Architectural Elevation works', Container_4.architecturalStatus);
            yPos = table.addRow('7', 'Paneling works', Container_4.panelingStatus);
            yPos = table.addRow('8', 'Aluminium works', Container_4.aluminiumStatus);
            yPos = table.addRow('9', 'Aluminium hand rails', Container_4.handRailsStatus);
            yPos = table.addRow('10', 'False ceilings', Container_4.falseCeilingStatus);
            yPos = table.addRow('', 'Total', Container_4.amenitiesTotal, true);
                     
            //return yPos;       
        // Resolve the promise after the table is completed
        resolve(yPos);
      };
  
      img.onerror = function() {
          console.error('Error loading logo');
          resolve(yPos);
      };
      });
}
function createTable(doc, startY, title, subtitle = null) {
    let yPosition = startY;
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 25.7;  
    const rightMargin = 17.5; 
    const tableWidth = pageWidth - (leftMargin + rightMargin); 
    const col1Width = 10;
    const col2Width = 80;
    const col3Width = tableWidth - col1Width - col2Width;

    function addRow(number, description, value, no_column = false) {
        // Set line height and padding
        const lineHeight = 3.1;
        const padding = 2;
    
        // Calculate the height based on the content
        const splitDescription = doc.splitTextToSize(description, col2Width - 4);
        const splitValue = value ? doc.splitTextToSize(value, col3Width - 4) : [''];
    
        // Determine the number of lines for each piece of content
        const descriptionLines = splitDescription.length;
        const valueLines = splitValue.length;
    
        // Calculate the maximum number of lines
        const maxLines = Math.max(descriptionLines, valueLines);
        
        // Calculate the row height based on the maximum number of lines
        const height = (maxLines * lineHeight) + padding * 2; // Add padding for spacing
    
        if (no_column) {
            // Draw only two columns when no_column is true
            doc.rect(leftMargin, yPosition, col1Width, height);  
            doc.rect(leftMargin + col1Width, yPosition, col2Width + col3Width, height);  
            
            if (number) {
                doc.setFont('helvetica', 'normal');
                doc.text(number.toString(), leftMargin + 1, yPosition + 5); 
            }
            
            // Set bold font for description when no_column is true
            doc.setFont('helvetica', 'bold');
            doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 5);  
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
            doc.text(splitDescription, leftMargin + col1Width + 2, yPosition + 5);  // Updated to use leftMargin
            
            if (value.includes('Mrs')) {
                doc.setFont('helvetica', 'bold');
            }
            doc.text(splitValue, leftMargin + col1Width + col2Width + 2, yPosition + 5);  // Updated to use leftMargin
        }
        
        // Move the yPosition down for the next row
        yPosition += height;
        return yPosition;
    }
        
    // Define column widths (adjusted for 9 columns)
    const colWidths = {
        slNo: 10,
        particulars: 24,
        roof: 10,
        area: 15,
        rate: 16,
        amountIn: 26,
        deprnIn: 18,
        deprnAmount: 25,
        netAmount: 23
    };

    function addTableHeader(){
        yPosition += 6;
        // Add title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('BUILDING VALUE:', leftMargin, yPosition);
        yPosition += 2;
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
        }
   
    // Function to add a row
    function addRowT(slNo, particulars, roof, area, rate, amountIn, deprnIn, deprnAmount, netAmount) {
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
        return yPosition;
    }
return {  
    addTableHeader,      
    addRow,
    addRowT,
    getPosition: () => yPosition
};
}

async function generatePDF() {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

await Container4(doc, Container_4)
addFooter(doc)
return doc;
}