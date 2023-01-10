//Variables
let price = 0
let divideBetween = 0
let dividedPrice = 0
const names = []
const participants = []
let input = 0
let i = 0


//Preguntemos precio
function askPrice(){
    price = prompt("Ingrese el monto a pagar")
    while (isNaN(price)) {
        alert("El valor ingresado no es un número, reintente")
        askPrice()
    }
    tips()
}

//¿Propina?
function tips(){
    let decision = prompt("Desea dejar propina? S/N")
    if (decision.toLowerCase()=='s'){
        let percentage = parseInt(prompt("Ingrese el porcentaje (10=10%)")) 
        while (isNaN(percentage)) {
            alert("El valor ingresado no es un número, reintente")
            tips()
        }
        let priceWTips = (price*(percentage/100))
        price = (+price + +priceWTips)
        divide()
    } else if (decision.toLowerCase()=='n'){
        divide()
    } else {
        alert("El caracter ingresado no es una opción válida")
        tips()
    }
     
}
//Cuanto puso cada uno, hacer con nombres (proximamente)
class Participante {
    constructor(id, nombre, monto){
        this.id = id,
        this.nombre = nombre,
        this.monto = monto,
        this.debe = debe
    }
    mostrarInfoEstado(){
        console.log(`${this.nombre} puso ${this.monto}`)
    }
}

function agregarParticipante(){
    input = prompt(`Desea agregar un participante? S/N`)
    if (input.toLowerCase()=='s'){
        let nombreInput = prompt(`Ingrese el nombre del participante n${i}`)
        let montoInput = prompt(`¿Cuanta plata puso ${nombreInput}?`)
        const participanteNuevo = new Participante(names.length+1, nombreInput, montoInput)
        console.log(participanteNuevo)
        participants.push(participanteNuevo) 
        agregarParticipante()

        participanteNuevo.mostrarInfoEstado()
        console.log(participants)
    } else {
        divide()
    }
}

//Dividir
function divide(){
    dividedPrice = price/(participants.length)

}

//Inicio
function menu(){
    let exitMenu = false
    do{
        exitMenu = preguntarOpcion(exitMenu)
    }while(!exitMenu)
} 

function preguntarOpcion(salir){
    let optionStart = parseInt(prompt(`Ingrese la opcion deseada
        1. Iniciar nueva división
        2. Ver resultado ultima división
        3. Modificar divisiones previas
        4. Ver todas las divisiones
        0. Salir`))
    
        switch(optionStart){
            case 1:
                askPrice()
                agregarParticipante()
                showPrice()
            break
            case 2:
                console.log("Resultado")
            break
            case 3:
                console.log("Modificacion")
            break
            case 4:
                console.log("Visualizar")
            break
            case 5:

            break
            case 0:
                console.log(`Adios`)
                salir = true
                return salir
            break
            default:
                console.log(`La opcion ingresada`)
            break
        }
}
//Quien debe a quien
function debe(){
    
}
//Realizar grafico (proximamente)
//Almacenar varias cuentas (proximamente)
//Tipo de cuentas (Comida, Transporte, Alquiler, Otro, etc)(proximamente)

//Fin

function showPrice() {
    if (participants.length == 1) {
        alert(`El precio es: ${price}, a pagar individualmente es: ${dividedPrice}`)
    } else {
        alert(`El precio es: ${price}, a pagar entre ${(participants.length)} es: ${dividedPrice} c/u`)
        let decision = prompt("¿Desea realizar otra cuenta? S/N")
        if (decision.toLowerCase()=='s'){
            askPrice()
        } else {
            console.log("Fin")
        }
    }
}

//Iniciamos
menu()
//askPrice()
