let singInBtn = document.getElementById('signInBtn');
singInBtn.addEventListener('click', async function (event) {
    event.preventDefault();
    // console.log('executing function');
    let email = document.getElementById('signInEmail').value;
    let password = document.getElementById('signInPassword').value;
    let response = await fetch('/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password,
        }),
    });
    if (response.status == 401) {
        console.log('Failed to login');
        // popUpDisplay(...)
    } else {
        let result = await response.json();
        console.log(result.accessToken);
        localStorage.setItem('G16-AccessToken', result.accessToken);
        window.location.href = '/profile';
    }
});
