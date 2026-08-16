// Funcionalidad del Blog - Filtros y Búsqueda

// Variable para almacenar la categoría actual
let currentCategory = 'todos';

// Función para filtrar por categoría
function filterByCategory(category) {
    currentCategory = category;
    
    // Actualizar botones activos
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(getCategoryLabel(category)) || category === 'todos') {
            if (category === 'todos' && btn.textContent.includes('Todos')) {
                btn.classList.add('active');
            } else if (category !== 'todos' && btn.textContent.includes(getCategoryLabel(category))) {
                btn.classList.add('active');
            }
        }
    });
    
    // Aplicar filtros
    applyFilters();
}

// Función para obtener la etiqueta de la categoría
function getCategoryLabel(category) {
    const labels = {
        'tecnologia': '💻 Tecnología',
        'innovacion': '🚀 Innovación',
        'negocios': '📊 Negocios',
        'seguridad': '🔒 Seguridad'
    };
    return labels[category] || category;
}

// Función para filtrar artículos
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.blog-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const content = title + ' ' + description;
        
        // Verificar si coincide con la categoría y la búsqueda
        const categoryMatch = currentCategory === 'todos' || category === currentCategory;
        const searchMatch = searchTerm === '' || content.includes(searchTerm);
        
        if (categoryMatch && searchMatch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    showNoResults(visibleCount === 0);
}

// Función para mostrar mensaje de no resultados
function showNoResults(show) {
    const grid = document.getElementById('blogGrid');
    const existing = document.querySelector('.no-results');
    
    if (existing) {
        existing.remove();
    }
    
    if (show) {
        const message = document.createElement('div');
        message.className = 'no-results';
        message.innerHTML = `
            <h3>🔍 No se encontraron artículos</h3>
            <p>Intenta con otra palabra clave o categoría.</p>
        `;
        grid.appendChild(message);
    }
}

// Función para filtrar por búsqueda (se llama desde el input)
function filterBlogs() {
    applyFilters();
}

// Inicializar los filtros al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el primer botón como activo
    const firstBtn = document.querySelector('.filter-btn');
    if (firstBtn) {
        firstBtn.classList.add('active');
    }
    
    // Aplicar filtros iniciales
    applyFilters();
});