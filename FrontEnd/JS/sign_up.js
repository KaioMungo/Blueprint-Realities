const url = "http://localhost:####/"

async function registerUser(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const termos = document.getElementById("termos").checked;
    const confirm_password = document.getElementById("confirma_senha").value



    if (!email.includes('@') || !email.includes('.')){
        alert("Invalid email format.");
        return;
    }

    if (!termos){
        alert("You need to accept the terms and conditions.");
        return;
    }


    localStorage.setItem('user', nome);
    alert("Registration successful.");


    let api = await fetch(url, {
        method:'POST',
        body:JSON.stringify({
            "name": nome,
            "email": email,
            "password": senha,
            "confirm_password": confirm_password
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(api.ok){
        let response = await api.json()
        alert(`Registration successful.\n${response.data}`)
        window.location.assign('../HTML/login.html')
        return
    }

    let responseError = await api.json()
    
    if(responseError.data.error){
        alert(responseError.data.error)
    }


}

