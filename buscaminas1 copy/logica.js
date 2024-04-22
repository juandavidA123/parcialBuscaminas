/* RECORDAR: Siempre que se use "i" primero, sera realmente la altura, y "j" el ancho */

/* historial:
SE ARREGLÓ LO DE QUE CUANDO SE HAGA CLICK DERECHO EN UNA CASILLA, NO SE PUEDA HACER CLICK NORMAL EN ELLA 

Se logró hacer que se muestre el numero de minas que hay alrededor de una casilla al dar click. 22/04/24 00:51

SE LOGRO CAMBIAR LA IMAGEN DE LAS MINAS
*/

/* 
-hacer la cuadricula
-que el usuario ingrese las dimensiones
-según el numero de cuadros en total, se deben crear el 30% de las bombas
-no hacer lo de los numeros sino que aparezcan caritas felices
*/

let grid = document.querySelector(".grid");
let cuadroPerdio = document.getElementById("cuadroPerdiste");
let cuadroGano = document.getElementById("cuadroGanaste");

/* TERMINAR LO DE CUADRO GANÓ. CUANDO EL SE REVELEN TODOS LOS ESPACIOS SIN MINAS SE DEBE MOSTRAR EL CUADRO GANÓ */

let contenedorMain = document.getElementById("mainContenedor");
let numeroMinasRestantes = document.getElementById("valorMinasRestantes")
// let cuadraditos = document.get
const izquierdoHabilitado = []; //booleano para saber si el click izquierdo se puede usar en cada una de las casillas del tablero

let alto ;
let ancho ;

let dimensionesCuadraditos;

let factorTamanioMalla = 400;

document.addEventListener("DOMContentLoaded", function (){

    crearTablero();
    cambiarTamanioMalla();
    colorearCuadriculaReiniciada()
    mainContenedor.style.display = "none";
    cuadroPerdio.style.display = "none";
    cuadroGano.style.display = "none";

});

function cambiarAltoYAncho(){
    
    const newAlto = document.getElementById("campoAlto").value;
    const newAncho = document.getElementById("campoAncho").value;



    alto = newAlto;
    ancho = newAncho;

    console.log("El nuevo valor del alto es: " + alto);
    console.log("El nuevo valor del ancho es: " + ancho);

    if (ancho>=alto) {
        dimensionesCuadraditos = parseInt(factorTamanioMalla/ancho);
    }else{
        dimensionesCuadraditos = parseInt(factorTamanioMalla/alto);
    }
    
    if (newAlto != null && newAncho != null) {
        mainContenedor.style.display = "flex";
    }
    
    limpiarTodo();
    colorearCuadriculaReiniciada()
}

var perdio =  false;

var posicionClickeada = null;

function cambiarTamanioMalla(){
    const mallita = document.getElementById('malla');

    // mallita.style.backgroundColor = "rgb(89, 27, 117)";
    // mallita.style.background = "radial-gradient( rgb(141, 94, 168), rgb(89, 27, 117) )";

    /* con estos dos ciclos se pueden seleccionar cada uno de los cuadritos por su ID para modificar su
    altura y ancho según el valor de la variable dimensionesCuadraditos*/
    for (let i = 0; i < alto; i++) {
        for (let j = 0; j < ancho; j++) {
            const cuadritoIndividual = document.getElementById('cuadrado'+i+','+j);

            cuadritoIndividual.style.width = dimensionesCuadraditos + "px";
            cuadritoIndividual.style.height = dimensionesCuadraditos + "px";
        }
        
    }

    for (let i = 0; i < alto; i++) {
        for (let j = 0; j < ancho; j++) {
            const contenedorIndividual = document.getElementById('contenedorIndividual' + i+','+j);

            contenedorIndividual.style.width = dimensionesCuadraditos + "px";
            contenedorIndividual.style.height = dimensionesCuadraditos + "px";

        }
        
    }

    //con esto se puede cambiar el tamaño de la Malla o Grid desde el javascript solo modificando el ancho y alto:
    nuevaAltura = parseInt(alto * dimensionesCuadraditos) + "px"; 
    nuevoAncho = parseInt(ancho * dimensionesCuadraditos) + "px";
    mallita.style.width = nuevoAncho;
    mallita.style.height = nuevaAltura;
}

