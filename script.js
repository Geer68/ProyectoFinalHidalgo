//Variables
let price = 0
let divideBetween = 0
let dividedPrice = 0
let deudaResult = []
let participants = []
let cobrarResult = []
let input = 0
let times = 0


//Preguntemos precio
function askPrice() {
    price = prompt("Ingrese el monto a pagar")
    while (isNaN(price)) {
        alert(` ${price} no es un número, reintente`)
        askPrice()
    }
    tips()
}

//¿Propina?
function tips() {
    let decision = prompt("Desea dejar propina? S/N")
    if (decision.toLowerCase() == 's') {
        let percentage = parseInt(prompt(`Ingrese el porcentaje 
        ej: (10=10%)`))
        while (isNaN(percentage)) {
            alert(` ${desicion}no es un número, reintente`)
            tips()
        }
        let priceWTips = (price * (percentage / 100))
        price = (+price + +priceWTips)
        divide()
    } else if (decision.toLowerCase() == 'n') {
        divide()
    } else {
        alert(`${decision} no es una opción válida`)
        tips()
    }

}
//Cuanto puso cada uno, hacer con nombres (proximamente)
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
    if (times <= 1){
        input = prompt(`Desea agregar un participante? S/N`)
        if (input.toLowerCase() == 's') {
            let nombreInput = prompt(`Ingrese el nombre del participante n${participants.length}`)
            let montoInput = prompt(`¿Cuanta plata puso ${nombreInput}?`)
            const participanteNuevo = new Participante(participants.length + 1, nombreInput, montoInput)
            console.log(participanteNuevo)
            participants.push(participanteNuevo)
            console.log()
            agregarParticipante()
            
    
            //participanteNuevo.mostrarInfoEstado()
            //console.log(participants)
        } else if (input.toLowerCase() == 'n') {
            divide()
        } else {
            alert(`${input} no es una opción válida`)
            agregarParticipante()
        }
    } else{
        participants = []
        times = 0
        agregarParticipante()   
    }

}

//Dividir
function divide() {
    dividedPrice = price / (participants.length)

}

//Inicio
function menu() {
    let exitMenu = false
    do {
        exitMenu = preguntarOpcion(exitMenu)
    } while (!exitMenu)
}

function preguntarOpcion(salir) {
    let optionStart = parseInt(prompt(`Ingrese la opcion deseada
        1. Iniciar nueva división
        2. Ver resultado ultima división
        3. Modificar divisiones previas
        4. Modificar nombre de particpantes previos
        5. Ver todas las divisiones (no)
        0. Salir`))

    switch (optionStart) {
        case 1:
            times++
            askPrice()
            agregarParticipante()
            deber()
            showPrice()
            break
        case 2:
            showPrice()
            break
        case 3:
            edit(participants, optionStart)
            deber()
            showPrice()
            break
        case 4:
            edit(participants, optionStart)
            deber()
            showPrice()
            break
        case 5:
            console.log(`Todas`)
            break
        case 0:
            console.log(`Adios`)
            salir = true
            return salir
            break
        default:
            alert(`${optionStart} no es una opción válida`)
            break
    }
}
//Quien debe a quien
function deber() {
    if (deudaResult == '' ){
        for (const participanteNuevo of participants) {
            participanteNuevo.debe = dividedPrice - participanteNuevo.monto
            //NO DEBE NADA
            if (participanteNuevo.debe <= 0) {
                participanteNuevo.debe = 0
                cobrarResult.push(`${participanteNuevo.nombre}`)
            } else {
                deudaResult.push(` ${participanteNuevo.nombre} debe ${participanteNuevo.debe}`)
            }
            console.log(participanteNuevo.id)
            console.log(participanteNuevo.debe)
        }
    } else {
        deudaResult = []
        cobrarResult = []
        for (const participanteNuevo of participants) {
            participanteNuevo.debe = dividedPrice - participanteNuevo.monto
            //NO DEBE NADA
            if (participanteNuevo.debe <= 0) {
                cobrarResult.push(`${participanteNuevo.nombre}`)
            } else {
                deudaResult.push(` ${participanteNuevo.nombre} debe ${participanteNuevo.debe}`)
            }
            console.log(participanteNuevo.id)
            console.log(participanteNuevo.debe)
        }
    }
}
function cobrar() {

    alert(``)
}
//Modificar Nombre o Monto
function edit(array, optionStart) {
    if (participants == '') {
        alert(`No hay ediciones que realizar aun`)
        return
    } else {
        let updParticipantM = 0
        let updParticipantN = ''
        if (optionStart == 3) {
            let searchedName = prompt(`Ingrese nombre del participante a cambiar monto`)
            let foundedID = array.findIndex((participante) => participante.nombre.toLowerCase() == searchedName.toLowerCase())
            updParticipantM = array[foundedID].monto = prompt('Reingrese monto')
        } else {
            let searchedName = prompt(`Ingrese el nombre que desea cambiar`)
            let foundedID = array.findIndex((participante) => participante.nombre.toLowerCase() == searchedName.toLowerCase())
            updParticipantN = array[foundedID].nombre = prompt('Reingrese nombre')
        }
    }


    console.log(participants)
}
//Realizar grafico (proximamente)
//Almacenar varias cuentas (proximamente)
//Tipo de cuentas (Comida, Transporte, Alquiler, Otro, etc)(proximamente)

//Fin

function showPrice() {
    if (price == 0) {
        alert(`No hay divisiones previas`)
        return
    }
    if (participants.length == 1) {
        alert(`El precio es: ${price}, a pagar individualmente es: ${dividedPrice}`)
    } else {
        alert(`El precio es: ${price}, a pagar entre ${(participants.length)} es: ${dividedPrice} c/u`)
        if (deudaResult == '') {
            return
        }   
        alert(`${deudaResult} a ${cobrarResult}` )
    }
}
//Iniciamos
menu()

