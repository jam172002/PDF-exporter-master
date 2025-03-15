
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
        doc.text(bank_info.managerTitle, margin + 5, yPosition);
        yPosition += 5;
        doc.setFont('helvetica', 'bold');
        doc.text(bank_info.managerDesignation, margin + 5, yPosition);
        yPosition += 5;
        doc.text(bank_info.bankName, margin + 5, yPosition);
        yPosition += 5;
        doc.text(bank_info.branchLocation, margin + 5, yPosition);
    }

   
}

function Container1(doc, formData) {
    // Initial settings
    const margin = 18;
    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (margin * 1.55);
    let yPosition = 10;

    // Add logo on the right side
    const img = new Image();
    img.src = '../images/logo.png';

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
            yPos = table.addRow('2', 'Persons Accompanying / Contact No.', 'visited independently', 8);

            // Customer Details
            yPos = table.addRow('3', 'Customer Details', '', 8, true);
            yPos = table.addRow('a', 'Name of Owner', 'Mrs RIZWANA.A.PATEL & Mr ALTAF.D.PATEL');
            yPos = table.addRow('b', 'Name of Purchaser', 'NA');
            yPos = table.addRow('c', 'Application No', 'Not Available');

            // Property Details with Address Array
            yPos = table.addRow('4', 'Property Details', '', 8, true);
            const addressData = {
                row1: ['PLOT/ SITE NO', 'test', 'Survey.No', 'test'],
                row2: ['LOCALITY', 'test', 'DISTRICT', 'test'],
                row3: ['LAND MARK NEAR', 'test', 'DISTANCE ', 'test'],
                row4: ['LEGAL ADDRESS', 'test']
            };
            yPos = table.addAddressRow('a', 'Address', addressData);

            yPos = table.addRow('b', 'Nearby Landmark/Google Map /\nIndependent access to the property', 
                'Located near to R T Nagar Police Station on 80 ft Main Road, R T Nagar. It is about 09 kms from Bangalore City Bus Stand & Railway Station/ Google Map enclosed/ Yes it is Independently accessible.', 25);

            // Document Details
            yPos = table.addRow('5', 'Document Details', '', 8, true);
            yPos = table.addRow('a', 'Building Plan', '', 8, true);
            yPos = table.addRow('i)', 'Yes/No', 'Yes');
            yPos = table.addRow('ii)', 'Name of Approving Authority', 'Approved by ADTP (East), BBMP');
            yPos = table.addRow('iii)', 'Approval No / Date / Details', 'BBMP/Ad.com/EST/0101/24-25');
            yPos = table.addRow('b', 'Legal & Other Documents', 
                'Photo Copies of Sale Deed dated 12/04/2001, Katha dated 30/03/2024, Tax paid receipt dated 03/04/2024 & Sanction Plan', 16);

            resolve(yPos);
        };

        img.onerror = function() {
            console.error('Error loading logo');
            resolve(yPos);
        };
    });
}

