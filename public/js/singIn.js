let singInBtn = document.getElementById('signInBtn');
singInBtn.addEventListener('click', async function() {
    console.log("executing function");
    let email = document.getElementById('singInEmail').value;
    let password = document.getElementById('signInPassword').value;
    let response = await fetch('/singIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    let result = await response.json();
    console.log(result);
   
}); 