//Tareas
//  1. Asociar limpiar a Nueva division                     SOLUCIONADO
//  1. Eliminar participante con boton interactivo?         
//  1. Generar emision de resultado                         SOLUCIONADO
//  1. Restriccion de no integrante                         SOLUCIONADO
//  1. Dark mode                                            
//  2. Estilizar listado                                    SOLUCIONADO 
//  1. Revisar aplicado de Propina                          
//  1. Eliminar participante bt find()                      
//  1. Actualizar monto/nombre, nuevo boton/modal?          SOLUCIONADO
//  2. Eliminar variables globales incesarias               SOLUCIONADO
//  1. Actualización infinita de precio con tips            SOLUCIONADO
//  1. Almacenar datos en setLocal                          
//  3. Restaurante y Grupales, sin un precio fijo           ENTREGA FINAL (?)
//  4. Generar texto para compartir                         ENTREGA FINAL (?)
//  1. Incluir operadores ternarios                         TRABAJANDO
//  4. Realizar grafico                                     ENTREGA FINAL (?)
//  1. Visualizacion de precio a pagar sin precio           SOLUCIONADO
//  1. function insufficientMoney () hacer util             
//  1. function showResult() reescribir                     SOLUCIONADO

//Comentar Ctrl + K, Ctrl + C

//Variables
let price = document.getElementById("price")
let results = document.getElementById("participantList")
document.getElementById("tips").defaultValue = 0
let resultados = document.getElementById("resultados")
let name_monto = document.getElementById("name_monto")
let new_monto = document.getElementById("new_monto")
let old_name = document.getElementById("old_name")
let new_name = document.getElementById("new_name")

let participants = []


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
            this.name = nombre,
            this.amount = monto
    }
}

function newParticipant() {
    let nombreInput = document.getElementById("name")
    let montoInput = document.getElementById("monto")
    if (nombreInput.value == ''){
        alert(`Ingrese nombre`)
    } else if (montoInput.value == '') {
        alert(`Ingrese Monto`)
    } else {
        const participanteNuevo = new Participante(participants.length + 1, nombreInput.value, parseInt(montoInput.value))
        // console.log(participanteNuevo)
        participants.push(participanteNuevo)
        // console.log(participants)
        nombreInput.value = '', montoInput.value = ''
    }
    showParticipants(participants)
}



function calculate () {
    console.log(price.value)
    const total = participants.reduce((acc, user)=> acc + user.amount, 0)
    console.log(total)
    
    const calculate = ()=>{  
        const porPersona = total / participants.length
        const separateUsers = ()=> {
            const prestador = participants.filter(user=> user.amount > porPersona)    
            const deudor = participants.filter(user=> user.amount < porPersona)
            const prestadores = prestador.map((prestador)=>({...prestador, deposito:prestador.amount - porPersona}))
            const deudores = deudor.map((deudor)=>({...deudor, balance:porPersona - deudor.amount, debePagar:[]}))
            return {deudores, prestadores}   
        }   
        const {prestadores, deudores} = separateUsers()
        const balanceSheet = []
        deudores.forEach(deudor => {
            const name = deudor.name
            prestadores.every(prestador => {
                const a = prestador.name
                if (prestador.deposito) {
                    const debePagar = Math.min(prestador.deposito, deudor.balance)
                    if (debePagar) {
                        deudor.balance -= debePagar
                        prestador.deposito -= debePagar
                        balanceSheet.push({name, debePagar, a})
                    }
                }
                return deudor.balance
            });
            
        });
        (parseInt(price.value) > total) ? alert("Falta plata") : showResult(total, balanceSheet, participants, porPersona)
        return balanceSheet
    }
    
    const resultado = calculate()
    console.log(resultado)

    
}



//Limpiar
function clearEverything() {
    participants = []
    showParticipants(participants)
    results.innerHTML = `<div class="participantsDescription">
                            <h3>N°</h3>
                            <h3>Nombre</h3>
                            <h3>Puso</h3>
                        </div>`
    resultados.innerHTML = ""
    //Limpiar tips y precio
}



function insufficientMoney (participants) {
    const total = participants.reduce((acc, user)=> acc + user.amount, 0)
    (total == parseInt(price.value)) ? console.log("hola") : console.log("no ola")
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
            <h3>${p.name}</h3>
            <h3>$${p.amount}</h3>
        </div>`
        results.appendChild(nuevoParticipant)
    }
}

function showResult(total, balanceSheet, participants, porPersona) {
    resultados.innerHTML = `<div id="finalNumbers"></div>
                            <div id="finalParticipants"></div>
                            <div id="finalResult"></div>`
 
    let finalnumbers = document.createElement("div")
    finalnumbers.innerHTML = ` <li style="color: wheat;">Total gastado: $${total}</li>
                        <li style="color: wheat;">Total participantes: ${participants.length}</li>
                        <li style="color: wheat;">Monto por persona: $${Math.round(porPersona)}</li>`
    resultados.appendChild(finalnumbers)

    let finalParticipants = document.getElementById("finalParticipants")
    finalParticipants.innerHTML = `<h3>Participantes</h3>`


    for (let p of participants) {
        let nuevoParticipant = document.createElement("div")
        nuevoParticipant.innerHTML = `<li> ${p.name}</li>`
        finalParticipants.appendChild(nuevoParticipant)
    }

    let finalResult = document.getElementById("finalResult")
    finalResult.innerHTML = `<h3>Resultados</h3>`

    for (let p of balanceSheet) {
         let nuevoResultado = document.createElement("div")
         nuevoResultado.innerHTML = `<li>${p.name} debe pagar: $${Math.round(p.debePagar)} a ${p.a}</li>`
         finalResult.appendChild(nuevoResultado)
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
            let searchedName = name_monto.value
            let foundedID = array.findIndex((participante) => participante.name.toLowerCase() == searchedName.toLowerCase())
            updParticipantM = array[foundedID].amount = parseInt(new_monto.value)
            timesEdit = 0
        } else {
            updParticipantM = 0
            updParticipantN = ''
            let searchedName = old_name.value
            let foundedID = array.findIndex((participante) => participante.name.toLowerCase() == searchedName.toLowerCase())
            updParticipantN = array[foundedID].name = new_name.value
            timesEdit = 0
        }
    }
}


//Iniciamos
let buttonAdd = document.getElementById("add")
buttonAdd.onclick = () => {
    newParticipant()
}

let buttonStart = document.getElementById("start")
buttonStart.onclick = () => {
    calculate()
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
