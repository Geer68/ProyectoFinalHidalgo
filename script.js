//Tareas
//  1. Asociar limpiar a Nueva division                 SOLUCIONADO
//  1. Eliminar participante con boton interactivo?
//  1. Generar emision de resultado                     SOLUCIONADO
//  1. Restriccion de no integrante                     SOLUCIONADO
//  1. Dark mode
//  2. Estilizar listado                                SOLUCIONADO 
//  1. Revisar aplicado de Propina
//  1. Eliminar participante bt find()
//  1. Actualizar monto/nombre, nuevo boton/modal?      TRABAJANDO FALTA JS
//  2. Eliminar variables globales incesarias
//  1. Actualización infinita de precio con tips        SOLUCIONADO
//  1. Almacenar datos en setLocal
//  3. Restaurante y Grupales, sin un precio fijo
//  4. Generar texto para compartir
//  1. Incluir operadores ternarios                     TRABAJANDO
//  4. Realizar grafico
//  1. Visualizacion de precio a pagar sin precio       SOLUCIONADO
//  2. Ver de ocultar calcular y obligar a nueva cuenta

//Comentar Ctrl + K, Ctrl + C

//Variables
let price = document.getElementById("price")
// document.getElementById("price").defaultValue = 0
let results = document.getElementById("participantList")
document.getElementById("tips").defaultValue = 0
let deben = document.getElementById("deben")
let name_monto = document.getElementById("name_monto")
let new_monto = document.getElementById("new_monto")
let old_name = document.getElementById("old_name")
let new_name = document.getElementById("new_name")

//Eliminar
let deudaResult = []
let participants = []
let cobrarResult = []


//????????
let input = 0
let timesEdit = 0


//Propinas
function tips() {
    let tipsPercentage = document.getElementById("tips")
    if (tipsPercentage.value !== 0) {
        console.log(`Con propina`)
        //Se puede mejorar funcion flecha ???
        price.value = +price.value + +(price.value * (tipsPercentage.value / 100))
        //Cuando calcule
        // document.getElementById('price').disabled = true
        // document.getElementById('tips').disabled = true
        console.log(price.value)
        console.log(participants)
    }
    console.log(participants)
}

class Participante {
    constructor(id, nombre, monto) {
        this.id = id,
            this.nombre = nombre,
            this.monto = monto,
            this.debe = 0
    }
    mostrarInfoEstado() {
        console.log(`${this.nombre} puso ${this.monto}`)
    }
}

function agregarParticipante() {
    let nombreInput = document.getElementById("name")
    let montoInput = document.getElementById("monto")
    if (nombreInput.value == ''){
        alert(`Ingrese nombre`)
    } else if (montoInput.value == '') {
        alert(`Ingrese Monto`)
    } else {
        const participanteNuevo = new Participante(participants.length + 1, nombreInput.value, montoInput.value)
        console.log(participanteNuevo)
        participants.push(participanteNuevo)
        console.log(participants)
        nombreInput.value = '', montoInput.value = ''
    }
    showParticipants(participants)
}

//Limpiar
function clearEverything() {
    participants = []
    showParticipants(participants)
    results.innerHTML = `<div class="participantsDescription">
                            <h3>Num</h3>
                            <h3>Nombre</h3>
                            <h3>Monto</h3>
                        </div>`
    deben.innerHTML = ""
    //Limpiar tips y precio
}


//Dividir
function divide() {
    let dividedPrice = price.value / (participants.length)
    console.log(dividedPrice)
    console.log(participants)
    deber(dividedPrice)
}

function deber(dividedPrice) {
    if ((timesEdit = 1)) {
        cobrarResult = []
        deudaResult = []
    }
    for (const participanteNuevo of participants) {
        participanteNuevo.debe = dividedPrice - participanteNuevo.monto
        //NO DEBE NADA
        if (participanteNuevo.debe < 0) {
            cobrarResult.push(`${participanteNuevo.nombre}`)
        } else {
            deudaResult.push(` ${participanteNuevo.nombre} debe ${participanteNuevo.debe}`)
        }
    }
    console.log(cobrarResult)
    console.log(deudaResult)
    showResult(dividedPrice)
}

function insufficientMoney () {
    let money = 0
    for (let p of participants) {
        money += p.monto
    }
    (money != price) ? alert("falta plata") : alert("no falta plata")
}



