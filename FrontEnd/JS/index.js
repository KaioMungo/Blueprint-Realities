const btnLogout = document.getElementById('botao_logout');

if(localStorage.getItem('user')) {
    btnLogout.setAttribute('style', 'display: block');
};