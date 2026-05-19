// Asegúrate de cambiar esta URL por la que te dé IIS Express / Kestrel al ejecutar tu backend en .NET
const API_BASE_URL = 'http://localhost:5138/api'; 

document.addEventListener('DOMContentLoaded', () => {
    cargarBiblioteca();
});

async function cargarBiblioteca() {
    try {
        // 1. Llamamos a ambas APIs en paralelo para ahorrar tiempo de carga
        const [resAutores, resLibros] = await Promise.all([
            fetch(`${API_BASE_URL}/autores`),
            fetch(`${API_BASE_URL}/libros`)
        ]);

        // Validamos que las respuestas sean correctas
        if (!resAutores.ok || !resLibros.ok) {
            throw new Error('Error al conectarse con la API de .NET');
        }

        const autores = await resAutores.json();
        const libros = await resLibros.json();

        // 2. Creamos un mapa/diccionario de autores para buscar el nombre por ID de forma súper rápida
        // Resultado interno: { 1: "Gabriel García Márquez", 2: "Miguel de Cervantes", ... }
        const autoresMap = {};
        autores.forEach(autor => {
            autoresMap[autor.id] = autor.nombre;
        });

        // 3. Obtenemos el contenedor de tu HTML donde se renderizarán los libros
        const booksGrid = document.querySelector('.books-grid');
        
        // Limpiamos el contenedor por si acaso hay contenido estático viejo
        booksGrid.innerHTML = '';

        // 4. Iteramos sobre los libros obtenidos de la base de datos y generamos el HTML dinámico
        libros.forEach(libro => {
    const nombreAutor = autoresMap[libro.autorId] || 'Autor Desconocido';

    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('data-id', libro.id);
    card.setAttribute('data-autor-id', libro.autorId);

    // Modificamos el innerHTML para usar la propiedad libro.imagen
    card.innerHTML = `
        <div class="book-cover">
            <img src="/Images/${libro.imagen}" alt="${libro.titulo}" class="cover-img" onerror="this.src='../Images/default.jpg'">
        </div>
        <div class="book-info">
            <h3 class="book-title">${libro.titulo}</h3>
            <p class="book-author"><i class="fas fa-user"></i> ${nombreAutor}</p>
            <button class="btn-ver" onclick="verDetalles(${libro.id})">
                <i class="fas fa-eye"></i> Ver Detalles
            </button>
        </div>
    `;

    booksGrid.appendChild(card);
});

    } catch (error) {
        console.error('Hubo un problema al cargar los datos:', error);
        // Mostramos un mensaje elegante al usuario en la interfaz si la API está caída
        const booksGrid = document.querySelector('.books-grid');
        if(booksGrid) {
            booksGrid.innerHTML = `<p class="error-msg">No se pudo cargar el catálogo en este momento. Inténtalo más tarde.</p>`;
        }
    }
}

// Función de ejemplo para cuando hagan clic en el botón de la tarjeta
function verDetalles(libroId) {
    alert(`Has seleccionado el libro con ID: ${libroId}. Aquí podrías hacer otra petición a la API.`);
}