//Mostrar
function showParticipants(participants) {
    results.innerHTML = `<div class="participantsDescription">
                            <h3>Num</h3>
                            <h3>Nombre</h3>
                            <h3>Monto</h3>
                        </div>`
    for (let p of participants) {
        let nuevoParticipant = document.createElement("div")
        nuevoParticipant.innerHTML = `
        <div class="participantsDescription" id="${p.id}">
            <h3>${p.id}</h3>
            <h3>${p.nombre}</h3>
            <h3>${p.monto}</h3>
        </div>`
        results.appendChild(nuevoParticipant)
    }
}

function showResult(dividedPrice) {
    console.log(participants)
    if (price.value == 0) {
        alert(`Ingrese Precio`)
        document.getElementById('price').disabled = false
        document.getElementById('tips').disabled = false
    } else if (participants.length == 0) {
        //Aviso pero no freno
        alert(`Ingrese al menos 1 participante`)
        document.getElementById('price').disabled = false
        document.getElementById('tips').disabled = false
    } else{
        deben.innerHTML = ""
        let finalResult = document.createElement("div")
        if (participants.length == 1 && price != 0) {
            finalResult.innerHTML =`<div class="row">
                                        <h2>El precio es: ${price.value}, a pagar individualmente es: ${dividedPrice}</h2>
                                    </div>`
            deben.appendChild(finalResult)
        } else if (participants.length >1 && price != 0){
            finalResult.innerHTML = `<div class="row">
                                    <h2>El precio es: ${price.value}, a pagar entre ${(participants.length)} es: ${dividedPrice} c/u</h2>
                                    </div>`
            //<h3> ${deudaResult} a ${cobrarResult} </h3>
            deben.appendChild(finalResult)
        }
    }

    price.value = ''
}


// Inicio
// function menu() {
//     let exitMenu = false
//     do {
//         exitMenu = preguntarOpcion(exitMenu)
//     } while (!exitMenu)
// }
// function preguntarOpcion(salir) {
//     let optionStart = parseInt(prompt(`Ingrese la opcion deseada
//         1. Iniciar nueva división
//         2. Ver resultado ultima división
//         3. Modificar divisiones previas
//         4. Modificar nombre de particpantes previos
//         5. Ver todas las divisiones (no)
//         0. Salir`))

//     switch (optionStart) {
//         case 1:
//             askPrice()
//             agregarParticipante(optionStart)
//             deber()
//             showPrice()
//             break
//         case 2:
//             showPrice()
//             break
//         case 3:
//             timesEdit++
//             edit(participants, optionStart)
//             deber()
//             showPrice()
//             break
//         case 4:
//             edit(participants, optionStart)
//             deber()
//             showPrice()
//             break
//         case 5:
//             console.log(`Todas`)
//             break
//         case 0:
//             console.log(`Adios`)
//             salir = true
//             return salir
//             break
//         default:
//             alert(`${optionStart} no es una opción válida`)
//             break
//     }
// }

//Modificar Nombre o Monto
function edit(array, optionStart) {
    if (timesEdit = 1) {
        deudaResult = []
        cobrarResult = []
    }
    if (participants == '') {
        alert(`No hay ediciones que realizar aun`)
        return
    } else {
        let updParticipantM = 0
        let updParticipantN = ''
        if (optionStart == 3) {
            updParticipantM = 0
            updParticipantN = ''
            let searchedName = name_monto.value
            let foundedID = array.findIndex((participante) => participante.nombre.toLowerCase() == searchedName.toLowerCase())
            updParticipantM = array[foundedID].monto = new_monto.value
            timesEdit = 0
        } else {
            updParticipantM = 0
            updParticipantN = ''
            let searchedName = old_name.value
            let foundedID = array.findIndex((participante) => participante.nombre.toLowerCase() == searchedName.toLowerCase())
            updParticipantN = array[foundedID].nombre = new_name.value
            timesEdit = 0
        }
    }
}


//Iniciamos
let buttonAdd = document.getElementById("add")
buttonAdd.onclick = () => {
    agregarParticipante()
}

let buttonStart = document.getElementById("start")
buttonStart.onclick = () => {
    tips(),
    divide()
}

let buttonNew = document.getElementById("new")
buttonNew.onclick = () => {
    clearEverything()
}

let buttonChangeMonto = document.getElementById("changeMonto")
buttonChangeMonto.onclick = () => {
    edit(participants,3),
    showParticipants(participants)
}

let buttonChangeName = document.getElementById("changeName")
buttonChangeName.onclick = () => {
    edit(participants,4),
    showParticipants(participants)
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}