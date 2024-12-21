# Biblioteca Virtual - CRUD en Angular

Este proyecto fue desarrollado como parte del curso de **Interfaces II** en la carrera de Desarrollo de Software en **IDAT**. La aplicación consiste en un CRUD (Crear, Leer, Actualizar y Eliminar) para la gestión de libros y autores de una biblioteca virtual. Está construido utilizando **Angular** y su enfoque principal es gestionar información de manera eficiente mediante formularios y validaciones.

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Requisitos Previos](#requisitos-previos)
5. [Instalación](#instalación)
6. [Uso](#uso)
7. [Capturas de Pantalla](#capturas-de-pantalla)
8. [Autor](#autor)

---

## Descripción General

El sistema de biblioteca virtual permite:

- Gestionar libros (crear, listar, editar y eliminar).
- Gestionar autores (crear y eliminar).
- Realizar validaciones de datos para evitar inconsistencias.

La interfaz incluye:

- Formularios dinámicos con validaciones.
- Listados interactivos con botones de acción (editar y eliminar).
- Modales para confirmaciones y advertencias.

---

## Características

- **Gestión de Libros:**
  - Agregar nuevos libros con datos como título, descripción, fecha de publicación, autor y enlace al archivo PDF.
  - Editar libros existentes.
  - Eliminar libros con confirmación previa.

- **Gestión de Autores:**
  - Agregar nuevos autores con nombre y nacionalidad.
  - Eliminar autores.

- **Validaciones de Formularios:**
  - Los campos obligatorios se verifican antes de procesar los datos.
  - La URL del PDF debe ser válida (debe iniciar con "https://" y terminar con ".pdf").

---

## Tecnologías Utilizadas

- **Angular:** Framework para construir la aplicación.
- **Bootstrap:** Diseño responsivo y estético.
- **TypeScript:** Lenguaje para escribir código más estructurado y robusto.
- **HTML/CSS:** Desarrollo de la interfaz de usuario.

---

## Requisitos Previos

- Node.js instalado en el sistema.
- Angular CLI instalado globalmente (`npm install -g @angular/cli`).

---

## Instalación

# Clona este repositorio:
git clone https://github.com/tu_usuario/biblioteca-virtual.git

# Accede al directorio del proyecto:
cd biblioteca-virtual

# Instala las dependencias:
npm install 

# Inicia el servidor de desarrollo:
ng serve

# Abre tu navegador y accede a:
http://localhost:4200


