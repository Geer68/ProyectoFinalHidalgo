//Variables
let price = 0
let divideBetween = 0
let dividedPrice = 0
let names = []
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
        toDivide()
    } else if (decision.toLowerCase()=='n'){
        toDivide()
    } else {
        alert("El caracter ingresado no es una opción válida")
        tips()
    }
     
}

//¿Cuantos son?
function toDivide() {
    let decision = prompt("Paga solo? S/N")
    if (decision.toLowerCase()=='s'){
        showPriceIndividual()
    } else if (decision.toLowerCase()=='n'){
        askNames()
        divide()
        showPriceGroup()
    } else {
        alert("El caracter ingresado no es una opción válida")
        toDivide()
    }
}
//¿Nombre de los participantes?
function askNames() {
    input = prompt(`Ingrese el nombre del participante n°${i + 1} (colocar '0' para no agregar mas)`)
    addNames()
}
function addNames(){
    while (input!="0"){
        i = i +1
        names.push(input)
        askNames()
    }
    //console.log(names) check funcionamiento
}

//Dividir
function divide(){
    dividedPrice = price/(names.length)
}
//Cuanto puso cada uno, hacer con nombres (proximamente)
//Quien debe a quien (proximamente)
//Realizar grafico (proximamente)
//Almacenar varias cuentas (proximamente)
//Tipo de cuentas (Comida, Transporte, Alquiler, Otro, etc)(proximamente)

//Fin
function showPriceIndividual() {
    alert(`El precio a pagar de manera individual es ${price}`)
    let decision = prompt("¿Desea realizar otra cuenta? S/N")
    if (decision.toLowerCase()=='s'){
        askPrice()
    } else {
        console.log("Fin")
    }
}
function showPriceGroup() {
    alert(`El precio es: ${price}, a pagar entre ${(names.length)} es: ${dividedPrice} c/u`)
    let decision = prompt("¿Desea realizar otra cuenta? S/N")
    if (decision.toLowerCase()=='s'){
        askPrice()
    } else {
        console.log("Fin")
    }
}

//Iniciamos
askPrice()
