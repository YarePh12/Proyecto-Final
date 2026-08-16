// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const usersContainer = document.getElementById('usersContainer');
    
    // Mostrar loading
    usersContainer.innerHTML = `
        <div class="loading">
            <div class="spinner">⏳</div>
            <p>Cargando usuarios...</p>
        </div>
    `;

    // Función para obtener usuarios de la API
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const users = await response.json();
            displayUsers(users);
            
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            usersContainer.innerHTML = `
                <div class="error-message">
                    ❌ Error al cargar los usuarios. Por favor, intenta de nuevo más tarde.
                    <br><small>${error.message}</small>
                </div>
            `;
        }
    }

    // Función para mostrar los usuarios en el contenedor
    function displayUsers(users) {
        if (users.length === 0) {
            usersContainer.innerHTML = `
                <div class="error-message">
                    No se encontraron usuarios.
                </div>
            `;
            return;
        }

        // Generar el HTML para cada usuario
        const usersHTML = users.map(user => {
            // Obtener iniciales para el avatar
            const initials = user.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

            // Obtener nombre de la empresa (si existe)
            const companyName = user.company ? user.company.name : 'Sin empresa';

            return `
                <div class="user-card">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-info">
                        <h3>${user.name}</h3>
                        <div class="email">✉️ ${user.email}</div>
                        <div class="company">🏢 ${companyName}</div>
                        <div class="city">📍 ${user.address.city}</div>
                        <span class="user-badge">${user.username}</span>
                    </div>
                </div>
            `;
        }).join('');

        usersContainer.innerHTML = usersHTML;
    }

    // Iniciar la carga de usuarios
    fetchUsers();
});