document.addEventListener('DOMContentLoaded', function() {
    // Actualizar información de autoría
    const authorName = document.getElementById('author-name');
    const universityName = document.getElementById('university-name');
    const publishDate = document.getElementById('publish-date');
    const updateDate = document.getElementById('update-date');
    
    authorName.textContent = 'Tu Nombre'; // Reemplaza con tu nombre
    universityName.textContent = 'Nombre de tu Universidad'; // Reemplaza con tu universidad
    
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    
    publishDate.textContent = formattedDate;
    updateDate.textContent = formattedDate;
    
    // Función de búsqueda
    const searchInput = document.getElementById('shortcutSearch');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // Base de datos de atajos
    const shortcuts = [
        { keys: 'Ctrl + C', description: 'Copiar el elemento seleccionado', category: 'basicos' },
        { keys: 'Ctrl + X', description: 'Cortar el elemento seleccionado', category: 'basicos' },
        { keys: 'Ctrl + V', description: 'Pegar el elemento seleccionado', category: 'basicos' },
        { keys: 'Ctrl + Z', description: 'Deshacer una acción', category: 'basicos' },
        { keys: 'Ctrl + Y', description: 'Rehacer una acción', category: 'basicos' },
        { keys: 'Ctrl + A', description: 'Seleccionar todos los elementos', category: 'basicos' },
        { keys: 'Alt + Tab', description: 'Cambiar entre aplicaciones abiertas', category: 'productividad' },
        { keys: 'Windows + D', description: 'Mostrar/ocultar el escritorio', category: 'productividad' },
        { keys: 'Windows + L', description: 'Bloquear el equipo', category: 'productividad' },
        { keys: 'Ctrl + Shift + Esc', description: 'Abrir el Administrador de tareas', category: 'productividad' },
        { keys: 'Windows + E', description: 'Abrir el Explorador de archivos', category: 'productividad' },
        { keys: 'Windows + número (1-9)', description: 'Abrir la aplicación anclada en la barra de tareas en esa posición', category: 'productividad' },
        { keys: 'Windows + I', description: 'Abrir Configuración', category: 'sistema' },
        { keys: 'Windows + R', description: 'Abrir el cuadro Ejecutar', category: 'sistema' },
        { keys: 'Windows + X', description: 'Abrir el menú de enlace rápido', category: 'sistema' },
        { keys: 'Windows + Pausa', description: 'Abrir las propiedades del sistema', category: 'sistema' },
        { keys: 'Alt + F4', description: 'Cerrar la ventana activa', category: 'sistema' },
        { keys: 'Windows + Shift + S', description: 'Capturar una parte de la pantalla', category: 'sistema' },
        { keys: 'Windows + U', description: 'Abrir el Centro de accesibilidad', category: 'accesibilidad' },
        { keys: 'Windows + Ctrl + O', description: 'Abrir el teclado en pantalla', category: 'accesibilidad' },
        { keys: 'Windows + +', description: 'Abrir la Lupa y acercar', category: 'accesibilidad' },
        { keys: 'Windows + -', description: 'Alejar con la Lupa', category: 'accesibilidad' },
        { keys: 'Windows + Esc', description: 'Salir de la Lupa', category: 'accesibilidad' },
        { keys: 'Ctrl + Alt + Flechas', description: 'Rotar la pantalla (depende del controlador gráfico)', category: 'accesibilidad' },
        { keys: 'Windows + S', description: 'Abrir la búsqueda', category: 'busqueda' },
        { keys: 'Windows + Q', description: 'Abrir la búsqueda de Cortana', category: 'busqueda' },
        { keys: 'Ctrl + F', description: 'Buscar en la página o documento actual', category: 'busqueda' },
        { keys: 'F3', description: 'Buscar en el Explorador de archivos', category: 'busqueda' },
        { keys: 'Windows + F', description: 'Buscar archivos (en versiones anteriores)', category: 'busqueda' },
        { keys: 'Alt + Enter', description: 'Ver propiedades del archivo seleccionado', category: 'busqueda' }
    ];
    
    function searchShortcuts() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            searchResults.innerHTML = '<p>Por favor, ingresa un término de búsqueda.</p>';
            return;
        }
        
        const results = shortcuts.filter(shortcut => 
            shortcut.keys.toLowerCase().includes(searchTerm) || 
            shortcut.description.toLowerCase().includes(searchTerm)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = `<p>No se encontraron atajos para "${searchTerm}".</p>`;
            return;
        }
        
        let html = '<h3>Resultados de búsqueda:</h3><div class="shortcut-grid">';
        
        results.forEach(shortcut => {
            html += `
                <div class="shortcut-card">
                    <div class="shortcut-keys">${shortcut.keys}</div>
                    <div class="shortcut-desc">${shortcut.description}</div>
                    <a href="#${shortcut.category}" class="category-link">Ver en ${shortcut.category}</a>
                </div>
            `;
        });
        
        html += '</div>';
        searchResults.innerHTML = html;
    }
    
    searchButton.addEventListener('click', searchShortcuts);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchShortcuts();
        }
    });
    
    // Smooth scrolling para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, null, targetId);
            }
        });
    });
});