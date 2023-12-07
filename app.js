function showForm(formType) {
    document.getElementById('newApplicationForm').style.display = 'none';
    document.getElementById('downloadIDCardForm').style.display = 'none';
    document.getElementById('resultForm').style.display = 'none';

    document.getElementById(`${formType}Form`).style.display = 'block';
}

function triggerFileInput() {
    document.getElementById('picture').click();
}

function handleFileSelection(input) {
    var selectedFile = input.files[0];

    if (!selectedFile) {
        return;
    }

    var validFileTypes = ["image/jpeg", "image/png"];
    if (validFileTypes.indexOf(selectedFile.type) === -1) {
        alert("Invalid file type. Please select a JPEG or PNG file.");
        return;
    }

    var maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
    if (selectedFile.size > maxSizeInBytes) {
        alert("File size exceeds 1MB. Please select a smaller file.");
        return;
    }

    var preview = document.getElementById('preview');
    preview.style.display = 'block';
    preview.src = URL.createObjectURL(selectedFile);
}

function isValidCNICFormat(cnic) {
    var cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9vV]$/;
    return cnicPattern.test(cnic);
}

function submitData(event) {
    event.preventDefault();

    let studentName = document.getElementById('fullName').value.toUpperCase();
    let fatherName = document.getElementById('fatherName').value.toUpperCase();
    let CNIC = document.getElementById('cnic').value;

    if (studentName === "" || fatherName === "" || CNIC === "") {
        alert("Please fill in all required fields");
        return;
    }

    if (!isValidCNICFormat(CNIC)) {
        alert("Invalid CNIC format. Please enter a valid CNIC.");
        return;
    }

    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    var userExists = existingUsers.some(user => user.studentName === studentName && user.nic === CNIC && user.fatherName === fatherName);

    if (userExists) {
        alert('You have already enrolled with the same data. Please enter different information.');
        return;
    }

    let user = {
        studentName: studentName,
        nic: CNIC,
        fatherName: fatherName
    };

    existingUsers.push(user);

    console.log(user);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    document.getElementById('fullName').value = '';
    document.getElementById('fatherName').value = '';
    document.getElementById('cnic').value = '';

    alert('Data submitted successfully!');
}

function downloadIDCard(event) {
    event.preventDefault();
    let userIDCard = document.getElementById("downloadCard").value;

    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    var userToDownload = existingUsers.find(user => user.nic === userIDCard);

    if (userToDownload) {
        let idCardHtml = `
        <h3>ID Card</h3>
        <p>Name: ${userToDownload.studentName}</p>
        <p>Father Name: ${userToDownload.fatherName}</p>
        <p>NIC Number: ${userToDownload.nic}</p>
    `;
        document.getElementById("idCard").innerHTML = idCardHtml;
    } else {
        document.getElementById("idCard").innerHTML = "User Not Found";
    }
}

function submitForm(formType) {
    showForm('newApplication');
}