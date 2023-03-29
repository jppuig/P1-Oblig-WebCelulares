// Autores del código: Juan Pedro Puig - 281088, Nicolás Valsecchi - 192765

var sistema = new Sistema();
var marcas = sistema.listaMarcas;
var celulares = sistema.listaCelulares;

var columnaModelos = [];

window.addEventListener('load', inicio);

function inicio() {
  document.getElementById('registrar-marca').addEventListener('click', marcaNueva);
  document.getElementById('registrar-celular').addEventListener('click', celularNuevo);
  document.getElementById('agregar-tabla').addEventListener('click', agregarTabla);
  document.getElementById('vaciar-tabla').addEventListener('click', vaciarTabla);
  document.getElementById('boton-google').addEventListener('click', buscarEnGoogle);
  
  baseTabla();
  resumen();  
}

// Sección Marcas
function marcaNueva() {
  let form = document.getElementById('form-marca');

  if (form.reportValidity()) {
    let nombreMarca = document.getElementById('marca').value;
    let comentarios = document.getElementById('comentarios').value;

    if (!sistema.existeMarca(nombreMarca)) {
      sistema.agregarMarca(new Marca(nombreMarca, comentarios));
      
      form.reset();
      cargarMarca();

    } else {
      alert('La marca ya existe.');
    }
  }
}

function cargarMarca() {
  let select = document.getElementById('marca-select');
  select.innerHTML = '';

  for (let elem of marcas) {
    let option = document.createElement('option');
    let nodoMarca = document.createTextNode(elem.nombre);

    option.appendChild(nodoMarca);
    select.appendChild(option);
  }
}

// Sección Celulares
function celularNuevo() {
  let form = document.getElementById('form-celular');

  if (form.reportValidity()) {
    let select = document.getElementById('marca-select');
    let marcaElegida = select.options[select.selectedIndex].text;

    let modelo = document.getElementById('modelo').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = parseInt(document.getElementById('precio').value);
    let pantalla = document.getElementById('pantalla').value;
    let memoria = document.getElementById('memoria').value;
    let sistOp = document.getElementById('so').value;

    let objMarca = '';
    for (let elem of marcas) {
      if (elem.nombre === marcaElegida) {
        objMarca = elem;
      }
    }

    if (!sistema.existeModelo(modelo)) {
      sistema.agregarCelular(new Celular(objMarca, modelo, descripcion, precio, pantalla, memoria, sistOp));
      
      form.reset();
      cargarCompararCon();
      resumen();

    } else {
      alert('El modelo ya existe.');
    }
  }
}

// Sección Comparación
function cargarCompararCon() {
  let select = document.getElementById('select-modelo');
  select.innerHTML = '';

  for (let elem of celulares) {
    let option = document.createElement('option');
    let nodoModelo = document.createTextNode(elem.modelo);

    option.appendChild(nodoModelo);
    select.appendChild(option);
  }
}
// Tabla de comparación
function agregarTabla() {
  let select = document.getElementById('select-modelo');

  if (select.options.length > 0) {
    let modeloElegido = select.options[select.selectedIndex].text;

    if (modeloElegido && !columnaModelos.includes(modeloElegido) && columnaModelos.length <= 3) {
      columnaModelos.push(modeloElegido);

      let objCelular = '';
      for (let elem of celulares) {
        if (elem.modelo == modeloElegido) {
          objCelular = elem;
        }
      }

      insertarCeldas(objCelular);
    }
  }
}

function baseTabla() {
  let tabla = document.getElementById('tabla-comparar');

  let fila1 = tabla.insertRow();
  fila1.id = 'fila-modelo';
  let celda1 = fila1.insertCell();
  celda1.innerHTML = 'Modelo';

  let fila2 = tabla.insertRow();
  fila2.id = 'fila-descripcion';
  let celda2 = fila2.insertCell();
  celda2.innerHTML = 'Descripción';

  let fila3 = tabla.insertRow();
  fila3.id = 'fila-marca';
  let celda3 = fila3.insertCell();
  celda3.innerHTML = 'Marca';

  let fila4 = tabla.insertRow();
  fila4.id = 'fila-memoria';
  let celda4 = fila4.insertCell();
  celda4.innerHTML = 'Memoria';

  let fila5 = tabla.insertRow();
  fila5.id = 'fila-pantalla';
  let celda5 = fila5.insertCell();
  celda5.innerHTML = 'Pantalla';

  let fila6 = tabla.insertRow();
  fila6.id = 'fila-precio';
  let celda6 = fila6.insertCell();
  celda6.innerHTML = 'Precio';

  let fila7 = tabla.insertRow();
  fila7.id = 'fila-so';
  let celda7 = fila7.insertCell();
  celda7.innerHTML = 'Sistema Operativo';
}

