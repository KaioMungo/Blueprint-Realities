async function logoutUser() {
    alert('Logout successful')
    localStorage.removeItem('user')
    window.location.reload()
    return
}