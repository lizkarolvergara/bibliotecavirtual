import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliotecaService } from './services/biblioteca.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Biblioteca Virtual';
  libros: any[] = [];
  autores: any[] = [];
  libroSeleccionado: any = {};
  autorSeleccionado: any = {};
  libroId: string | null = null;

  formularioLibro: FormGroup;
  formularioEditarLibro: FormGroup;
  formularioAutor: FormGroup;

  mostrarModal: boolean = false;
  tipoElemento: string = ''; // para libro o autor
  nombreElemento: string = ''; // nombre del libro o autor
  idElementoSeleccionado: string | null = null; // id del libro o autor
  indiceElementoSeleccionado: number | null = null; 

  //para validacion de datos
  mostrarModalAdvertencia: boolean = false; 
  mensajeAdvertencia: string = '';

  //modal de la edicion de libros
  mostrarModalEditarLibro: boolean = false;

  constructor(private bibliotecaService: BibliotecaService, private fb: FormBuilder) {
    this.formularioLibro = this.crearFormularioLibro();
    this.formularioEditarLibro = this.crearFormularioLibro();
    this.formularioAutor = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      nacionalidad: ['', [Validators.required]],
    });

    this.cargarLibros();
    this.cargarAutores();
  }

  // cargar datos
  cargarLibros() {
    this.bibliotecaService.listarLibros().subscribe((resp: any) => {
      this.libros = resp;
      console.log('Libros cargados:', this.libros);
    });
  }

  cargarAutores() {
    this.bibliotecaService.listarAutores().subscribe((resp: any) => {
      this.autores = resp;
      console.log('Autores cargados:', this.autores);
    });
  }

  // gestionar libros
  agregarLibro() {
    if (this.formularioLibro.invalid) {
      this.mostrarModalAdvertencia = true;
      this.mensajeAdvertencia = 'Por favor, rellena todos los campos e ingresa correctamente los datos. Para la URL del libro, debe comenzar con "https://" y finalizar en ".pdf"';
      this.formularioLibro.markAllAsTouched(); 
      return;
    }
  
    this.bibliotecaService.agregarLibro(this.formularioLibro.value).subscribe(() => {
      console.log('Libro agregado');
      this.cargarLibros();
      this.formularioLibro.reset();
    });
  }
  

  seleccionarLibro(id: string) {
    const libro = this.libros.find((l) => l.id === id);
    if (libro) {
      this.libroSeleccionado = libro;
      this.libroId = id;
      this.formularioEditarLibro.patchValue(libro);
      console.log('Libro seleccionado:', libro);
    }
  }

  editarLibro() {
    if (this.formularioEditarLibro.invalid || !this.libroId) {
      console.error('No se puede editar el libro. Verifica que se haya seleccionado un libro.');
      return;
    }
  
    const libroEditado = { ...this.formularioEditarLibro.value, id: this.libroId };
    this.bibliotecaService.editarLibro(libroEditado).subscribe(() => {
      console.log('Libro editado');
      this.cargarLibros(); 
      this.libroId = null; 
  
      // cerrar el modal no me sale
      const modalElement = document.getElementById('modalEditarLibro');
      if (modalElement) {
        modalElement.style.display = 'none'; 
        modalElement.classList.remove('show'); 
  

        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      }
  

      document.body.classList.remove('modal-open');
      document.body.style.overflow = ''; 
    });
  }
  
  
  

  eliminarLibro(id: string, index: number) {
    this.abrirModal('Libro', this.libros[index].titulo, id, index);
  }

  // gestionar autores

  agregarAutor() {
    if (this.formularioAutor.invalid) {
      this.mostrarModalAdvertencia = true;
      this.mensajeAdvertencia = 'Por favor, rellena todos los datos requeridos: ingresa el nombre y la nacionalidad del autor';
      this.formularioAutor.markAllAsTouched(); 
      return;
    }
  
    this.bibliotecaService.agregarAutor(this.formularioAutor.value).subscribe(() => {
      console.log('Autor agregado');
      this.cargarAutores();
      this.formularioAutor.reset();
    });
  }
  

  eliminarAutor(id: string, index: number) {
    this.abrirModal('Autor', this.autores[index].nombre, id, index);
  }

  // complementarios
  obtenerNombreAutor(id: string): string {
    const autor = this.autores.find((a) => a.id === id);
    return autor ? autor.nombre : 'Autor desconocido';
  }

  crearFormularioLibro(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      autorId: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaPublicacion: ['', [Validators.required]],
      pdfUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(pdf)$/)]],
    });
  }

  // modal de eliminacion
  abrirModal(tipo: string, nombre: string, id: string, indice: number) {
    this.tipoElemento = tipo;
    this.nombreElemento = nombre;
    this.idElementoSeleccionado = id;
    this.indiceElementoSeleccionado = indice;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.tipoElemento = '';
    this.nombreElemento = '';
    this.idElementoSeleccionado = null;
    this.indiceElementoSeleccionado = null;
  }

  confirmarEliminacion() {
    if (this.tipoElemento === 'Libro' && this.idElementoSeleccionado !== null && this.indiceElementoSeleccionado !== null) {
      this.libros.splice(this.indiceElementoSeleccionado, 1);
      this.bibliotecaService.eliminarLibro(this.idElementoSeleccionado).subscribe(() => {
        console.log('Libro eliminado');
      });
    } else if (this.tipoElemento === 'Autor' && this.idElementoSeleccionado !== null && this.indiceElementoSeleccionado !== null) {
      this.autores.splice(this.indiceElementoSeleccionado, 1);
      this.bibliotecaService.eliminarAutor(this.idElementoSeleccionado).subscribe(() => {
        console.log('Autor eliminado');
      });
    }
    this.cerrarModal();
  }


  //mostrar error y advertencia
  mostrarModalError(tipo: string, mensaje: string) {
    this.tipoElemento = tipo;
    this.nombreElemento = mensaje;
    this.mostrarModal = true;
  }

  cerrarModalAdvertencia() {
    this.mostrarModalAdvertencia = false;
    this.mensajeAdvertencia = '';
  }


  //modal de edición de libros
  abrirModalEdicion(libro: any): void {
    this.formularioEditarLibro.patchValue({
      titulo: libro.titulo,
      autorId: libro.autorId,
      descripcion: libro.descripcion,
      fechaPublicacion: libro.fechaPublicacion,
      pdfUrl: libro.pdfUrl,
    });
  
    this.libroId = libro.id;
  }

  
}