function limpiarTodo(){ 
    /*funcion para poder crear nuevas minas aleatorias aun cuando ya se ha clickeado en algun 
    boton (porque al crearse la carita feliz, se elimina el boton, por lo que al querer crear mas minas no se encuentra ningun boton en
    la casilla donde está la carita, por lo que esta función elimina todo y vuelve a crearlo)*/
    let counter = 0;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
        console.log("counter: "+counter);
        counter++;
    }

    perdio = false; //reestablece el valor del booleano "perdio" para que pueda comprobar nuevamente las minas nuevas
    
    //inicialmente se estable el valor de disponibilidad para usar el click izquierdo en todas las casillas como true. 
    for (let indice = 1; indice <= ancho*alto; indice++) {
        izquierdoHabilitado[indice] = true;
    }

    crearTablero();
    cambiarTamanioMalla();

    //se esconde el cuadro de perdió para que solo aparezca al perder
    cuadroPerdio.style.display = "none";
    cuadroGano.style.display = "none";
}

function crearTablero(){
    //crea un contador xd, por ahora no sirve pa na
    let counter = 0;

    /* en este FOR se crean cada uno de los cuadros de la malla añadiendole al lado del nombre las coordenadas, 
    para que se puedan manipular como si fuera una matriz: */
    for (let i = 0; i < alto; i++) {
        for(let j=0; j < ancho; j++){

            /* acá se crean los contenedores de cada cuadrado pequeño donde luego 
            se crearan los botones para clickear */
            let div = document.createElement("div");
            div.classList.add('contenedorIndividualCuadraditos');
            div.id = 'contenedorIndividual' + i+','+j; //le pone de ID a cada cuadro su propia coordenada en la matriz
            // div.textContent = i +","+j; //para mostrar el numero de cada casilla

            /* se añade el contenedro a  la mmalla */
            grid.appendChild(div);

            /* se crean los botones que van cada uno dentro de un contenedor individual */
            let botonsito = document.createElement("button");
            botonsito.classList.add('cuadraditos');
            botonsito.id = 'cuadrado' + i+','+j; //le pone de ID a cada cuadro su propia coordenada en la matriz

            //------------- PARA MOSTRAR LA POSICION DE CADA CASILLA DENTRO DE LA MISMA--------------

            // botonsito.textContent = i +","+j; //para mostrar el numero de cada casilla
            
            //---------------------------------------------------------------------------------------

            /* se selecciona cada contenedor por ID para añadirle el boton correspondiente */
            var contenedorIndividualActual = document.getElementById('contenedorIndividual' + i+','+j);
            contenedorIndividualActual.appendChild(botonsito);
            
            counter++;
        }
    }
}

function colorearCuadriculaReiniciada(){
    for (let x = 0; x < alto; x++) {
        for (let y = 0; y < ancho; y++) {
            document.getElementById('cuadrado'+x+','+y).style.backgroundColor = 'rgb(127, 108, 101)';
        }
    }
}

function colorearCuadrosMinas(){

    for (let x = 0; x < alto; x++) {
        for (let y = 0; y < ancho; y++) {
            document.getElementById('cuadrado'+x+','+y).style.backgroundColor = 'rgb(242, 236, 190)';
        }
    }

    arregloPosicionesMinas = colocarMinas();

    /* DONDE SE PINTAN LOS CUADROS DE LAS BOMBAS PARA TRABAJAR MÁS FACILMENTE EN EL PROYECTO. 
    SE COMENTA CUANDO SE VA A PROBAR DE VERDAD EL JUEGO*/
    for (let x = 0; x < arregloPosicionesMinas.length; x++) {
        document.getElementById('cuadrado'+ arregloPosicionesMinas[x].join(",")).style.backgroundColor = 'rgb(192, 130, 97)';
    }
}


