
// Form submission handler
document.getElementById('valuationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }

    const bank_info = {
        managerTitle: document.getElementById('managerTitle').value,
        managerDesignation: document.getElementById('managerDesignation').value,
        bankName: document.getElementById('bankName').value,
        branchLocation: document.getElementById('branchLocation').value
    }
    // Capture form data
    const Container_1 = {
        // Bank Details
        managerDesignation: document.getElementById('managerDesignation').value,
        bankName: document.getElementById('bankName').value,
        branchLocation: document.getElementById('branchLocation').value,
        
        // Property and Purpose Details
        propertyType: document.getElementById('propertyType').value,
        mainPurpose: document.getElementById('mainPurpose').value,
        subPurpose: document.getElementById('subPurpose').value,
        
        // Customer Details
        personsAccompanying: document.getElementById('customer_details_b').value,
        nameOfOwner: document.getElementById('customerName').value,
        nameOfPurchaser: document.getElementById('customer_details_c').value,
        applicationNo: document.getElementById('customer_details_d').value,
        
        // Property Details
        plotSiteNo: document.getElementById('property_plot_no').value,
        surveyNo: document.getElementById('property_survey_no').value,
        locality: document.getElementById('property_locality').value,
        district: document.getElementById('property_district').value,
        landmarkNear: document.getElementById('property_landmark').value,
        distance: document.getElementById('property_distance').value,
        legalAddress: document.getElementById('property_legal_address').value,
        nearbyLandmark: document.getElementById('property_nearby_landmark').value,
        
        // Document Details
        buildingPlan: document.getElementById('document_a').value,
        approvingAuthority: document.getElementById('document_b').value,
        approvalDetails: document.getElementById('document_c').value,
        legalDocuments: document.getElementById('document_d').value
    };

    console.log(Container_1 )
    // Call the function to generate the PDF
    try {
        // Wait for the PDF to be generated
        const doc = await generatePDF(Container_1);

        // Save the generated PDF
        doc.save('valuation_report.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('There was an error generating the PDF. Please try again.');
    }
});
