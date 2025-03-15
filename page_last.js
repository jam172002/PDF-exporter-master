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


function Container1(doc) {
   let table = createTable(
       doc, 
       60, // startY
       'VALUATION REPORT - IMMOVABLE PROPERTY', // title
       'Type of Property – Under Construction Residential Land & Building' // subtitle
   );
   
   let yPos = table.getPosition();
   
   // Add first and second rows (existing)
   yPos = table.addRow('1', 'Purpose of Valuation', 'For Banks purpose – Construction Loan');
   yPos = table.addRow('2', 'Name of Customer (s)/ Borrower unit\n(for which valuation report is sought)', 'Owner: Mrs RIZWANA.A.PATEL & Mr ALTAF.D.PATEL\n(Mob No. 9810705282)', 16);
   
   // Customer Details section
   yPos = table.addRow('3', 'Customer Details', '', 8, true);
   yPos = table.addRow('a', 'Name of Customer/Applicant', 'Mrs RIZWANA.A.PATEL & Mr ALTAF.D.PATEL');
   yPos = table.addRow('b', 'Persons Accompanying / Contact No.', 'Visited independently');
   yPos = table.addRow('c', 'Name of Purchaser', 'NA');
   yPos = table.addRow('d', 'Application No', 'Not Available');

   // Property Details section
   yPos = table.addRow('4', 'Property Details', '', 8, true);
   yPos = table.addRow('a', 'Address', 'Property Site No. 198, The Layout formed by HMT Employees Co. Operative House building Society Ltd.,at Visveshwaraiah Nagar (Gangenahalli),Ward No 46, Bangalore - 560032.', 20);
   yPos = table.addRow('b', 'Nearby Landmark/Google Map /\nIndependent access to the property', 'Located near to R T Nagar Police Station on 80 ft Main Road, R T Nagar. It is about 09 kms from Bangalore City Bus Stand & Railway Station/ Google Map enclosed/ Yes it is Independently accessible.', 25);

   // Document Details section
   yPos = table.addRow('5', 'Document Details', '', 8, true);
   yPos = table.addRow('a', 'Building Plan', '', 8, true);
   yPos = table.addRow('i)', 'Yes/No', 'Yes');
   yPos = table.addRow('ii)', 'Name of Approving Authority', 'Approved by ADTP (East), BBMP');
   yPos = table.addRow('iii)', 'Approval No / Date / Details', 'BBMP/Ad.com/EST/0101/24-25');
   yPos = table.addRow('b', 'Legal & Other Documents', 'Photo Copies of Sale Deed dated 12/04/2001, Katha dated 30/03/2024, Tax paid receipt dated 03/04/2024 & Sanction Plan', 16);

   return yPos;
}


function Container2(doc) {
   let table = createTable(
       doc, 
       30, // startY
       '', // title
       '' // subtitle
   );
   
   let yPos = table.getPosition();
   
   
    yPos = table.addRow('6', 'Physical Details', '', 8, true);

   // Add first and second rows (existing)
   yPos = table.addRow('a', 'Adjoining Properties: ','As per document');
   yPos = table.addRow('i', 'East', 'Road', 8);
   yPos = table.addRow('ii', 'West', 'Site No: 161', 8);
   yPos = table.addRow('iii', 'North', 'Site No: 197', 8);
   yPos = table.addRow('iv', 'East', 'Site No: 199', 8);

   // Document Details section
   yPos = table.addRow('b', 'Matching of Boundaries', 'Yes', 8);
   yPos = table.addRow('c', 'Plot Demarcated', 'Yes', 8);
   yPos = table.addRow('d)', 'Approved and Land Use', 'Residental use');
   yPos = table.addRow('e)', 'Types of property', 'Under Construction Residential Land & Building');
   yPos = table.addRow('f)', 'Details of Accommodations', 'As per Actual');
   yPos = table.addRow('b', 'Legal & Other Documents', 'Photo Copies of Sale Deed dated 12/04/2001, Katha dated 30/03/2024, Tax paid receipt dated 03/04/2024 & Sanction Plan', 16);


   yPos = table.addRow('i', 'Living/ Dinning', 'UC', 8);
   yPos = table.addRow('ii', 'Bed Room & Pooja Room', 'UC', 8);
   yPos = table.addRow('iii', 'Toilet', 'UC', 8);
   yPos = table.addRow('iv', 'Kitchen', 'UC', 8);

   yPos = table.addRow('g', 'Total No of Floors', 'Stilt + GF + 3 Upper floor + Terrace (As per Plan)', 8);
   yPos = table.addRow('h', 'Floor on which the property is located', 'NA', 8);

   yPos = table.addRow('i', 'Year of construction', 'UC', 8);

   yPos = table.addRow('j', 'Year of construction', 'UC', 8);

   yPos = table.addRow('h', 'Year of construction', 'UC', 8);
   
   return yPos;
}