function colocarMinas(){
    /* se define cuantas minas debe haber (30% del total de cuadros) */
    let cantidadMinas = parseInt((ancho*alto)*0.3);
    console.log("cantMinas: "+cantidadMinas);

    //el numero inicial de minas mostradas será el calculado
    numeroMinasRestantes.innerHTML = cantidadMinas;

    const matrizTablero = [];

    let arregloPosMinas = [];

    
    
    /* este booleano se crea para cuando se repita, reemplazarla por otra posición dentro del WHILE */
    let flagEstaRepetido = false;
    let contador = 0; // este es para contar cada que haya más de una posicion (cuando se repita)
    /* dentro de este ciclo se crean cada una de las posiciones */
    for (let index = 0; index < cantidadMinas; index++) {

        /* se eligen las coordenadas al azar */
        let I = Math.floor(Math.random() * alto);
        let J = Math.floor(Math.random() * ancho);

        arregloPosMinas[index] = [I , J];
        
        /* cada que se repita una posicion, se aumenta el contador, 
        porque luego si es mayor a 1, se cambiara la posicion creada por otra */
        for (let x = 0; x < arregloPosMinas.length; x++) {
            if (arregloPosMinas[index].join() == arregloPosMinas[x].join()) {
                contador++;
            }
        }
        
        /* si está repetido, luego entrará al while para crearse otra posicion no repetida, pero si no, entonces 
        seguirá normal a crear la siguiente posicion al azar */
        if(contador>1){
            flagEstaRepetido = true;
            console.log("fuera de while: "+arregloPosMinas[index]+" se repite");
        }else{
            flagEstaRepetido = false;
        }

        /* hace el mismo proceso de arriba pero lo repite hasta que flagEstaRepetido sea False, 
        para poder salirse del WHILE y seguir normal */
        while(flagEstaRepetido){
            I = Math.floor(Math.random() * alto);
            J = Math.floor(Math.random() * ancho);
            
            arregloPosMinas[index] = [I , J];
            
            for (let x = 0; x < arregloPosMinas.length; x++) {
                if (arregloPosMinas[index].join() == arregloPosMinas[x].join()) {
                    contador++;
                }
            }
            
            if(contador>1){
                flagEstaRepetido = true;
                console.log(arregloPosMinas[index]+" se repite");
            }else{
                flagEstaRepetido = false;
            }

            contador = 0;
        }

        //se reinicia el contador para que no acumule lo que contó de cada posicion en cada iteracion del for
        contador = 0;
    }

    for (let i = 0; i < alto; i++) {
        matrizTablero[i] = [];
        for (let j = 0; j < ancho; j++) {
            matrizTablero[i][j] = [i, j];
            console.log("matrizTablero: "+matrizTablero[i][j] +"\n");
            console.log("arrposminas:"+arregloPosMinas[i]);
        }
    }

    //------PARTE DONDE SE AGREGAN LOS EventListeners A LOS BOTONES--------
    
    const banderaFuePuesta = []; //un arreglo de booleanos para poner y quitar banderas

    let flagCliqueoPorPrimeraVez = false;
    
    for (let indice = 1; indice <= ancho*alto; indice++) {
        banderaFuePuesta[indice] = false;
    }

    for (let i = 0; i < alto; i++) {
        for(let j=0; j < ancho; j++){
            /* se selecciona cada contenedor por ID para añadirle el boton correspondiente */
            var contenedorIndividualActual = document.getElementById('contenedorIndividual' + i+','+j);
            
            //para click izquierdo (revelar cuadro)
            /* funciona, la cosa es recordar que cuando se usa la función como parámetro, no ponerla con los paréntesis ()*/
            contenedorIndividualActual.addEventListener("click", function(){

                /* hay variables que s repiten en el addEventListener del contextMenu pero no importa
                porque se declaran dentro de bloques aislados como lo son los eventListener (creo), 
                entonces no hay problema de cambiar variables sin querer */
                var botonActual = this.querySelector("button");
                let iteradoresConcuerdanConPosicion = false;
                var counter = 1;

                for (let i = 0; i < alto; i++) {
                    // console.log("iite: "+i);
                    for (let j = 0; j < ancho; j++) {
                        // console.log("jite" + j);
                        if ((i == botonActual.id.slice(8, 9)) && (j == botonActual.id.slice(10, 11))) {
                            // console.log("i->" + i + " es igual a " + botonActual.id.slice(8, 9));
                            // console.log("j->" + j + " es igual a " + botonActual.id.slice(10, 11));

                            iteradoresConcuerdanConPosicion = true;

                            break;
                        }
                        counter++;
                    }

                    if (iteradoresConcuerdanConPosicion == true) {
                        break;
                    }
                }

                iteradoresConcuerdanConPosicion = false;

                if (izquierdoHabilitado[counter] == true) {
                    // Código a ejecutar cuando se haga clic en el botón

                    // Selecciona el botón hijo del contenedor actual
                    
                    var botonActual = this.querySelector("button");
                    var contenedorIndividual = this;
                    
                    
                    /* este ciclo es para ver si alguna de las posiciones clickeadas tiene minas o no, para que el jugador pierda o no */
                    for (let index = 0; index < arregloPosMinas.length; index++) {

                        if (botonActual.id.slice(8) == arregloPosMinas[index].join()) {
                            /* si ese cuadro sí está minado, entonces "perdio" es true y ya no puede dar click izquierdo */
                            console.log("CONCUERDA: "+ botonActual.id.slice(8) +" Y "+ arregloPosMinas[index].join());
                            perdio = true;
                            izquierdoHabilitado[counter] = !izquierdoHabilitado[counter];
                        }else{
                            console.log("NO CONCUERDA");
                        }
                    }


                    if(perdio){ //si pierde, se muestran todas las minas (bombas xd) y se pinta el fondo de cada mina de rojo
                        for (let index = 0; index < arregloPosMinas.length; index++) {
                            
                            botonMinadoActual = document.getElementById("cuadrado"+arregloPosMinas[index].join())
                            // document.getElementById('cuadrado'+arregloPosMinas[index].join()).style.backgroundColor = 'rgb(226, 19, 0)';
                            document.getElementById('cuadrado'+arregloPosMinas[index].join()).style.backgroundImage = "url('mina marina rust.png')";
                            document.getElementById('cuadrado'+arregloPosMinas[index].join()).style.backgroundSize = 'cover';



                            let simboloMina = document.createElement("div");
                            simboloMina.classList.add('simbolosMinas');
                            simboloMina.id = 'mina' + arregloPosMinas[index].join(); //le pone de ID a cada cuadro su propia coordenada en la matriz
                            // simboloMina.textContent = '💣'; //para mostrar el numero de cada casilla
                            simboloMina.style.fontSize = (140/ancho)+"px";

                            botonMinadoActual.appendChild(simboloMina);

                            //cuando pierde, ahi si se muestra el anuncio de que perdió
                            cuadroPerdio.style.display = "flex";
                        }
                    }else{
                        /* sino se pierde al clickear (osea si no cliquea en una posicion donde hay una mina), simplemente elimina el
                        boton y revela la carita */

                        //----------------------SECCION ELEGIR QUÉ NUMERO PONER-------------------------------

                        //NOTA: METER ESTE PROCEDIMIENTO EN UNA FUNCION PARA QUE SEA MAS ORDENADO

                        console.log("pos: "+typeof parseInt(botonActual.id.slice(8)));
                        // colocarNumeros(arregloPosMinas, i, j);

                        let contadorMinasAlrededor = 0;

                        /* si contadorMinasAlrededor es mayor que este, entonces es porque no hubo un aumento de contador, 
                        y entonces no se encontraron minas en la posicion que se está evaluando, por lo que puede mostrarse
                        si sin problema de que llegue a mostrar una mina */
                        let contadorCambioEnContadorMinas = contadorMinasAlrededor; 

                        //arriba izquierda
                        let posArribaIzq  = (i-1)+ "," +(j-1);
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posArribaIzq);
                            if (posArribaIzq.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina upleft");
                            }
                        }


                        /* ME RINDO NO QUIERO HACERLO ASI PORQUE ES DEMASIADO EXTENSO. LO IDEAL SERIA COLOCAR LOS NUMEROS AL PRINCIPIO
                        CUANDO SE COLOCAN LAS MINAS E IRLOS REVELANDO, NO IRLOS CREANDO COMO SE ESTÁ HACIENDO AHORA PERO PUES YA QUÉ */

                        // if(contadorMinasAlrededor > contadorCambioEnContadorMinas || flagCliqueoPorPrimeraVez == true){
                        //     contadorCambioEnContadorMinas = contadorMinasAlrededor;
                        // }else if(contadorMinasAlrededor <= contadorCambioEnContadorMinas && flagCliqueoPorPrimeraVez == false){

                        //     var contenedorIndividualAdyacente = document.getElementById('contenedorIndividual' + posArribaIzq);
                        //     var botonABorrar = contenedorIndividualAdyacente.querySelector("button");

                        //     contenedorIndividualAdyacente.removeChild(botonABorrar);



                        //     let posicionLibre = document.createElement("div");
                        //     posicionLibre.classList.add('ContenedorIndividualCaritas');
                        //     posicionLibre.id = 'elementoNumero-' + posArribaIzq;




                        //     posicionLibre.textContent = "👻"; //👻

                        //     posicionLibre.style.fontSize = (140/ancho)+"px";
                        //     contenedorIndividualAdyacente.appendChild(posicionLibre);
                        // }
                        console.log("--");

                        //arriba
                        let posArriba  = (i-1)+ "," +j;
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posArriba);
                            if (posArriba.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina arriba");
                            }
                        }
                        console.log("--");

                        //arriba derecha
                        let posArribaDer  = (i-1)+ "," +(j+1);
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posArribaDer);
                            if (posArribaDer.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina upright");
                            }
                        }
                        console.log("--");

                        //izquierda
                        let posIzq  = i+ "," +(j-1);
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posIzq);
                            if (posIzq.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina izq");
                            }
                        }
                        console.log("--");

                        //derecha
                        let posDer  = i+ "," +(j+1);
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posDer);
                            if (posDer.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina der");
                            }
                        }
                        console.log("--");

                        //abajo izquierda
                        let posAbajoIzq  = (i+1)+ "," +(j-1);
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posAbajoIzq);
                            if (posAbajoIzq.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina downleft");
                            }
                        }
                        console.log("--");

                        //abajo
                        let posAbajo  = (i+1)+ "," +j;
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posAbajo);
                            if (posAbajo.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina abajo");
                            }
                        }
                        console.log("--");

                        //abajo derecha
                        let posAbajoDer  = (i+1)+ "," +(j+1);
                        for (let x = 0; x < arregloPosMinas.length; x++) {
                            
                            console.log("arrgloposminas: "+ arregloPosMinas[x].toString());
                            console.log(posAbajoDer);
                            if (posAbajoDer.toString() == arregloPosMinas[x].toString()) {
                                contadorMinasAlrededor++;
                                console.log("mina downright");
                            }
                        }
                        console.log("--");
                        
                        let numeroFinal = contadorMinasAlrededor;


                        contenedorIndividual.removeChild(botonActual);

                        let elementoNumero = document.createElement("div");
                        elementoNumero.classList.add('ContenedorIndividualCaritas');
                        elementoNumero.id = 'elementoNumero-' + contenedorIndividual.id;

                        elementoNumero.textContent = numeroFinal; //👻

                        elementoNumero.style.fontSize = (140/ancho)+"px";
                        contenedorIndividual.appendChild(elementoNumero);
                                    
                        contadorMinasAlrededor = 0;
                        numeroFinal = 0;
                        //------------------------------------------------------------------------------------


                        console.log("Eliminando boton de " + contenedorIndividual.id); //this.id.slice(20,23)
                        console.log("boton id: " + botonActual.id);
                        
                        // contenedorIndividual.removeChild(botonActual);

                        // let elementoReemplazante = document.createElement("div");
                        // elementoReemplazante.classList.add('ContenedorIndividualCaritas');
                        // elementoReemplazante.id = 'contenedorIndividual-' + contenedorIndividual.id;
                        // elementoReemplazante.textContent = '😃'; //👻
                        // elementoReemplazante.style.fontSize = (140/ancho)+"px";
                        // contenedorIndividual.appendChild(elementoReemplazante);
                    }
                    
                    
                }
                
            });

            /* contadorBanderas aumenta cada que se añade una bandera, para poder restarselo a la cantidad de minas que aparecen */
            let contadorBanderas = 0;

            //para click derecho (colocar y quitar bandera)
            contenedorIndividualActual.addEventListener("contextmenu", function(event) {

                // Previene el comportamiento predeterminado del menú contextual
                event.preventDefault();

                var botonActual = this.querySelector("button");

                // Código a ejecutar cuando se haga clic derecho en el botón
                console.log("Poniendo bandera en el boton de "+ this.id + " (AÚN NO SE HA IMPLEMENTADO)");
                console.log("boton id: " + botonActual.id.slice(8,11));


                /* para encontrar el numero de casilla como tal, no la posicion, porque la posicion
                ya está guardada en la ID, pero el numero de casilla no */
                /* lo que se hace es aumentar el contador cada que se van pasando por los iteradores, 
                y cuando concuerden con las coordenadas del botonActual, entonces el contador habrá 
                llegado al numero de casilla correcto y el booleano podrá ser True para salirse 
                del ciclo y usar el counter como el numero de casilla para manipular un arreglo que está
                mas adelante*/
                let iteradoresConcuerdanConPosicion = false;
                var counter = 1;

                for (let i = 0; i < alto; i++) {
                    // console.log("iite: "+i);
                    for (let j = 0; j < ancho; j++) {
                        // console.log("jite" + j);
                        if ((i == botonActual.id.slice(8, 9)) && (j == botonActual.id.slice(10, 11))) {
                            // console.log("i->" + i + " es igual a " + botonActual.id.slice(8, 9));
                            // console.log("j->" + j + " es igual a " + botonActual.id.slice(10, 11));

                            iteradoresConcuerdanConPosicion = true;

                            break;
                        }
                        counter++;
                    }

                    if (iteradoresConcuerdanConPosicion == true) {
                        break;
                    }
                }

                /* apenas llega al final de los ciclos, se reinicia el valor de la variable a False, para poder compararse 
                en otro boton */
                iteradoresConcuerdanConPosicion = false;

                /* si el booleano en la posicion "counter" es False, es porque esa posicion no tiene bandera, entonces se coloca una
                bandera, pero si es True, entonces se quita porque ya hay una bandera puesta*/
                if(banderaFuePuesta[counter] == false){

                    /* se cambia el valor de verdad del booleano en esa posicion (por eso es un arreglo, para cada posición)
                     para desactivar el click izquierdo mientras haya puesta una bandera*/
                    izquierdoHabilitado[counter] = false; 


                    /* se cambia el valor de que se puso una bandera en esa casilla a true */
                    banderaFuePuesta[counter] = true;

                    let elementoReemplazante = document.createElement("div");
                    elementoReemplazante.classList.add('ContenedorIndividualBanderas');
                    elementoReemplazante.id = 'contenedorIndividual-' + this.id;
                    elementoReemplazante.textContent = '🚩'; //👻
                    elementoReemplazante.style.fontSize = (140/ancho)+"px";
    

                    botonActual.appendChild(elementoReemplazante);

                }else if(banderaFuePuesta[counter] == true){

                    /* si la bandera ya está puesta y se llega a hacer click derecho, se hace el proceso inverso, 
                    habilitando el click y eliminado la bandera */

                    izquierdoHabilitado[counter] = !izquierdoHabilitado[counter];
                    
                    banderaFuePuesta[counter] = false;

                    botonActual.removeChild(botonActual.children[0]);


                    // contenedorIndividualActual.removeEventListener("click", desactivarClickIzquierdo);
                    /*esa funcion de desactivarClickIzquierdo no funciona de nada*/
                }
                
                /* este ciclo es para que cada que haya una bandera (osea que banderaFuePuesta[index] == true), entonces
                se aumente el contador de banderas */
                for (let index = 0; index < banderaFuePuesta.length; index++) {
                    if (banderaFuePuesta[index] == true) {
                        contadorBanderas++;
                    }
                }
                
                /* se le resta el contadorBanderas al total de minas para poner el numero restante de minas en el HTML */
                
                numeroMinasRestantes.innerHTML = (cantidadMinas - contadorBanderas);
                
                /* se reinicia el contador de banderas para que se esté actualizando el numero real cada que se haga click
                y no se acumule al estarse sumando dentro de los ciclos */
                contadorBanderas = 0; 

                // if(numeroMinasRestantes.innerHTML == 0)
            });

        }
    }
    //---------------------------------------------------------------------


    return arregloPosMinas;
}

// function colocarNumeros(arregloPosicionMinas, indexi, indexj){

// }
