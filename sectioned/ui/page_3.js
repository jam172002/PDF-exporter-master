function Container3(doc) {
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

        // Add first and second rows (existing) 
            yPos = table.addRow('11', 'Valuation Note', '', 8, true);
            yPos = table.addRow('a (i) ', 'Mention the value as per Government Approved Rates also', 'Rs. 1,90,03,717.47/- (Land only)', 16);

            yPos = table.addRow('ii', 'In case of variation of 20 % or more in the valuation proposed by the valuer and the Guideline value provided in the State Govt. notification or Income Tax Gazette justification on variation has to be given','60 ft', 30);
            yPos = table.addRow('b', 'Summary of Valuation', '', 8, true);
            yPos = table.addRow('i', 'Guideline Rate ','Rs.85,200/- per Sqm or Rs.7,918.21/- per Sft');
            yPos = table.addRow('ii', 'Market Rate','Rs.15,000/- per Sft to Rs.17,000/- per Sft for Standard size types of properties in the locality, we have considered Rs.15,000/- per Sft as the fair market rate.', 20);

            yPos = table.addRow('iii', 'Land Value ','Rs.3,60,00,000-00');
            yPos = table.addRow('iv', 'Building Value ','Rs. 10,97,433-92 (At the Present Stage)');
            yPos = table.addRow('v', 'Extra items, Amenities & Services','Rs. 2,50,000-00 ');
            yPost = table.addRow('vi', 'Fair Market Value (SAY)', 'Say Rs. 3,73,00,000-00')
            yPost = table.addRow('c(vii)', ' Expected Rental Value ', 'Expected Rent Rs.20,000/- per month for 2BHK')

            // Add data rows with all columns        
            yPost = table.addTableHeader();            
            yPos = table.addRow('', 'AS PER ACTUALS', '', 8, true);
            yPost = table.addRowT('1', 'Stilt Floor', 'RCC', '2,000.00', '500.00', '10,00,000.00', '0.00', '0.00', '10,00,000.00');
            yPost = table.addRowT('2', 'Ground Floor', 'RCC', '2,000.00', '300.00', '6,00,000.00', '0.00', '0.00', '6,00,000.00');
            yPost = table.addRowT('', 'Total', '', '4,000.00', '', '16,00,000.00', '', '0.00', '16,00,000.00');
            
            yPos = table.addRow('', 'AS PER PLAN- For Present Stage Considered', '', 8, true);
            yPost = table.addRowT('1', 'Stilt Floor', 'RCC', '1,371.79', '500.00', '6,85,896.20', '0.00', '0.00', '6,85,896.20');
            yPost = table.addRowT('2', 'Ground Floor', 'RCC', '1,371.79', '300.00', '4,11,537.72', '0.00', '0.00', '4,11,537.72');
            yPost = table.addRowT('3', 'First Floor', 'RCC', '1,371.79', '0.00', '0.00', '0.00', '0.00', '0.00');
            yPost = table.addRowT('4', 'Second Floor', 'RCC', '1,371.79', '0.00', '0.00', '0.00', '0.00', '0.00');
            yPost = table.addRowT('5', 'Third Floor', 'RCC', '1,371.79', '0.00', '0.00', '0.00', '0.00', '0.00');
            yPost = table.addRowT('6', 'Terrace Floor', 'RCC', '265.56', '0.00', '0.00', '0.00', '0.00', '0.00');
            yPost = table.addRowT('', 'Total', '', '7,124.52', '', '10,97,433.92', '', '0.00', '10,97,433.92');

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
        const leftMargin = 18;  // Changed to 10
        const rightMargin = 10; // Kept as 20
        const tableWidth = pageWidth - (leftMargin + rightMargin);
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
    
        

        // Define column widths (adjusted for 9 columns)
        const colWidths = {
            slNo: 10,
            particulars: 28,
            roof: 10,
            area: 18,
            rate: 18,
            amountIn: 30,
            deprnIn: 18,
            deprnAmount: 25,
            netAmount: 25
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
   
   await Container3(doc, Container_3)
   addFooter(doc)
   return doc;
}