async function registerUser(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const termos = document.getElementById("termos").checked;
    const confirm_password = document.getElementById("confirma_senha").value

    const URL = "http://localhost:5000/register"

    if (!email.includes('@') || !email.includes('.')){
        alert("Invalid email format.");
        return;
    }

    if (!termos){
        alert("You need to accept the terms and conditions.");
        return;
    }

    localStorage.setItem('user', nome);

    let api = await fetch(URL, {
        method:'POST',
        body:JSON.stringify({
            "full_name": nome,
            "email": email,
            "password": senha,
            "confirm_password": confirm_password
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(api.ok){
        await api.json()
        alert('Registration successful.')
        window.location.assign('../HTML/login.html')
        return
    }

    let responseError = await api.json()
    
    if(responseError.error){
        alert(responseError.error)
    }
}

