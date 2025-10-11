async function registerUser(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const termos = document.getElementById("termos").checked;
    const confirm_password = document.getElementById("confirma_senha").value

    const URL = "http://127.0.0.1:5000/register";

    if (!email.includes('@') || !email.includes('.')){
        alert("Invalid email format.");
        return;
    }

    if (!termos){
        alert("You need to accept the terms and conditions.");
        return;
    }

    localStorage.setItem('user', nome);


    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: nome,
                email: email,
                password: senha,
                confirm_password: confirm_password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || 'Registration successful.');
            window.location.assign('../HTML/login.html');
        } else {
            alert(data.error || 'An error occurred.');
        }

    } catch (err) {
        console.error(err);
        alert('Network or server error.');
    }
}

