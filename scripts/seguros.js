//Creamos una clase para nuestros seguros:
class Seguro {
    constructor(id, tipo, categoria, precio, imagen) {
        this.id = id;
        this.tipo = tipo;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1; 
    }
}

const personalMenor = new Seguro(1, "Personal", "Menor", 1000, "imagenes/menor.jpg");
const personalMayor = new Seguro(2, "Personal", "Mayor", 3000, "imagenes/mayor.jpg");
const autoRC = new Seguro(3, "Auto", "Responsabilidad Civil", 2000, "imagenes/autochico.jpg");
const autoTR = new Seguro(4, "Auto", "Todo Riesgo", 10000, "imagenes/autogrande.jpg");
const motoRC = new Seguro(5, "Moto", "Responsabilidad Civil", 450, "imagenes/motochica.jpg");
const motoTR = new Seguro(6, "Moto", "Todo Riesgo", 6000, "imagenes/motogrande.jpg");
const trailer = new Seguro(7, "Trailer", "Responsabilidad Civil", 1000, "imagenes/trailer.jpg");
const motorhome = new Seguro(8, "Motorhome", "Todo Riesgo", 20000, "imagenes/motorhome.png");

//Creamos un Array con todo nuestro catálogo de seguros: 
const seguros = [personalMenor, personalMayor, autoRC, autoTR, motoRC, motoTR, trailer, motorhome];

// Creamos un array para almacenar los seguros a contratar:
let cartilla = [];

/*** CARGAR DE LA CARTILLA DESDE EL LOCALSTORAGE: ***/
if(localStorage.getItem("cartilla")) {
    cartilla = JSON.parse(localStorage.getItem("cartilla"));
}

// Modificamos el DOM para mostrar los seguros disponibles para contratar y 
// creamos una función para mostrar los seguros:
const contenedorSeguros = document.getElementById("contenedorSeguros");
const mostrarSeguros = () => {
    seguros.forEach((seguro) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${seguro.imagen}" class="card-img-top imgProductos" alt="${seguro.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${seguro.tipo} </h5>
                <h6 class="card-title"> ${seguro.categoria} </h6>
                <p class="card-text"> $${seguro.precio} </p>
                <button class="btn colorBoton" id="boton${seguro.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorSeguros.appendChild(card);

        //Creamos un botón para agregar los seguros a la cartilla: 
        const boton = document.getElementById(`boton${seguro.id}`);
        boton.addEventListener("click", () => {agregarALaCartilla(seguro.id)})
    })
}
mostrarSeguros();

//Función para agregar los seguros a la cartilla:
const agregarALaCartilla = (id) => {
    const seguro = seguros.find((seguro) => seguro.id === id);
    const seguroEnCartilla = cartilla.find((seguro) => seguro.id === id);
    if(seguroEnCartilla){
        seguroEnCartilla.cantidad++;
    }else {
        cartilla.push(seguro);
        //Al final de la clase, guardamos en el localStorage. 
        //Trabajamos con el localStorage: 
        localStorage.setItem("cartilla",JSON.stringify(cartilla));
    }
    calcularTotal();
    mostrarCartilla();
}

// Modificamos el DOM para mostrar los seguros seleccionados para contratar
const contenedorCartilla = document.getElementById("contenedorCartilla");
const verCartilla = document.getElementById("verCartilla");
verCartilla.addEventListener("click", () => {mostrarCartilla();});

//Función para mostrar la Cartilla:
const mostrarCartilla = () => {
    contenedorCartilla.innerHTML="";
    cartilla.forEach((seguro) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${seguro.imagen}" class="card-img-top imgSeguro" alt="${seguro.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${seguro.tipo} </h5>
                <h6 class="card-title"> ${seguro.categoria} </h6>
                <p class="card-text"> $${seguro.precio} </p>
                <p class="card-text"> ${seguro.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${seguro.id}"> Eliminar Seguro </button>
                </div>
            </div>
        `
        contenedorCartilla.appendChild(card);
        //Eliminar seguros de la cartilla: 
        const boton = document.getElementById(`eliminar${seguro.id}`);
        boton.addEventListener("click", () => {eliminarDeLaCartilla(seguro.id);})
    })
    calcularTotal();
}


//Función que elimina el producto de la cartilla: 
const eliminarDeLaCartilla = (id) => {
    const seguro = cartilla.find((seguro) => seguro.id === id);
    const indice = cartilla.indexOf(seguro);
    if (seguro){
        seguro.cantidad--;
    }
    if(seguro.cantidad == 0){
        cartilla.splice(indice, 1);
    }
    mostrarCartilla();
    localStorage.setItem("cartilla", JSON.stringify(cartilla));
}

//Vaciamos toda la cartilla de compras: 
const vaciarCartilla = document.getElementById("vaciarCartilla");
vaciarCartilla.addEventListener("click", () => {eliminarTodaLaCartilla();})

//Función para eliminar toda la cartilla: 
const eliminarTodaLaCartilla = () => {
    cartilla = [];
    mostrarCartilla();
    localStorage.clear();
}

//Mostramos mensaje con el total de la compra 
const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0; 
    cartilla.forEach((seguro) => {totalCompra += seguro.precio * seguro.cantidad;})
    total.innerHTML = `$${totalCompra}`;
}

//Trabajando con JSON:
//FETCH:
//Por algún motivo no logra levantar el archivo datos.json, no he podido correr los ejemplos de clases
//pero dejo el prototipo de como haría la implementación de fetch para cargar los datos de los seguros.
/*
const listado = document.getElementById("listado");
const listadoSeguros = "json/datos.json"

fetch(listadoSeguros)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(seguro => {
            listado.innerHTML += `
                <h4>Nombre: ${seguro.nombre}</h4>
                <p>ID: ${seguro.id}</p>
                <p>Tipo: ${seguro.tipo}</p>
                <p>Categoria: ${seguro.categoria}</p>
                <p>Precio: ${seguro.precio}</p>
                <p>Imagen: ${seguro.imagen}</p>
                <p>Cantidad: ${seguro.cantidad}</p>
                <hr/>
            `
            listadoSeguros.appendChild(listado)
        })
    })
    .catch(error => console.log(error))
    .finally( () => console.log("Proceso Finalizado"))
*/