// Validación y envío del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            const terminos = document.getElementById('terminos').checked;
            
            // Validaciones
            if (nombre.length < 3) {
                showAlert('Por favor, ingresa tu nombre completo (mínimo 3 caracteres)', 'error');
                document.getElementById('nombre').focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Por favor, ingresa un correo electrónico válido', 'error');
                document.getElementById('email').focus();
                return;
            }
            
            if (telefono && !isValidPhone(telefono)) {
                showAlert('Por favor, ingresa un número de teléfono válido (ej: 55 1234 5678)', 'error');
                document.getElementById('telefono').focus();
                return;
            }
            
            if (!asunto) {
                showAlert('Por favor, selecciona un asunto', 'error');
                document.getElementById('asunto').focus();
                return;
            }
            
            if (mensaje.length < 10) {
                showAlert('Por favor, escribe un mensaje de al menos 10 caracteres', 'error');
                document.getElementById('mensaje').focus();
                return;
            }
            
            if (!terminos) {
                showAlert('Debes aceptar los términos y condiciones', 'error');
                return;
            }
            
            // Simular envío
            const btnSubmit = form.querySelector('.btn-submit');
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;
            
            setTimeout(() => {
                showAlert('✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                form.reset();
                btnSubmit.textContent = 'Enviar Mensaje ✉️';
                btnSubmit.disabled = false;
            }, 2000);
        });
    }
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhone(phone) {
    const regex = /^(\+?\d{1,3}[\s-]?)?\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/;
    return regex.test(phone);
}

function showAlert(message, type = 'info') {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.textContent = message;
    
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        animation: slideDown 0.5s ease;
        max-width: 90%;
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 15px;
    `;
    
    if (type === 'success') {
        alert.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        alert.style.color = 'white';
    } else if (type === 'error') {
        alert.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        alert.style.color = 'white';
    } else {
        alert.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
        alert.style.color = 'white';
    }
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 4000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('custom-alert')) {
        e.target.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            e.target.remove();
        }, 500);
    }
});