function Container2(doc, formData) {
    let table = createTable(doc, 10, '', '');
    let yPos = table.getPosition();
    
    yPos = table.addRow('6', 'Physical Details', '', 8, true);
    
    yPos = table.addRow('a', 'Adjoining Properties: ', '', 8, true);
    yPos = table.addRow('i', 'East', formData.eastBoundary, 8);
    yPos = table.addRow('ii', 'West', formData.westBoundary, 8);
    yPos = table.addRow('iii', 'North', formData.northBoundary, 8);
    yPos = table.addRow('iv', 'South', formData.southBoundary, 8);

    yPos = table.addRow('b', 'Matching of Boundaries', formData.boundaryMatch, 8);
    yPos = table.addRow('c', 'Plot Demarcated', formData.plotDemarcation, 8);
    yPos = table.addRow('d)', 'Approved and Land Use', formData.landUse);
    yPos = table.addRow('e)', 'Types of property', formData.propertyType);
    yPos = table.addRow('f)', 'Details of Accommodations', 'As Per Actual');

    yPos = table.addRow('i', 'Living/ Dinning', formData.livingStatus, 8);
    yPos = table.addRow('ii', 'Bed Room & Pooja Room', formData.bedroomStatus, 8);
    yPos = table.addRow('iii', 'Toilet', formData.toiletStatus, 8);
    yPos = table.addRow('iv', 'Kitchen', formData.kitchenStatus, 8);

    yPos = table.addRow('g', 'Total No of Floors', formData.totalFloors, 8);
    yPos = table.addRow('h', 'Floor on which the property is located', formData.propertyFloor, 8);
    yPos = table.addRow('i', 'Year of construction', formData.constructionYear, 8);
    yPos = table.addRow('j', 'Approx. age of the Property', formData.propertyAge, 8);
    yPos = table.addRow('h', 'Residual age of the Property ', formData.residualAge, 8);
    
    yPos = table.addRow('k', 'Type of structure', formData.structureType, 20);
    yPos = table.addRow('', 'Amenities provided', formData.amenities, 8);

    yPos = table.addRow('7', 'Tenure / Occupancy Details', '',8, true)
    yPos = table.addRow('', 'Status of Tenure', '',8, true)
    yPos = table.addRow('i', 'Owned /Rented ', 'UC', 8);
    yPos = table.addRow('ii', 'No. of years of Occupancy', '-', 8);
    yPos = table.addRow('iii', 'Relationship of tenant or owner ', '-', 8);

    return yPos;
}

function Container3(doc, formData) {
    let table = createTable(doc, 10, '', '');
    let yPos = table.getPosition();
    
    yPos = table.addRow('8', 'Building Status', '', 8, true);
    yPos = table.addRow('i', 'Existing building', formData.existingBuilding);
    yPos = table.addRow('ii', 'Stage of construction', formData.constructionStage, 16);
    yPos = table.addRow('iii', 'Work completion', formData.workCompletion);
    
    yPos = table.addRow('9', 'Violations if any observed', '', 8, true);
    yPos = table.addRow('i', 'Nature and extent of violations', formData.violations, 16);

    yPos = table.addRow('10', 'Area Details of the Property', '', 8, true);
    yPos = table.addRow('i', 'Site Area', formData.siteArea);
    yPos = table.addRow('ii', 'Plinth area', formData.plinthArea);
    yPos = table.addRow('iii', 'Carpet area', formData.carpetArea);
    yPos = table.addRow('iv', 'Saleable area', formData.saleableArea);
    yPos = table.addRow('v', 'Remarks', formData.areaRemarks);
   
    yPos = table.addRow('11', 'Valuation Note', '', 8, true);
    yPos = table.addRow('a (i)', 'Mention the value as per Government Approved Rates also', formData.govtValue, 16);
    yPos = table.addRow('ii', 'Variation justification', formData.variationJustification, 30);
    
    yPos = table.addRow('b', 'Summary of Valuation', '', 8, true);
    yPos = table.addRow('i', 'Guideline Rate', formData.guidelineRate);
    yPos = table.addRow('ii', 'Market Rate', formData.marketRate, 20);
    yPos = table.addRow('iii', 'Land Value', formData.landValue);
    yPos = table.addRow('iv', 'Building Value', formData.buildingValue);
    yPos = table.addRow('v', 'Extra items, Amenities & Services', formData.extraItems);
    yPos = table.addRow('vi', 'Fair Market Value (SAY)', formData.fairMarketValue);
    yPos = table.addRow('c(vii)', 'Expected Rental Value', formData.rentalValue);

    return yPos;
}

