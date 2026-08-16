document.addEventListener('DOMContentLoaded', function() {
    cargarSoporte();
});

async function cargarSoporte() {
    const container = document.getElementById('supportContainer');
    
    container.innerHTML = `
        <div class="loading-support">
            <div class="spinner"></div>
            <p>Cargando información de soporte...</p>
        </div>
    `;

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        
        if (!response.ok) {
            throw new Error('Error al cargar los datos de soporte');
        }
        
        const datos = await response.json();
        mostrarSoporte(datos);
        
    } catch (error) {
        container.innerHTML = `
            <div class="error-support">
                <span class="error-icon">❌</span>
                <p>Error al cargar los datos de soporte</p>
                <p>${error.message}</p>
                <button class="btn-retry" onclick="cargarSoporte()">🔄 Reintentar</button>
            </div>
        `;
    }
}

function mostrarSoporte(datos) {
    const container = document.getElementById('supportContainer');
    
    // ===== CONFIGURACIÓN DE SERVICIOS =====
    const servicios = [
        { 
            icon: '🌐', 
            nombre: 'Servidor Web',
            descripcion: 'Infraestructura principal que aloja nuestras aplicaciones web y servicios en línea.',
            caracteristicas: [
                'Configuración de acceso y permisos',
                'Seguridad y protección de aplicaciones',
                'Administración de la red de datos',
                'Monitoreo de rendimiento en tiempo real'
            ]
        },
        { 
            icon: '🗄️', 
            nombre: 'Base de Datos',
            descripcion: 'Sistema central de almacenamiento y gestión de toda la información de la empresa.',
            caracteristicas: [
                'Almacenamiento seguro de datos críticos',
                'Consultas rápidas y optimizadas',
                'Respaldo y recuperación de información',
                'Control de acceso y permisos'
            ]
        },
        { 
            icon: '🔗', 
            nombre: 'API Gateway',
            descripcion: 'Punto de entrada único que gestiona y enruta todas las solicitudes a los microservicios.',
            caracteristicas: [
                'Integración entre aplicaciones y servicios',
                'Configuración de rutas y endpoints',
                'Balanceo de carga y alta disponibilidad',
                'Autenticación y autorización centralizada'
            ]
        },
        { 
            icon: '🔐', 
            nombre: 'Autenticación',
            descripcion: 'Sistema de validación de identidad que protege el acceso a todas las plataformas.',
            caracteristicas: [
                'Validación de usuarios y dispositivos',
                'Control de acceso por roles y permisos',
                'Tokens JWT para sesiones seguras',
                'Autenticación de dos factores (2FA)'
            ]
        },
        { 
            icon: '⚡', 
            nombre: 'Cache Redis',
            descripcion: 'Sistema de caché de alto rendimiento que acelera la entrega de datos.',
            caracteristicas: [
                'Almacenamiento en caché de datos frecuentes',
                'Reducción de latencia y tiempos de respuesta',
                'Alta disponibilidad y tolerancia a fallos',
                'Sincronización en tiempo real'
            ]
        },
        { 
            icon: '📧', 
            nombre: 'Servicio de Correo',
            descripcion: 'Plataforma de comunicación que gestiona el envío y recepción de correos electrónicos.',
            caracteristicas: [
                'Envío de correos transaccionales y notificaciones',
                'Seguimiento y análisis de entregas',
                'Plantillas personalizadas por tipo de mensaje',
                'Filtrado y protección contra spam'
            ]
        }
    ];
    
    // ===== ESTADOS DE CADA SERVICIO =====
    const estados = ['Operativo', 'Mantenimiento', 'Operativo', 'Operativo', 'Inactivo', 'Operativo'];
    const prioridades = ['Alta', 'Media', 'Baja', 'Media', 'Alta', 'Baja'];
    
    let html = '';
    datos.forEach((item, index) => {
        // ===== DETERMINAR ESTADO =====
        let statusClass = 'status-operational';
        let statusIcon = '✅';
        let statusText = 'Operativo';
        
        if (estados[index] === 'Mantenimiento') {
            statusClass = 'status-maintenance';
            statusIcon = '🔧';
            statusText = 'Mantenimiento';
        } else if (estados[index] === 'Inactivo') {
            statusClass = 'status-down';
            statusIcon = '❌';
            statusText = 'Inactivo';
        }
        
        // ===== DETERMINAR PRIORIDAD =====
        let priorityClass = 'priority-low';
        let priorityIcon = '🟢';
        if (prioridades[index] === 'Alta') {
            priorityClass = 'priority-high';
            priorityIcon = '🔴';
        } else if (prioridades[index] === 'Media') {
            priorityClass = 'priority-medium';
            priorityIcon = '🟡';
        }
        
        // ===== GENERAR CARACTERÍSTICAS =====
        const features = servicios[index].caracteristicas
            .map(f => `<li>${f}</li>`)
            .join('');
        
        // ===== CONSTRUIR TARJETA =====
        html += `
            <div class="support-item ${statusClass}">
                <div class="card-header">
                    <span class="service-icon">${servicios[index].icon}</span>
                    <span class="ticket-id">Ticket #${item.id}</span>
                </div>
                <h4>${servicios[index].nombre}</h4>
                <div class="service-desc">
                    <strong>📋 Descripción:</strong> ${servicios[index].descripcion}
                </div>
                <ul class="features">
                    ${features}
                </ul>
                <div class="card-footer">
                    <span class="priority-badge ${priorityClass}">
                        <span class="priority-icon">${priorityIcon}</span>
                        Prioridad: ${prioridades[index]}
                    </span>
                    <span class="status-badge ${statusClass}">
                        <span class="status-icon">${statusIcon}</span>
                        ${statusText}
                    </span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}