const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

//variable para agregar los acticulos al carrito
let articulosCarrito = [];

//Llamando a la funcion
cargarEventListeners();

function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo

        limpiarHTML(); //Eliminams todo el HTML
    })
}

//Funciones
function agregarCurso(e) {

    //Con esto evitamos la accion por default y que los enlaces redireccionen a la pantalla 
    //principal
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        
        //variable que selecciona todo el contenido de card del curso
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // console.log(e.target);
        //se envia el parametro a la funcion
        leerDatosCurso(cursoSeleccionado);
    }

}

//Elimina un curso del carrito
function eliminarCurso(e) {
    
    if (e.target.classList.contains('borrar-curso')) {
        //Obtenemos el Id del curso a eliminar
        const cursoId = e.target.getAttribute('data-id');

        //Elimina el arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        //Llama a la funcion para recorrer de nuevo el objeto
        carritoHTML();
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){

    //objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    console.log(infoCurso);
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if (existe) {
        //Actualizamos la cantidad    
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son los dupliacados
            }
        });
    } else {
        //Agregamos elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
 
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
    
    //Limpiar el HTML previo en el carrito
    limpiarHTML();


    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        //Destructurando el objeto
        const {imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';

    //Valida si hay un hijo en el objeto
    while (contenedorCarrito.firstChild) {
        //Remueve un hijo (Este va a ser el que se encuentra en la posicion 1)
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

