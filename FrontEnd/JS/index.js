const btnLogout = document.getElementById('botao_logout');

if(localStorage.getItem('user')) {
    btnLogout.setAttribute('style', 'display: block');
};

function getStarted() {
    if(localStorage.getItem('user')) {
        window.location.assign("./HTML/prompt.html")
        return
    };

    window.location.assign("./HTML/login.html")
}