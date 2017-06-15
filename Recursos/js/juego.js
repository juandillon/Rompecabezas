// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};
var movimientos=0;

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
var cont=0, cont2=0, i, e;
  for( i=0;i<3;i++){
    for( e=0;e<3;e++){
      cont++;
    if(grilla[i][e]==cont){
      cont2++;
    }

    }
  }
  if(cont2==9){
    return true;
  }
  else{
    return;
  }
}
// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("Ganaste!");
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
var numeroViejo=grilla[fila1][columna1];
var numeroNuevo=grilla[fila2][columna2];
grilla[fila1][columna1]=numeroNuevo;
grilla[fila2][columna2]=numeroViejo;
var pieza1 = document.getElementById(numeroViejo);
console.log(pieza1);
var pieza2 = document.getElementById(numeroNuevo);
console.log(pieza2);
var padre = pieza1.parentNode;
var clon1 = pieza1.cloneNode(true);
var clon2 = pieza2.cloneNode(true);
padre.replaceChild(clon1, pieza2);
padre.replaceChild(clon2, pieza1);
}

// Actualiza la posición de la pieza vacía
function actualizarposicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila=nuevaFila;
  posicionVacia.columna=nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if(fila>=0 && fila<=2){
    if(columna>=0 && columna<=2){
      return true;
    }
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    // Completar
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
    nuevaFilaPiezaVacia = posicionVacia.fila;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    // Completar
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
    nuevaFilaPiezaVacia = posicionVacia.fila;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarposicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    movimientos+=1;
    document.getElementById('contador2').innerText="Movimientos realizados: " + movimientos.toString();

  }
}

// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
  movimientos=0;
  document.getElementById('contador2').innerText="Comienza el juego!";

}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);
    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })

}

function iniciar(){
    setTimeout(function(){
      mezclarPiezas(40);
      capturarTeclas();
    },1000);

}
setTimeout(function(){
iniciar();
},1000);
