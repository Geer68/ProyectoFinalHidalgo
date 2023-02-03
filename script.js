//Tareas
//  1. Asociar limpiar a Nueva division                     SOLUCIONADO
//  1. Eliminar participante con boton interactivo?         ENTREGA FINAL (?)
//  1. Generar emision de resultado                         SOLUCIONADO
//  1. Restriccion de no integrante                         SOLUCIONADO
//  1. Dark mode                                            ENTREGA FINAL (?)
//  2. Estilizar listado                                    SOLUCIONADO
//  1. Revisar aplicado de Propina                          ENTREGA FINAL (?)
//  1. Eliminar participante bt find()                      SOLUCIONADO
//  1. Actualizar monto/nombre, nuevo boton/modal?          SOLUCIONADO
//  2. Eliminar variables globales incesarias               SOLUCIONADO
//  1. Actualización infinita de precio con tips            SOLUCIONADO
//  1. Almacenar datos en setLocal                          SOLUCIONADO      
//  3. Restaurante y Grupales, sin un precio fijo           ENTREGA FINAL (?)
//  4. Generar texto para compartir                         ENTREGA FINAL (?)
//  1. Incluir operadores ternarios                         ENTREGA FINAL (?)
//  4. Realizar grafico                                     ENTREGA FINAL (?)
//  1. Visualizacion de precio a pagar sin precio           SOLUCIONADO
//  1. function insufficientMoney () hacer util             ENTREGA FINAL (?)
//  1. function showResult() reescribir                     SOLUCIONADO
//  4. Hacer responsive                                     ENTREGA FINAL (?)
//  1. Vaciar campos de edit                                SOLUCIONADO
//  1. Eliminar alert de edit                               ENTREGA FINAL (?)
//  1. Eliminar calculate() cuando no debería               SOLUCIONADO
//  4. Implementar correctamente para comidas con propinas  ENTREGA FINAL (?)


//Comentar Ctrl + K, Ctrl + C

//Variables
let price = document.getElementById("price")
let results = document.getElementById("participantList")
// document.getElementById("tips").defaultValue = 0
let resultados = document.getElementById("resultados")
let name_monto = document.getElementById("name_monto")
let new_monto = document.getElementById("new_monto")
let old_name = document.getElementById("old_name")
let new_name = document.getElementById("new_name")
let deletedName = document.getElementById("deletedName")
localStorage.setItem("style", "white")
let mode = localStorage.getItem("style")
let participants = []




//Propinas (sin uso por ahora)
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
    if (nombreInput.value == '') {
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




function calculate() {
    if (participants == '') {
        //debe agregar 1 participante minimo (mejorar)
    } else {
        const total = participants.reduce((acc, user) => acc + user.amount, 0)
        const calculate = () => {
            const porPersona = total / participants.length
            const separateUsers = () => {
                const prestador = participants.filter(user => user.amount > porPersona)
                const deudor = participants.filter(user => user.amount < porPersona)
                const prestadores = prestador.map((prestador) => ({ ...prestador, deposito: prestador.amount - porPersona }))
                const deudores = deudor.map((deudor) => ({ ...deudor, balance: porPersona - deudor.amount, debePagar: [] }))
                return { deudores, prestadores }
            }
            const { prestadores, deudores } = separateUsers()
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
                            balanceSheet.push({ name, debePagar, a })
                        }
                    }
                    return deudor.balance
                });

            });
            showResult(total, balanceSheet, participants, porPersona)
            return balanceSheet
        }
        const resultado = calculate()
        console.log(resultado)
    }
}
//Storage
function save() {
    localStorage.setItem("participantsS", JSON.stringify(participants))
}
function clean() {
    localStorage.setItem("participantsS", [])
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



function insufficientMoney(participants) {
    const total = participants.reduce((acc, user) => acc + user.amount, 0)
        (total == parseInt(price.value)) ? console.log("hola") : console.log("no ola")
}



//Mostrar
function showParticipants(participants) {
    results.innerHTML = `<div class="participantsDescription">
                            <h3>N°</h3>
                            <h3>Nombre</h3>
                            <h3>Puso</h3>
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

    let finalNumbers = document.getElementById("finalNumbers")
    let numbers = document.createElement("div")
    finalNumbers.innerHTML = ` <li style="color: #252525">Total gastado: $${total}</li>
                               <li style="color: #252525">Total participantes: ${participants.length}</li>
                               <li style="color: #252525">Monto por persona: $${Math.round(porPersona)}</li>`
    finalNumbers.appendChild(numbers)

    let finalParticipants = document.getElementById("finalParticipants")
    let h3Participants = document.createElement("h3")
    h3Participants.innerText = `Participantes`
    finalParticipants.appendChild(h3Participants)


    for (let p of participants) {
        let nuevoParticipant = document.createElement("li")
        nuevoParticipant.innerText = `${p.name}`
        finalParticipants.appendChild(nuevoParticipant)
    }


    let finalResult = document.getElementById("finalResult")
    finalResult.innerHTML = ''
    if (balanceSheet == '') {
        let h3Result = document.createElement("h3")
        h3Result.innerText = `No se debe`
        finalResult.appendChild(h3Result)
    } else {
        let h3Result = document.createElement("h3")
        h3Result.innerText = `Resultados`
        finalResult.appendChild(h3Result)
        for (let p of balanceSheet) {
            let nuevoResultado = document.createElement("h3")
            nuevoResultado.innerText = `${p.name} debe pagar: $${Math.round(p.debePagar)} a ${p.a}`
            finalResult.appendChild(nuevoResultado)
        }
    }
}

//Modificar Nombre o Monto
function edit(array, optionStart) {
    if (participants == '') {
        alert(`No hay ediciones que realizar aun`)
    } else {
        let updParticipantM = 0
        let updParticipantN = ''
        if (optionStart == 3) {
            updParticipantM = 0
            updParticipantN = ''
            let searchedName = name_monto.value
            let foundedID = array.findIndex((participante) => participante.name.toLowerCase() == searchedName.toLowerCase())
            updParticipantM = array[foundedID].amount = parseInt(new_monto.value)
            name_monto.value = '', new_monto.value = ''
            calculate(),
                showParticipants(participants)
        } else if (optionStart == 4) {
            updParticipantM = 0
            updParticipantN = ''
            let searchedName = old_name.value
            let foundedID = array.findIndex((participante) => participante.name.toLowerCase() == searchedName.toLowerCase())
            updParticipantN = array[foundedID].name = new_name.value
            old_name.value = '', new_name.value = ''
            calculate(),
                showParticipants(participants)
        } else {
            let searchedName = deletedName.value
            let foundedID = array.findIndex((participante) => participante.name.toLowerCase() == searchedName.toLowerCase())
            array.splice(foundedID, 1)
            calculate()
            showParticipants(participants)
            deletedName.value = ''
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
    calculate(),
        save()
}

let buttonNew = document.getElementById("new")
buttonNew.onclick = () => {
    clearEverything(),
        clean()
}

let buttonChangeMonto = document.getElementById("changeMonto")
buttonChangeMonto.onclick = () => {
    edit(participants, 3),
        save()
}

let buttonChangeName = document.getElementById("changeName")
buttonChangeName.onclick = () => {
    edit(participants, 4),
        save()
}

let buttonDeleteName = document.getElementById("deleteName")
buttonDeleteName.onclick = () => {
    edit(participants, 5),
        save()
}



if (localStorage.getItem("participantsS") != '') {
    participants = JSON.parse(localStorage.getItem("participantsS"))
    calculate()
    showParticipants(participants)
}





//Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
