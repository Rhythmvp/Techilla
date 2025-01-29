
function validateForm() {
  
    const name = document.getElementById("Sname").value.trim();
    const fatherName = document.getElementById("Fname").value.trim();
    const mobile = document.getElementById("Snumber").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("pwd").value;
    const confirmPassword = document.getElementById("confirmPwd").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value.trim();

   
    const mobilePattern = /^[0-9]{10}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   
    if (!name) {
        alert("Please enter the student's name.");
        return false;
    }

 
    if (!fatherName) {
        alert("Please enter the father's name.");
        return false;
    }


    if (!mobile || !mobilePattern.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
    }

 
    if (!username) {
        alert("Please enter a username.");
        return false;
    }

    // Password validation
    if (!password) {
        alert("Please enter a password.");
        return false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (!gender) {
        alert("Please select your gender.");
        return false;
    }


    if (!birthday) {
        alert("Please enter your birthday.");
        return false;
    }


    if (!email || !emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }


    return true;

}
export default validateForm;