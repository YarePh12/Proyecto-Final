document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');
    
    const usuariosPermitidos = [
        { email: 'yare_ph@tecnova.com', password: '123456' },
        { email: 'mary_vc@tecnova.com', password: '123456' }
    ];

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        const usuarioValido = usuariosPermitidos.find(user => 
            user.email === email && user.password === password
        );
        
        if (usuarioValido) {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            window.location.href = 'index.html';
        } else {
            errorDiv.textContent = '❌ Correo o contraseña incorrectos. Intenta de nuevo.';
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    });
});