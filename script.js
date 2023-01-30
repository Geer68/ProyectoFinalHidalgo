//Tareas
//  1. Asociar limpiar a Nueva division
//  1. Eliminar participante con boton interactivo?
//  1. Generar emision de resultado
//  1. Restriccion de no integrante                 SOLUCIONADO
//  1. Dark mode
//  2. Estilizar listado                            SOLUCIONADO 
//  1. Revisar aplicado de Propina


//Comentar Ctrl + K, Ctrl + C

//Variables
let price = document.getElementById("price")
// document.getElementById("price").defaultValue = 0
let results = document.getElementById("results")
document.getElementById("tips").defaultValue = 0
let deben = document.getElementById("deben")

let deudaResult = []
let participants = []
let cobrarResult = []

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

//Bloquear actualizacion contenido con calcular (en eso)
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
    //Limpiar tips y precio
}


//Dividir
function divide() {
    let dividedPrice = price.value / (participants.length)
    console.log(dividedPrice)
    console.log(participants)
    showResult(dividedPrice)
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
        //Error
        alert(`Ingrese al menos 1 participante`)
        document.getElementById('price').disabled = false
        document.getElementById('tips').disabled = false
    }

    deben.innerHTML = ""
    let finalResult = document.createElement("div")
    if (participants.length == 1) {
        console.log("go")
        finalResult.innerHTML =`<div class="row">
                                    <h2>El precio es: ${price.value}, a pagar individualmente es: ${dividedPrice}</h2>
                                </div>`
        results.appendChild(finalResult)
    } else {
        finalResult.innerHTML = `<div class="row">
        <h2>El precio es: ${price.value}, a pagar entre ${(participants.length)} es: ${dividedPrice} c/u</h2>
        </div>`
        results.appendChild(finalResult)
    }
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

//Quien debe a quien
function deber() {
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
        //console.log(participanteNuevo.id)
        //console.log(participanteNuevo.debe)
    }
}


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
            let searchedName = prompt(`Ingrese nombre del participante a cambiar monto`)
            let foundedID = array.findIndex((participante) => participante.nombre.toLowerCase() == searchedName.toLowerCase())
            updParticipantM = array[foundedID].monto = prompt('Reingrese monto')
            timesEdit = 0
        } else {
            updParticipantM = 0
            updParticipantN = ''
            let searchedName = prompt(`Ingrese el nombre que desea cambiar`)
            let foundedID = array.findIndex((participante) => participante.nombre.toLowerCase() == searchedName.toLowerCase())
            updParticipantN = array[foundedID].nombre = prompt('Reingrese nombre')
            timesEdit = 0
        }
    }
    //console.log(participants)
}
//Realizar grafico (proximamente)
//Tipo de cuentas (Comida, Transporte, Alquiler, Otro, etc)(proximamente)

//Fin

// function showPrice(dividedPrice) {
//     if (price == 0) {
//         alert(`No hay divisiones previas`)
//         return
//     }
//     if (participants.length == 1) {
//         alert(`El precio es: ${price}, a pagar individualmente es: ${dividedPrice}`)
//     } else {
//         alert(`El precio es: ${price.value}, a pagar entre ${(participants.length)} es: ${dividedPrice} c/u`)
//         if (deudaResult == '') {
//             return
//         }
//         alert(`${deudaResult} a ${cobrarResult}`)
//     }
// }



//Iniciamos
let buttonAdd = document.getElementById("add")
buttonAdd.onclick = () => {
    agregarParticipante()
}

let buttonDelete = document.getElementById("erase")
buttonDelete.onclick = () => { 
    clearEverything() 
}

let buttonStart = document.getElementById("start")
buttonStart.onclick = () => {
    tips(),
    divide()
}