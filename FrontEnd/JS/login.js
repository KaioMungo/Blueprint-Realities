async function loginUser(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value


    let api = await fetch(url, {
        method:'POST',
        body:JSON.stringify({
            "email": email,
            "password": senha,
            
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
    
    if(responseError.data.error){
        alert(responseError.data.error)
    }

}