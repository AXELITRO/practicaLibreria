CREATE DATABASE LibreriaLocal
USE LibreriaLocal

-- 1. CREACIÓN DE LA TABLA AUTORES (Debe ir primero)
CREATE TABLE Autores (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL
);

-- 2. CREACIÓN DE LA TABLA LIBROS
CREATE TABLE Libros (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(150) NOT NULL,
    AutorId INT NOT NULL,
    Imagen NVARCHAR(255) DEFAULT 'default.jpg', -- Nueva columna para la ruta de la imagen
    CONSTRAINT FK_Libros_Autores FOREIGN KEY (AutorId) REFERENCES Autores(Id) ON DELETE CASCADE
);
GO

-- =========================================================================
-- 3. INSERCIÓN DE 6 AUTORES DE PRUEBA
-- =========================================================================
INSERT INTO Autores (Nombre) VALUES 
('Gabriel García Márquez'),  -- Generará ID 1
('Miguel de Cervantes'),     -- Generará ID 2
('J.K. Rowling'),            -- Generará ID 3
('George Orwell'),           -- Generará ID 4
('Stephen King'),            -- Generará ID 5
('Dan Brown');               -- Generará ID 6
GO

-- =========================================================================
-- 4. INSERCIÓN DE 30 LIBROS CON SUS RESPECTIVAS IMÁGENES Y AUTORES
-- =========================================================================
INSERT INTO Libros (Titulo, AutorId, Imagen) VALUES
-- Libros de Gabriel García Márquez (AutorId: 1)
('Cien años de soledad', 1, 'cien-anos-soledad.jpg'),
('Crónica de una muerte anunciada', 1, 'cronica-muerte.jpg'),
('El amor en los tiempos del cólera', 1, 'amor-tiempos-colera.jpg'),
('El coronel no tiene quien le escriba', 1, 'coronel-no-tiene.jpg'),
('Memoria de mis putas tristes', 1, 'memorias-putas.jpg'),

-- Libros de Miguel de Cervantes (AutorId: 2)
('Don Quijote de la Mancha', 2, 'don-quijote.jpg'),
('Novelas ejemplares', 2, 'novelas-ejemplares.jpg'),
('La Galatea', 2, 'la-galatea'),
('Los trabajos de Persiles y Sigismunda', 2, 'persiles-sigismunda.jpg'),
('Viaje del Parnaso', 2, 'viaje-parnaso.jpg'),

-- Libros de J.K. Rowling (AutorId: 3)
('Harry Potter y la piedra filosofal', 3, 'hp-piedra-filosofal.jpg'),
('Harry Potter y la cámara secreta', 3, 'hp-camara-secreta.jpg'),
('Harry Potter y el prisionero de Azkaban', 3, 'hp-prisionero-azkaban.jpg'),
('Harry Potter y el cáliz de fuego', 3, 'hp-caliz-fuego.jpg'),
('Harry Potter y la Orden del Fénix', 3, 'hp-orden-fenix.jpg'),

-- Libros de George Orwell (AutorId: 4)
('1984', 4, '1984.jpg'),
('Rebelión en la granja', 4, 'rebelion-granja.jpg'),
('Homenaje a Cataluña', 4, 'homenaje-cataluna.jpg'),
('Sin blanca en París y Londres', 4, 'sin-blanca.jpg'),
('Los días de Birmania', 4, 'dias-birmania.jpg'),

-- Libros de Stephen King (AutorId: 5)
('El resplandor', 5, 'el-resplandor.jpg'),
('It (Eso)', 5, 'it-eso.jpg'),
('Misery', 5, 'misery.jpg'),
('Carrie', 5, 'carrie.jpg'),
('Cementerio de animales', 5, 'cementerio-animales.jpg'),

-- Libros de Dan Brown (AutorId: 6)
('El código Da Vinci', 6, 'codigo-da-vinci.jpg'),
('Ángeles y demonios', 6, 'angeles-demonios.jpg'),
('Inferno', 6, 'inferno.jpg'),
('El símbolo perdido', 6, 'simbolo-perdido.jpg'),
('Origen', 6, 'origen.jpg');
GO
SELECT * FROM Libros