// Update the createTable function to accept null title/subtitle
function createTable(doc, startY, title, subtitle = null) {
   let yPosition = startY;
   const pageWidth = doc.internal.pageSize.getWidth();
   const margin = 10;
   const tableWidth = pageWidth - (1.4 * margin);
   
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
       doc.rect(margin, yPosition, tableWidth, 8);
       doc.setFontSize(11);
       doc.text(subtitle, pageWidth / 2, yPosition + 5.5, { align: 'center' });
       yPosition += 8;
   }
   
   // Rest of the createTable function remains the same...
   const col1Width = 10;
   const col2Width = 85;
   const col3Width = tableWidth - col1Width - col2Width;
   
   function addRow(number, description, value, height = 8, no_column = false) {
       if (no_column) {
           // Draw only two columns when no_column is true
           doc.rect(margin, yPosition, col1Width, height);
           doc.rect(margin + col1Width, yPosition, col2Width + col3Width, height); // Combine width of description and value columns
           
           if (number) {
               doc.setFont('helvetica', 'normal');
               doc.text(number.toString(), margin + 2, yPosition + 5);
           }
           
           // Set bold font for description when no_column is true
           doc.setFont('helvetica', 'bold');
           const splitDescription = doc.splitTextToSize(description, (col2Width + col3Width) - 4);
           doc.text(splitDescription, margin + col1Width + 2, yPosition + 5);
       } else {
           // Original three-column layout
           doc.rect(margin, yPosition, col1Width, height);
           doc.rect(margin + col1Width, yPosition, col2Width, height);
           doc.rect(margin + col1Width + col2Width, yPosition, col3Width, height);
           
           if (number) {
               doc.setFont('helvetica', 'normal');
               doc.text(number.toString(), margin + 2, yPosition + 5);
           }
           
           doc.setFont('helvetica', 'normal');
           const splitDescription = doc.splitTextToSize(description, col2Width - 4);
           doc.text(splitDescription, margin + col1Width + 2, yPosition + 5);
           
           const splitValue = doc.splitTextToSize(value, col3Width - 4);
           if (value.includes('Mrs')) {
               doc.setFont('helvetica', 'bold');
           }
           doc.text(splitValue, margin + col1Width + col2Width + 2, yPosition + 5);
       }
       
       yPosition += height;
       return yPosition;
   }
   
   return {
       addRow,
       getPosition: () => yPosition
   };
}

function container_last_page(doc, imagePath) {
    // Set initial positions and dimensions
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add "PHOTOGRAPHS:" text
    let yPosition = 30;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PHOTOGRAPHS:', margin, yPosition);
    
    // Calculate image dimensions and spacing
    const imageWidth = (pageWidth - (2 * margin) - 20) / 3;
    const imageHeight = (pageHeight - yPosition - margin - 60) / 3;
    const spacing = 10;
    
    // Starting position for the grid
    let startY = yPosition + 10;
    
    try {
        // Create a 3x3 grid of images
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const x = margin + (col * (imageWidth + spacing));
                const y = startY + (row * (imageHeight + spacing));
                
                // Add the image to each cell
                doc.addImage(imagePath, 'JPEG', x, y, imageWidth, imageHeight);
                
                // Draw border around the image
                doc.rect(x, y, imageWidth, imageHeight);
            }
        }
    } catch (error) {
        console.error('Error adding images:', error);
        
        // Fallback to placeholders if image loading fails
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const x = margin + (col * (imageWidth + spacing));
                const y = startY + (row * (imageHeight + spacing));
                
                // Draw border and placeholder
                doc.rect(x, y, imageWidth, imageHeight);
                doc.setFontSize(8);
                doc.text(`Photo ${row * 3 + col + 1}`, x + 2, y + 5);
            }
        }
    }
    
    return startY + (3 * (imageHeight + spacing));
}

function addFooter(doc) {
   const margin = 10;
   const pageWidth = doc.internal.pageSize.getWidth();
   const pageHeight = doc.internal.pageSize.getHeight();
   
   // Add horizontal line at the bottom
   const footerY = pageHeight - 25;
   doc.setLineWidth(0.1);
   doc.line(margin, footerY, pageWidth - margin, footerY);
   
   // Add the chartered engineers text
   doc.setFontSize(9);
   doc.setTextColor(65, 105, 225); // Blue color
   doc.setFont('helvetica', 'bold');
   doc.text('CHARTERED ENGINEERS | STRUCTURAL CONSULTANTS | N.D.T | R&R | VALUATION OF IMMOVABLE PROPERTIES.', 
       pageWidth / 2, footerY + 5, { align: 'center' });
   
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
   header(doc,2)
   container_last_page(doc, '/images/building.jpeg');
   addFooter(doc)
//   doc.save('valuation_report_first_page.pdf');
   return doc;
}