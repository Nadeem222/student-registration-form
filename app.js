function showForm(formType) {
    document.getElementById('newApplicationForm').style.display = 'none';
    document.getElementById('downloadIDCardForm').style.display = 'none';
    document.getElementById('resultForm').style.display = 'none';
    // Add more lines to hide other forms if needed

    document.getElementById(`${formType}Form`).style.display = 'block';
}

function submitForm(formType) {
    showForm('newApplication');
}