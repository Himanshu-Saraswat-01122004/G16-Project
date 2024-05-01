// adding event listner
let submitButton = document.getElementById('submitProfile');
submitButton.addEventListener('click', async function (event) {
    event.preventDefault();
    // console.log('executing function');
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

    const token = localStorage.getItem('G16-AccessToken');
    // console.log(token);

    let response = await fetch('/updateProfile/updateProfilecontent', {
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
    console.log(result);
});

// adding event listner
let logOutButton = document.getElementById('logOut');
logOutButton.addEventListener('click', async function (event) {
    event.preventDefault();
    localStorage.removeItem('G16-AccessToken');

    console.log('ahfjkfdoijsdfoi');
    window.location.href = "/login";
});

