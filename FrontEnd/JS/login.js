async function loginUser(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const URL = 'http://localhost:5000/login'

    let api = await fetch(URL, {
        method:'POST',
        body:JSON.stringify({
            "email": email,
            "password": senha
        }),
        headers:{
            'Content-Type':'application/json',
        }
    })

    if(api.ok) {
        let response = await api.json()
        alert('Login realized')
        localStorage.setItem('user', JSON.stringify(response))
        window.location.assign('../index.html')
        return
    }

    let responseError = await api.json()
    
    if(responseError.error){
        alert(responseError.error)
    }

}