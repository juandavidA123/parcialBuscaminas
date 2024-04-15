/* 
-hacer la cuadricula
-que el usuario ingrese las dimensiones
-según el numero de cuadros en total, se deben crear el 30% de las bombas
-no hacer lo de los numeros sino que aparezcan caritas felices
 */

let grid = document.querySelector(".grid");

let ancho = 7;
let alto = 7;

let dimensionesCuadraditos;
if (ancho>=alto) {
    dimensionesCuadraditos = parseInt(370/ancho);
}else{
    dimensionesCuadraditos = parseInt(370/alto);
}

/*FALTA USAR ESTA PARA QUE DETECTE CUANDO DIO CLICK EN UNA MINA, PARA QUE MUESTRE TODAS LAS DEMAS*/
var perdio =  false;

var posicionClickeada = null; 

document.addEventListener("DOMContentLoaded", function (){
    
    crearTablero();
    cambiarTamanioMalla();
    detectarClickBoton();
    
});

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


            /* ARREGLAR LO DE CAMBIAR EL TAMAÑO DEL CONTENEDRO DEL EMOJI si es posible, sino pues dejarlo asi */

            // let elementoReemplaz = document.createElement("div");
            //     elementoReemplaz.classList.add('ContenedorIndividualCuadraditos');
            //     elementoReemplaz.id = 'contenedorIndividual-' + this.id;
            //     elementoReemplaz.textContent = '😃'; //👻
            //     elementoReemplaz.style.fontSize = "20px";
        }
        
    }




    //con esto se puede cambiar el tamaño de la Malla o Grid desde el javascript solo modificando el ancho y alto:
    nuevaAltura = parseInt(alto * dimensionesCuadraditos) + "px"; 
    nuevoAncho = parseInt(ancho * dimensionesCuadraditos) + "px";
    mallita.style.width = nuevaAltura;
    mallita.style.height = nuevoAncho;
}

function crearTablero2(){

    let counter = 0;

    /* en este FOR se crean cada uno de los cuadros de la malla añadiendole al lado del nombre las coordenadas, 
    para que se puedan manipular como si fuera una matriz: */
    for (let i = 0; i < ancho; i++) {
        for(let j=0; j < alto; j++){

            let div = document.createElement("div");
            div.classList.add('cuadraditos');
            div.id = 'cuadrado' + i+','+j; //le pone de ID a cada cuadro su propia coordenada en la matriz
            div.textContent = i +","+j; //para mostrar el numero de cada casilla

            // console.log('huh: '+ counter);

            grid.appendChild(div);

            counter++;
        }
    }
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

    crearTablero();
    cambiarTamanioMalla();
    detectarClickBoton();
}

function detectarClickBoton(){
    
    for (let i = 0; i < ancho; i++) {
        for(let j=0; j < alto; j++){
            /* se selecciona cada contenedor por ID para añadirle el boton correspondiente */
            var contenedorIndividualActual = document.getElementById('contenedorIndividual' + i+','+j);
            

            /* se selecciona el contenedor actual de cada boton para que se pueda registrar el click izquierdo y derecho */
            // botonActual = document.getElementById('cuadrado' + i+','+j);

            contenedorIndividualActual.addEventListener("click", function() {
                // Código a ejecutar cuando se haga clic en el botón

                // Selecciona el botón hijo del contenedor actual
                var botonActual = this.querySelector("button");
               
                console.log("Eliminando boton de "+ this.id); //this.id.slice(20,23)
                console.log("boton id: " + botonActual.id);
                this.removeChild(botonActual);

                posicionClickeada = this.id;
                
                let elementoReemplazante = document.createElement("div");
                elementoReemplazante.classList.add('ContenedorIndividualCuadraditos');
                elementoReemplazante.id = 'contenedorIndividual-' + this.id;
                elementoReemplazante.textContent = '😃'; //👻
                elementoReemplazante.style.fontSize = "20px";
                

                this.appendChild(elementoReemplazante);
            });

            contenedorIndividualActual.addEventListener("contextmenu", function(event) {
                // Previene el comportamiento predeterminado del menú contextual
                event.preventDefault();
                
                var botonActual = this.querySelector("button");

                // Código a ejecutar cuando se haga clic derecho en el botón
                console.log("Eliminando boton de "+ this.id);
                console.log("boton id: " + botonActual.id);
                

            });
        }
    }



    return posicionClickeada;
}

function crearTablero(){
    //crea un contador xd, por ahora no sirve pa na
    let counter = 0;

    /* en este FOR se crean cada uno de los cuadros de la malla añadiendole al lado del nombre las coordenadas, 
    para que se puedan manipular como si fuera una matriz: */
    for (let i = 0; i < ancho; i++) {
        for(let j=0; j < alto; j++){

            /* acá se crean los contenedores de cada cuadrado pequeño donde luego 
            se crearan los botones para clickear */
            let div = document.createElement("div");
            div.classList.add('ContenedorIndividualCuadraditos');
            div.id = 'contenedorIndividual' + i+','+j; //le pone de ID a cada cuadro su propia coordenada en la matriz
            // div.textContent = i +","+j; //para mostrar el numero de cada casilla

            /* se añade el contenedro a  la mmalla */
            grid.appendChild(div);

            /* se crean los botones que van cada uno dentro de un contenedor individual */
            let botonsito = document.createElement("button");
            botonsito.classList.add('cuadraditos');
            botonsito.id = 'cuadrado' + i+','+j; //le pone de ID a cada cuadro su propia coordenada en la matriz
            // botonsito.textContent = i +","+j; //para mostrar el numero de cada casilla



            
            /* se selecciona cada contenedor por ID para añadirle el boton correspondiente */
            var contenedorIndividualActual = document.getElementById('contenedorIndividual' + i+','+j);
            contenedorIndividualActual.appendChild(botonsito);
            
            counter++;
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
    for (let x = 0; x < arregloPosicionesMinas.length; x++) {
        document.getElementById('cuadrado'+ arregloPosicionesMinas[x].join(",")).style.backgroundColor = 'rgb(192, 130, 97)';
    }
}

function colocarMinas(){
    /* se define cuantas minas debe haber (30% del total de cuadros) */
    let cantidadMinas = parseInt((ancho*alto)*0.3);
    console.log("cantMinas: "+cantidadMinas);


    const matrizTablero = [];

    let arregloPosMinas = [];

    for (let i = 0; i < alto; i++) {
        matrizTablero[i] = [];
        for (let j = 0; j < ancho; j++) {
            matrizTablero[i][j] = [i, j];
        }
        
    }

    let contador = 0; // este es para contar cada que haya más de una posicion (cuando se repita)

    /* este booleano se crea para cuando se repita, reemplazarla por otra posición dentro del WHILE */
    let flagEstaRepetido = false;

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



    return arregloPosMinas;
}