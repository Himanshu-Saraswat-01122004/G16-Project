// Used in: views/profile.ejs
const verifyPhoneCheckbox = document.getElementById('verifyPhone');
const otpContainer = document.getElementById('otpContainer');

verifyPhoneCheckbox.addEventListener('change', function () {
    if (verifyPhoneCheckbox.checked) {
        otpContainer.style.display = 'block';
        document.getElementById('otp').setAttribute('required', true);
    } else {
        otpContainer.style.display = 'none';
        document.getElementById('otp').removeAttribute('required');
    }
});
