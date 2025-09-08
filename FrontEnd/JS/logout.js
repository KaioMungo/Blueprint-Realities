const url = 'https://localhost:####/logout'

async function logoutUser() {

    let api = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        }
    })

    if(api.ok) {
        alert('Logout successful')
        localStorage.removeItem('user')
        window.location.reload()
        return
    }
    alert('Unable to logout')
}