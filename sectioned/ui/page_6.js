document.getElementById("imageUpload").addEventListener("change", function (event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = ""; // Clear previous previews

    if (files.length > 10) {
        alert("You can upload a maximum of 10 images.");
        return;
    }

    let imagesArray = [];

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagesArray.push(e.target.result); // Store image data

            // Create image preview
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.margin = "5px";
            previewContainer.appendChild(img);

            // Store in localStorage after last image is loaded
            if (index === files.length - 1) {
                localStorage.setItem("uploadedImages", JSON.stringify(imagesArray));
            }
        };
        reader.readAsDataURL(file);
    });
});

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    if (images.length === 0) {
        alert("No images uploaded.");
        return;
    }

    // Page 1: Single Image with margins
    doc.addImage(images[0], "JPEG", 30, 30, 150, 200);

    // Page 2: 9 Images in a 3x3 grid
    if (images.length > 1) {
        doc.addPage();
        let xPos = 10, yPos = 10;
        let imgWidth = 60, imgHeight = 60; 

        for (let i = 1; i < images.length; i++) {
            doc.addImage(images[i], "JPEG", xPos, yPos, imgWidth, imgHeight);
            xPos += 65; // Move right

            if ((i - 1) % 3 === 2) { // After every 3 images, move to next row
                xPos = 10;
                yPos += 65;
            }
        }
    }

    doc.save("images.pdf");
}