function Container4(doc, formData) {
    // First, call the building value table
    let yPos = buildingValueTable(doc, formData);
    yPos += 10; // Add some spacing between tables
    
    // Now create the second table
    const leftMargin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const tableWidth = pageWidth - (leftMargin + rightMargin);
    
    // Define column widths
    const colWidths = {
        serial: 15,
        description: tableWidth - 85,
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
    addRow('1', 'Portico', formData.porticoStatus);
    addRow('2', 'Ornamental front door', formData.frontDoorStatus);
    addRow('3', 'Sit out / Verandah with steel grills', formData.verandahStatus);
    addRow('4', 'Bore well / Overhead Tank / Sump / Solar', formData.boreWellStatus);
    addRow('5', 'Extra steel / Collapsible gates', formData.gatesStatus);
    addRow('', 'Total', formData.extraItemsTotal, true);
    
    // Add section C: AMENITIES
    addRow('C', 'AMENITIES', '', true);
    addRow('1', 'Wardrobes', formData.wardrobesStatus);
    addRow('2', 'Glazed Tiles', formData.glazedTilesStatus);
    addRow('3', 'Extra sinks & bath tubs', formData.bathTubsStatus);
    addRow('4', 'Marble / Ceramic tiles flooring', formData.marbleFlooringStatus);
    addRow('5', 'Interior decorations', formData.interiorStatus);
    addRow('6', 'Architectural Elevation works', formData.architecturalStatus);
    addRow('7', 'Paneling works', formData.panelingStatus);
    addRow('8', 'Aluminium works', formData.aluminiumStatus);
    addRow('9', 'Aluminium hand rails', formData.handRailsStatus);
    addRow('10', 'False ceilings', formData.falseCeilingStatus);
    addRow('', 'Total', formData.amenitiesTotal, true);
    
    return yPos;
}

function buildingValueTable(doc, formData) {
    const startY = 10;
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

    // Define column widths
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

function Container5(doc) {
    let yPos = 30;
    const leftMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const tableWidth = pageWidth - (leftMargin + rightMargin);
    
    // Define column widths for first table
    const colWidths = {
        serial: 15,
        description: tableWidth - 85,
        amount: 70
    };
    
    // Function to add a row for first table
    function addRow(label, description, amount, isBold = false) {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(8);
        
        doc.rect(leftMargin, yPos, colWidths.serial, 7);
        doc.rect(leftMargin + colWidths.serial, yPos, colWidths.description, 7);
        doc.rect(leftMargin + colWidths.serial + colWidths.description, yPos, colWidths.amount, 7);
        
        if (label) {
            doc.text(label.toString(), leftMargin + 2, yPos + 5);
        }
        doc.text(description, leftMargin + colWidths.serial + 2, yPos + 5);
        if (amount) {
            doc.text(amount, leftMargin + colWidths.serial + colWidths.description + 2, yPos + 5);
        }
        
        yPos += 7;
    }
    
    // Add section D: MISCELLANEOUS
    addRow('D', 'MISCELLANEOUS', '', true);
    addRow('1', 'Separate toilet room', 'Under Construction');
    addRow('2', 'Separate lumber room', '"');
    addRow('', 'Total', 'Rs.0.00', true);
    
    // Add section E: SERVICES
    addRow('E', 'SERVICES', '', true);
    addRow('1', 'Water supply arrangements', 'Under Construction');
    addRow('2', 'Drainage arrangements', '"');
    addRow('3', 'Compound wall / gate', '"');
    addRow('4', 'C.B. Deposits, Fittings, Power etc.,', '"');
    addRow('5', 'Pavement', '"');
    addRow('', 'Total', 'Rs.0.00', true);

    // Add spacing between tables
    yPos += 5;

    // Define column widths for summary table
    const summaryColWidths = {
        serial: 15,
        description: 50,
        amount: 30,
        deprn: 30,
        deprnAmount: 30,
        netAmount: 30
    };

    // Function to add a row for summary table
    function addSummaryRow(serial, description, amount, deprn, deprnAmount, netAmount, isBold = false) {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(8);
        
        let xPos = leftMargin;
        
        // Draw cells
        doc.rect(xPos, yPos, summaryColWidths.serial, 7);
        xPos += summaryColWidths.serial;
        
        doc.rect(xPos, yPos, summaryColWidths.description, 7);
        xPos += summaryColWidths.description;
        
        doc.rect(xPos, yPos, summaryColWidths.amount, 7);
        xPos += summaryColWidths.amount;
        
        doc.rect(xPos, yPos, summaryColWidths.deprn, 7);
        xPos += summaryColWidths.deprn;
        
        doc.rect(xPos, yPos, summaryColWidths.deprnAmount, 7);
        xPos += summaryColWidths.deprnAmount;
        
        doc.rect(xPos, yPos, summaryColWidths.netAmount, 7);
        
        // Add text
        xPos = leftMargin;
        if(serial) doc.text(serial.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.serial;
        doc.text(description, xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.description;
        if(amount) doc.text(amount.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.amount;
        if(deprn) doc.text(deprn.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.deprn;
        if(deprnAmount) doc.text(deprnAmount.toString(), xPos + 2, yPos + 5);
        
        xPos += summaryColWidths.deprnAmount;
        if(netAmount) doc.text(netAmount.toString(), xPos + 2, yPos + 5);
        
        yPos += 7;
    }

    // Add summary table rows
    addSummaryRow('1', 'EXTRA ITEM', '250000.00', '0.00', '0.00', '250000.00');
    addSummaryRow('2', 'AMENITIES', '0.00', '0.00', '0.00', '0.00');
    addSummaryRow('3', 'MISCELLANEOUS', '0.00', '0.00', '0.00', '0.00');
    addSummaryRow('4', 'SERVICES', '0.00', '0.00', '0.00', '0.00');
    addSummaryRow('', 'TOTAL', '250000.00', '', '0.00', '250000.00', true);
    
    yPos += 7;

    // Add title for the abstract table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL ABSTRACT OF THE ENTIRE PROPERTY', leftMargin, yPos);
    yPos += 5;

    // Define column widths for abstract table
    const abstractColWidths = {
        slNo: 30,
        particulars: pageWidth - (leftMargin + rightMargin) - 100,
        amount: 70
    };

    // Function to add row for abstract table
    function addAbstractRow(slNo, particulars, amount, isBold = false, indent = false) {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(8);
        
        // Draw cells
        doc.rect(leftMargin, yPos, abstractColWidths.slNo, 7);
        doc.rect(leftMargin + abstractColWidths.slNo, yPos, abstractColWidths.particulars, 7);
        doc.rect(leftMargin + abstractColWidths.slNo + abstractColWidths.particulars, yPos, abstractColWidths.amount, 7);
        
        // Add text
        if(slNo) {
            let xOffset = indent ? 5 : 2;
            doc.text(slNo, leftMargin + xOffset, yPos + 5);
        }
        doc.text(particulars, leftMargin + abstractColWidths.slNo + 2, yPos + 5);
        if(amount) {
            doc.text(amount, leftMargin + abstractColWidths.slNo + abstractColWidths.particulars + 2, yPos + 5);
        }
        
        yPos += 7;
    }

    // Add abstract table rows
    addAbstractRow('I', 'MARKET VALUE OF THE PROPERTY', '', true);
    addAbstractRow('A', 'LAND', '3,60,00,000.00', false, true);
    addAbstractRow('B', 'BUILDING', '10,97,433.92', false, true);
    addAbstractRow('C', 'EXTRA ITEM', '', false, true);
    addAbstractRow('D', 'AMENITIES', '', false, true);
    addAbstractRow('E', 'MISCELLANEOUS', '2,50,000.00', false, true);
    addAbstractRow('F', 'SERVICES', '', false, true);
    addAbstractRow('', 'TOTAL', '3,73,47,433.92', true);
    addAbstractRow('', 'SAY', '3,73,00,000.00', true);
    addAbstractRow('', 'REALISABLE SALE VALUE', '3,35,00,000.00');
    addAbstractRow('', 'FORCED SALE VALUE', '2,90,00,000.00');
    addAbstractRow('II', 'GUIDANCE VALUE OF THE PROPERTY', '', true);
    addAbstractRow('A', 'LAND', '1,90,03,717.47', false, true);
    addAbstractRow('B', 'BUILDING', '10,97,433.92', false, true);
    addAbstractRow('', 'TOTAL', '2,01,01,151.39', true);
    addAbstractRow('', 'SAY', '2,01,00,000.00', true);


    return yPos;
}

function Container6(doc) {
    let yPos = 30;
    const leftMargin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const textWidth = pageWidth - (leftMargin + rightMargin);
    
    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('VALUATION CERTIFICATE', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Add valuation text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    const valuationText = `As a result of my appraisal and analysis, it is my considered opinion that the present fair market value of the above property in the prevailing condition with aforesaid specifications is Rs.3,73,00,000/- RUPEES THREE CRORE SEVENTY THREE LAKHS ONLY. The Realizable value of the property is Rs.3,35,00,000/- RUPEES THREE CRORE THIRTY FIVE LAKHS ONLY and the Distress / Forced Sale value is Rs.2,90,00,000/- RUPEES TWO CRORE NINTY LAKHS ONLY.`;
    
    const splitText = doc.splitTextToSize(valuationText, textWidth);
    const lineHeight = 6; // Adjust this value to change line spacing
    
    splitText.forEach((line, index) => {
        doc.text(line, leftMargin, yPos + (index * lineHeight));
    });
    yPos += splitText.length *7;

    // Declaration table
    const colWidths = {
        serial: 20,
        content: textWidth - 20
    };

    // Function to add declaration row
    function addDeclarationRow(serial, content, isBold = false) {
        const height = Math.max(7, Math.ceil(doc.splitTextToSize(content, colWidths.content - 4).length * 7));
        
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(9);
        
        // Draw cells
        doc.rect(leftMargin, yPos, colWidths.serial, height);
        doc.rect(leftMargin + colWidths.serial, yPos, colWidths.content, height);
        
        // Add text
        if(serial) {
            doc.text(serial.toString(), leftMargin + 2, yPos + 5);
        }
        
        const splitContent = doc.splitTextToSize(content, colWidths.content - 4);
        doc.text(splitContent, leftMargin + colWidths.serial + 2, yPos + 5);
        
        yPos += height;
        return height;
    }

    // Add declaration rows
    addDeclarationRow('16', 'Declaration', true);
    addDeclarationRow('a', 'I hereby declare that', true);
    addDeclarationRow('i)', 'The information provided is true and correct to the best of my knowledge and belief.');
    addDeclarationRow('ii)', 'The analysis and conclusion are limited by the reported assumptions and conditions.');
    addDeclarationRow('iii)', 'I have read the Handbook on policy, Standard and Procedures for real Estate valuation by banks and HFIs in India, 2011, issued by IBA and NHB, fully understood the provisions of the same and followed the provisions of the same to the best of my ability and this report is in conformity to the standards of Reporting enshrined in the above Handbook.');
    addDeclarationRow('iv)', 'I have no direct or indirect interest in the above property valued.');
    addDeclarationRow('v)', 'The Property was inspected by me on 03/12/2024 along with the Owner.');
    addDeclarationRow('vi)', 'I am a registered valuer under section 34AB of Wealth tax act, 1957, CAT-I/Reg.No.02/PCIT-I/CCIT/BNG-1/2023-24 for valuing property.');
    addDeclarationRow('vii)', 'The valuation made with reference to the photocopies given only irrespective of the legal opinion');
    addDeclarationRow('viii )', 'The validity of the report is only for 3 months and is to be used purpose intended for and not for any other purpose');

    return yPos;
} 

function Container7(doc) {
    let yPos = 30;
    const leftMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const textWidth = pageWidth - (leftMargin + rightMargin);
    
    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('VALUATION CERTIFICATE', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    // Add valuation text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    const valuationText = `As a result of my appraisal and analysis, it is my considered opinion that the present fair market value of the above property in the prevailing condition with aforesaid specifications is Rs.3,73,00,000/- RUPEES THREE CRORE SEVENTY THREE LAKHS ONLY. The Realizable value of the property is Rs.3,35,00,000/- RUPEES THREE CRORE THIRTY FIVE LAKHS ONLY and the Distress / Forced Sale value is Rs.2,90,00,000/- RUPEES TWO CRORE NINTY LAKHS ONLY.`;
    
    const splitText = doc.splitTextToSize(valuationText, textWidth);
    const lineHeight = 6; // Adjust this value to change line spacing
    
    splitText.forEach((line, index) => {
        doc.text(line, leftMargin, yPos + (index * lineHeight));
    });
    yPos += splitText.length *6;

    // Declaration table
    const colWidths = {
        serial: 20,
        content: textWidth - 20
    };

    // Function to add declaration row
    function addDeclarationRow(serial, content, isBold = false) {
        const height = Math.max(7, Math.ceil(doc.splitTextToSize(content, colWidths.content - 4).length * 7));
        
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(9);
        
        // Draw cells
        doc.rect(leftMargin, yPos, colWidths.serial, height);
        doc.rect(leftMargin + colWidths.serial, yPos, colWidths.content, height);
        
        // Add text
        if(serial) {
            doc.text(serial.toString(), leftMargin + 2, yPos + 5);
        }
        
        const splitContent = doc.splitTextToSize(content, colWidths.content - 4);
        doc.text(splitContent, leftMargin + colWidths.serial + 2, yPos + 5);
        
        yPos += height;
        return height;
    }

    // Add declaration rows
    addDeclarationRow('16', 'Declaration', true);
    addDeclarationRow('a', 'I hereby declare that', true);
    addDeclarationRow('i)', 'The information provided is true and correct to the best of my knowledge and belief.');
    addDeclarationRow('ii)', 'The analysis and conclusion are limited by the reported assumptions and conditions.');
    addDeclarationRow('iii)', 'I have read the Handbook on policy, Standard and Procedures for real Estate valuation by banks and HFIs in India, 2011, issued by IBA and NHB, fully understood the provisions of the same and followed the provisions of the same to the best of my ability and this report is in conformity to the standards of Reporting enshrined in the above Handbook.');
    addDeclarationRow('iv)', 'I have no direct or indirect interest in the above property valued.');
    addDeclarationRow('v)', 'The Property was inspected by me on 03/12/2024 along with the Owner.');
    addDeclarationRow('vi)', 'I am a registered valuer under section 34AB of Wealth tax act, 1957, CAT-I/Reg.No.02/PCIT-I/CCIT/BNG-1/2023-24 for valuing property.');
    addDeclarationRow('vii)', 'The valuation made with reference to the photocopies given only irrespective of the legal opinion');
    addDeclarationRow('viii )', 'The validity of the report is only for 3 months and is to be used purpose intended for and not for any other purpose');

    
    yPos += 6; // Add spacing before new table

    const tableWidth = textWidth; // Use same width as rest of content
    
    // Function to add details row with better alignment
    function addDetailsRow(label, value, height = 10) {
        doc.setFontSize(9);
        
        // Draw cells with full width
        doc.rect(leftMargin, yPos, tableWidth/2, height);
        doc.rect(leftMargin + tableWidth/2, yPos, tableWidth/2, height);
        
        // Add text with better alignment
        doc.setFont('helvetica', 'bold');
        const splitLabel = doc.splitTextToSize(label, tableWidth/2 - 4);
        doc.text(splitLabel, leftMargin + 2, yPos + 6);
        
        doc.setFont('helvetica', 'normal');
        const splitValue = doc.splitTextToSize(value, tableWidth/2 - 4);
        doc.text(splitValue, leftMargin + tableWidth/2 + 2, yPos + 6);
        
        yPos += height;
    }
    
    // Add valuer details table with consistent width
    addDetailsRow('Name of the Valuer', 'Mr BALAKRISHNA R');
    addDetailsRow('Address', '# 240/C, First floor, 3rd Block, Nagarabhavi 2nd stage, Bangalore-560072');
    addDetailsRow('Name of valuer association of which I am a\nbonafide member in good standing', 'Indian Institute of Engineers', 15);
    addDetailsRow('Wealth tax Registration No', 'CAT-I/Reg.No.02/PCIT-I/CCIT/BNG-1/2023-24');
    
    // Create signature box
    yPos += 5;
    doc.rect(leftMargin, yPos, tableWidth, 40); // Add box for signature
    
    // Add signature text aligned to left inside box
    doc.setFont('helvetica', 'bold');
    doc.text('Seal & Signature of the Valuer', leftMargin + 2, yPos + 10);
    
    // Add date and contact details inside box with proper alignment
    const detailsX = leftMargin + 2;
    const detailsY = yPos + 15;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Date   : ', detailsX, detailsY);
    doc.setFont('helvetica', 'normal');
    doc.text('04nd DECEMBER 2024', detailsX + 25, detailsY);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Mobile No : ', detailsX, detailsY + 7);
    doc.setFont('helvetica', 'normal');
    doc.text('9743142447', detailsX + 35, detailsY + 7);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Email : ', detailsX, detailsY + 14);
    doc.setFont('helvetica', 'normal');
    doc.text('balakrishna@truepeak.in', detailsX + 25, detailsY + 14);

    return yPos;

} 

// Update the createTable function to accept null title/subtitle
function createTable(doc, startY, title, subtitle = null) {
    let yPosition = startY;
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 18;  // Changed to 10
    const rightMargin = 10; // Kept as 20
    const tableWidth = pageWidth - (leftMargin + rightMargin); // Updated calculation
    
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
    function addAddressRow(number, description, addressData) {
        const rowHeight = 30;
        const childRowHeight = rowHeight / 4;
        const col1Width = 10;
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
        const rowHeight = 16;
        const singleRowHeight = rowHeight / 2;
        const col1Width = 10;
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
        
        // Add number and description
        doc.setFont('helvetica', 'normal');
        doc.text(number.toString(), leftMargin + 2, yPosition + 8);
        doc.text(description, leftMargin + col1Width + 2, yPosition + 8);
        

        // Add text in top row (bold)
        doc.setFont('helvetica', 'bold');
        doc.text(col3Texts[0], col3Start + 2, yPosition + 5);
        doc.text(col3Texts[1], col3Start + col3SplitWidth + 2, yPosition + 5);
        
        // Add text in bottom row (normal)
        doc.setFont('helvetica', 'normal');
        doc.text(col3Texts[2], col3Start + 2, yPosition + singleRowHeight + 5);
        doc.text(col3Texts[3], col3Start + col3SplitWidth + 2, yPosition + singleRowHeight + 5);
        
        yPosition += rowHeight;
        return yPosition;
    }

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
            // if (value.includes('Mrs')) {
            //     doc.setFont('helvetica', 'bold');
            // }
            doc.text(splitValue, leftMargin + col1Width + col2Width + 2, yPosition + 5);  // Updated to use leftMargin
        }
        
        yPosition += height;
        return yPosition;
    }
    
    return {
        addRow,
        addSplitColumnRow,
        addAddressRow,
        getPosition: () => yPosition
    };
 }

 
 function addFooter(doc, pageNumber) {  // Add pageNumber parameter
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
    // Page number on right with automatic numbering
    doc.text(`Page ${pageNumber}`, pageWidth - margin - 20, footerY + 15);
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

async function generatePDF(bank_info, Container_1, Container_2, Container_3, Container_4) {
   const { jsPDF } = window.jspdf;
   const doc = new jsPDF();
   let currentPage = 1;

   await Container1(doc, Container_1)
   addFooter(doc, currentPage++)

   doc.addPage()
   Container2(doc, Container_2)
   addFooter(doc, currentPage++)

   doc.addPage()
   Container3(doc, Container_3)
   addFooter(doc, currentPage++)

   doc.addPage()
   Container4(doc, Container_4)
   addFooter(doc, currentPage++)

//    doc.addPage()
//    header(doc, page=5)
//    Container5(doc)
//    addFooter(doc, currentPage++)

//    doc.addPage()
//    header(doc, page=6)
//    Container6(doc)
//    addFooter(doc, currentPage++)
   
//    doc.addPage()
//    header(doc, page=7)
//    Container7(doc)
//    addFooter(doc)

   doc.addPage()
   header(doc, page=8)
   container_last_page(doc, '/images/building.jpeg');
   addFooter(doc)

   doc.save('Final_version.pdf');
   return doc;
}