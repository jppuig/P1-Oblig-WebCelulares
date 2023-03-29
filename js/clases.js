// Autores del código: Juan Pedro Puig - 128088, Nicolás Valsecchi - 192765

class Marca {
  constructor(nombre, comentarios) {
    this.nombre = nombre;
    this.comentarios = comentarios;
  }

  toString() {
    return `${this.nombre} (${this.comentarios})`;
  }
}

class Celular {
  constructor(marca, modelo, descripcion, precio, pantalla, memoria, sistOp) {
    this.marca = marca;
    this.modelo = modelo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.pantalla = pantalla;
    this.memoria = memoria;
    this.sistOp = sistOp;
  }

  toString() {
    return `${this.modelo} (Marca: ${this.marca.nombre}, Descripción: ${this.descripcion}, Precio: $${this.precio}, Memoria: ${this.memoria}, Pantalla: ${this.pantalla}, Sistema Operativo: ${this.sistOp})`;
  }
}

class Sistema {
  constructor() {
    this.listaMarcas = [];
    this.listaCelulares = [];
  }

  agregarMarca(obj) {
    this.listaMarcas.push(obj);
  }

  existeMarca(valor) {
    let marca = valor.toUpperCase();
    let existe = false;

    for (let elem of this.listaMarcas) {
      let nombres = elem.nombre.toUpperCase();
      if (nombres === marca) {
        existe = true;
      }
    }

    return existe;
  }

  agregarCelular(obj) {
    this.listaCelulares.push(obj);
  }

  existeModelo(valor) {
    let nombreModelo = valor.toUpperCase();
    let existe = false;

    for (let elem of this.listaCelulares) {
      let nombres = elem.modelo.toUpperCase();
      if (nombres === nombreModelo) {
        existe = true;
      }
    }

    return existe;
  }

  precioPromedio() {
    let suma = 0;
    let cuenta = 0;

    for (let elem of this.listaCelulares) {
      suma += elem.precio;
      cuenta++;
    }

    let promedio = Math.round(suma / cuenta);
    return promedio;
  }

  maxMarcasConCel() {
    let maxMarcas = [];
    let max = 0;

    for (let elem of this.listaMarcas) {
      let cuenta = 0
      for (let cel of this.listaCelulares) {
        if (elem == cel.marca) {
          cuenta++;
        }
      }

      if (cuenta > max) {
        max = cuenta;
        maxMarcas = [];
        maxMarcas.push(elem);
      } else {
        if (cuenta === max) {
          maxMarcas.push(elem);
        } 
      }
    }

    maxMarcas.sort(function (a,b) {
      return a.nombre.toUpperCase().localeCompare(b.nombre.toUpperCase());
    })

    return maxMarcas;
  }

  precioMasAlto() {
    let precio = 0;
    let cel = [];

    for (let elem of this.listaCelulares) {
      if (elem.precio > precio) {
        precio = elem.precio;
        cel = [elem];
      } else {
        if (elem.precio == precio) {
          cel.push(elem);
        }
      }
    }

    return cel
  }
}