const url = 'https://localhost:####/logout'

async function logoutUser() {

    let api = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        }
    })

    if(api.ok) {
        alert('Logout realizado com sucesso')
        localStorage.removeItem('user')
        window.location.reload()
        return
    }
    alert('Não foi possível realizar o logout')
}