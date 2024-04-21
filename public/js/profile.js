// adding event listner
let submitButton = document.getElementById('submitProfile');
submitButton.addEventListener('click', async function () {
    let name = document.getElementById('name').value;
    let DOB = document.getElementById('DOB').value;
    let phoneno = document.getElementById('phoneno').value;
    let gender = document.getElementById('gender').value;
    let Aadhar = document.getElementById('Aadhar').value;
    let PanNo = document.getElementById('PanNo').value;
    let address = document.getElementById('address').value;
    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;
    let pincode = document.getElementById('pincode').value;
    let about = document.getElementById('about').value;

    const token = localStorage.getItem('G16-Token');
    let response = await fetch('/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Bearer: token,
        },
        body: JSON.stringify({
            name: name,
            DOB: DOB,
            phoneno: phoneno,
            gender: gender,
            Aadhar: Aadhar,
            PanNo: PanNo,
            address: address,
            country: country,
            state: state,
            city: city,
            pincode: pincode,
            about: about,
        }),
    });

    let result = await response.json();
    alert(result.message);
    location.reload();
});
