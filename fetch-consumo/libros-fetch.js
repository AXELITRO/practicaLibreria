const API_BASE_URL = 'http://localhost:5138/api'; 

// Variables globales para almacenar los datos en memoria local
let listaLibros = [];
let autoresMap = {};

document.addEventListener('DOMContentLoaded', () => {
    cargarBiblioteca();
    configurarBuscador();
});

async function cargarBiblioteca() {
    try {
        const [resAutores, resLibros] = await Promise.all([
            fetch(`${API_BASE_URL}/autores`),
            fetch(`${API_BASE_URL}/libros`)
        ]);

        if (!resAutores.ok || !resLibros.ok) {
            throw new Error('Error al conectarse con la API de .NET');
        }

        const autores = await resAutores.json();
        // Guardamos los libros en nuestra variable global
        listaLibros = await resLibros.json();

        // Mapeamos los autores en la variable global
        autores.forEach(autor => {
            autoresMap[autor.id] = autor.nombre;
        });

        // Renderizamos todos los libros por primera vez
        renderizarLibros(listaLibros);

    } catch (error) {
        console.error('Hubo un problema al cargar los datos:', error);
        const booksGrid = document.querySelector('.books-grid');
        if(booksGrid) {
            booksGrid.innerHTML = `<p class="error-msg">No se pudo cargar el catálogo.</p>`;
        }
    }
}

// FUNCIÓN ENCARGADA DE PINTAR LAS TARJETAS EN EL HTML
function renderizarLibros(librosParaMostrar) {
    const booksGrid = document.querySelector('.books-grid');
    booksGrid.innerHTML = ''; // Limpiamos el contenedor

    if (librosParaMostrar.length === 0) {
        booksGrid.innerHTML = `<p class="no-results">No se encontraron libros que coincidan con tu búsqueda.</p>`;
        return;
    }

    librosParaMostrar.forEach(libro => {
        const nombreAutor = autoresMap[libro.autorId] || 'Autor Desconocido';

        const card = document.createElement('div');
        card.classList.add('book-card');
        card.setAttribute('data-id', libro.id);
        card.setAttribute('data-autor-id', libro.autorId);

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
}

// CONFIGURACIÓN DEL FILTRO EN TIEMPO REAL
function configurarBuscador() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Escuchamos el envío del formulario
    searchForm.addEventListener('submit', (e) => {
        // MUY IMPORTANTE: Evita que la página se recargue y se borren los libros
        e.preventDefault(); 

        // Capturamos el texto justo en el momento del clic/enter
        const textoBusqueda = searchInput.value.toLowerCase().trim();

        // Ejecutamos el filtro sobre el array global de libros
        const librosFiltrados = listaLibros.filter(libro => {
            const titulo = libro.titulo.toLowerCase();
            const nombreAutor = (autoresMap[libro.autorId] || '').toLowerCase();

            // Retorna verdadero si coincide con el título o el autor
            return titulo.includes(textoBusqueda) || nombreAutor.includes(textoBusqueda);
        });

        // Volvemos a pintar las tarjetas con el resultado final
        renderizarLibros(librosFiltrados);
    });
}

function verDetalles(libroId) {
    alert(`Has seleccionado el libro con ID: ${libroId}.`);
}