function insertarCeldas(obj) {
  let filaModelo = document.getElementById('fila-modelo');
  let celdaModelo = filaModelo.insertCell();
  celdaModelo.innerHTML = obj.modelo;

  let filaDesc = document.getElementById('fila-descripcion');
  let celdaDesc = filaDesc.insertCell();
  celdaDesc.innerHTML = obj.descripcion;

  let filaMarca = document.getElementById('fila-marca');
  let celdaMarca = filaMarca.insertCell();
  celdaMarca.innerHTML = obj.marca.nombre;

  let filaMemoria = document.getElementById('fila-memoria');
  let celdaMemoria = filaMemoria.insertCell();
  celdaMemoria.innerHTML = obj.memoria;

  let filaPantalla = document.getElementById('fila-pantalla');
  let celdaPantalla = filaPantalla.insertCell();
  celdaPantalla.innerHTML = obj.pantalla;

  let filaPrecio = document.getElementById('fila-precio');
  let celdaPrecio = filaPrecio.insertCell();
  celdaPrecio.innerHTML = obj.precio;

  let filaSistOp = document.getElementById('fila-so');
  let celdaSistOp = filaSistOp.insertCell();
  celdaSistOp.innerHTML = obj.sistOp;
}

function vaciarTabla() {
  let tabla = document.getElementById('tabla-comparar');
  tabla.innerHTML = '';

  columnaModelos = [];
  baseTabla();
}

// Sección Resumen
function resumen() {
  celularesRegistrados();
  precioPromedioCelular();
  marcasConMasCelulares();
  celularMasCaro();
}

function celularesRegistrados() {
  let parrafo = document.getElementById('celulares-registrados');
  parrafo.innerHTML = '';

  let frase = 'Cantidad de celulares registrados: ';

  if (celulares.length === 0) {
    frase += 'SIN DATOS';
  } else {
    frase += celulares.length;
  }

  let texto = document.createTextNode(frase);
  parrafo.appendChild(texto);
}

function precioPromedioCelular() {
  let parrafo = document.getElementById('promedio');
  parrafo.innerHTML = '';

  let frase = 'Precio promedio por celular: ';
  let promedio = sistema.precioPromedio();

  if (celulares.length === 0) {
    frase += 'SIN DATOS';
  } else {
    frase += promedio;
  }

  let texto = document.createTextNode(frase);
  parrafo.appendChild(texto);
}

function marcasConMasCelulares() {
  let lista = document.getElementById('lista-max');
  lista.innerHTML = '';
  let maxMarcas = sistema.maxMarcasConCel();

  if (maxMarcas == 0) {
    let item = document.createElement('li');
    let texto = document.createTextNode('SIN DATOS');
    item.appendChild(texto);
    lista.appendChild(item);
  } else {
    for (let elem of maxMarcas) {
      let item = document.createElement('li');
      let texto = document.createTextNode(elem.toString());
      item.appendChild(texto);
      lista.appendChild(item);  
    }
  }
}

function celularMasCaro() {
  let parrafo = document.getElementById('mas-caro');
  parrafo.innerHTML = '';

  let frase = 'El celular más caro es: ';
  let masCaros = sistema.precioMasAlto();

  if (masCaros.length === 0) {
    frase += 'SIN DATOS';
  } else {
    let index = Math.floor(Math.random() * masCaros.length);
    frase += masCaros[index].toString();
  }

  let texto = document.createTextNode(frase);
  parrafo.appendChild(texto);
}


// Sección Recomendaciones
function buscarEnGoogle(){
  let ingresado = document.getElementById("texto-google").value;
  let url = "http://www.google.com/search?q=" + ingresado;

  if (ingresado !== "") {
    window.open(url,'_blank');
  };
  
  document.getElementById("texto-google").value = "";
}