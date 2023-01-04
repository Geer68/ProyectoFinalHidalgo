//Preguntemos precio
let price = 0
let divideBetween = 0
let dividedPrice = 0
let names = []
let input = 0
let i = 0
function askPrice(){
    price = prompt("Ingrese el monto a pagar")
    while (isNaN(price)) {
        alert("El valor ingresado no es un número, reintente")
        askPrice()
    }
    tips()
}
//Propina?
function tips(){
    let decision = prompt("Desea dejar propina? S/N")
    if (decision.toLowerCase()=='s'){
        let percentage = prompt("Ingrese el porcentaje (10=10%)")
        while (isNaN(percentage)) {
            alert("El valor ingresado no es un número, reintente")
            tips()
        }
        let priceWTips = (price*(percentage/100))
        price = price + priceWTips
        toDivide()
    } else {
        toDivide()
    }
     
}
//Cuantos son
function toDivide() {
    let decision = prompt("Paga solo? S/N")
    if (decision.toLowerCase()=='s'){
        showPrice()
    } else {
        divideBetween = prompt("¿Cuántos son?")
        console.log(divideBetween)
        while (isNaN(divideBetween)) {
            alert("El valor ingresado no es un número, reintente")
            
        }
        divide()
        showPrice()
        askNames()
    }
}
//Nombre de los participantes
function askNames() {
    input = prompt("Ingrese el nombre del participante")
    addNames()
}
function addNames(){
    while (input!="0"){
        i = i +1
        names.push(input)
        askNames()
    }
    console.log(names)
}
//Dividir
function divide(){
    dividedPrice = price/divideBetween
}
//Cuanto puso cada uno, hacer con nombres 
//Quien debe a quien

//Fin
function showPrice() {
    if (divideBetween=0) {
        console.log(`El precio individual es ${price}`)
    } else {
        console.log(`El precio a pagar entre ${divideBetween} personas es ${dividedPrice} c/u`)
        //No toma el valor de la variable
    }
}
//Iniciamos
askPrice()
