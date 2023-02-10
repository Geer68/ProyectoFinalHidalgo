//Tareas
//  1. Asociar limpiar a Nueva division                     SOLUCIONADO
//  1. Generar emision de resultado                         SOLUCIONADO
//  1. Restriccion de no integrante                         SOLUCIONADO
//  2. Estilizar listado                                    SOLUCIONADO
//  1. Eliminar participante bt find()                      SOLUCIONADO
//  1. Actualizar monto/nombre, nuevo boton/modal?          SOLUCIONADO
//  2. Eliminar variables globales incesarias               SOLUCIONADO
//  1. Actualización infinita de precio con tips            SOLUCIONADO
//  1. Almacenar datos en setLocal                          SOLUCIONADO      
//  1. Visualizacion de precio a pagar sin precio           SOLUCIONADO
//  1. function showResult() reescribir                     SOLUCIONADO
//  1. Vaciar campos de edit                                SOLUCIONADO
//  1. Eliminar calculate() cuando no debería               SOLUCIONADO
//  1. Al eliminar mostraba informacion NaN                 SOLUCIONADO

//07-02-23

//  1. Separar calculate()                                  SOLUCIONADO
//  1. Independizar funciones                               SOLUCIONADO
//  1. Eliminar alert de edit                               SOLUCIONADO
//  2. Implementar correctamente para comidas con propinas  TRABAJANDO
//  1. Eliminar participante con boton interactivo?         SOLUCIONADO
//  1. Dark mode                                            
//  1. Revisar aplicado de Propina                          SOLUCIONADO
//  3. Restaurante y Grupales, sin un precio fijo           TRABAJANDO
//  4. Generar texto para compartir                         
//  1. Incluir operadores ternarios                         
//  4. Realizar grafico                                     
//  1. function insufficientMoney () hacer util              
//  4. Hacer responsive                                     
//  1. Cambiar a switch edit()                              
//  1. Monto permite +-                                     
//  1. Error al eliminar de ultimo al primero
//  1. Primera carga no elimina restaurante                 SOLUCIONADO
//  1. Guardar preferencia de modo
//  1. Mejorar edits
//  1. No guarda cuenta anterior ni configuraciones
//  1. No muestra precio en restaurante total

//NODE AVERIGUAR PARA EDICION

//Rubricas de Entrega final                                 REVISAR
//Llamada fetch(), averiguar para edicion con node?         
//Storage                                                   CUMPLIDO
//Dom                                                       CUMPLIDO BASICO
//Librerias                                                 CUMPLIDO
//Comentarios indicativos, no inecesarios                   REVISAR
//Entregar con comentario en un readme, descripccion del proyecto, que hace, funciones async, etc. AGREGAR README RE UTIL
// 2 o 3 operadoresa avanzados                              

//Comentar Ctrl + K, Ctrl + C

//Variables
let restaurantContainer = document.getElementById("restaurantContainer")


let priceContainer = document.getElementById("priceContainer")


let tipsContainer = document.getElementById("tipsContainer")

let results = document.getElementById("participantList")

let resultados = document.getElementById("resultados")
let name_monto = document.getElementById("name_monto")
let new_monto = document.getElementById("new_monto")
let old_name = document.getElementById("old_name")
let new_name = document.getElementById("new_name")
let nombreInput = document.getElementById("name")
let montoInput = document.getElementById("monto")
let participants = []

localStorage.setItem("darkmode", false)
localStorage.setItem("mode", "juntada")
localStorage.setItem("firsTime", true)
let times = localStorage.getItem("firstTime")
if (times){
    localStorage.setItem("participantsS", [])
}
//Class
class Participante {
    constructor(id, nombre, monto) {
        this.id = id,
            this.name = nombre,
            this.amount = monto
    }
}

//Agregar participantes
function newParticipant() {
    const participanteNuevo = new Participante(participants.length, nombreInput.value, parseInt(montoInput.value))
    participants.push(participanteNuevo)
    nombreInput.value = '', montoInput.value = ''
}

//Propinas
function getTips() {
    let price = document.getElementById("price")
    let tipPercentage = document.getElementById("tips")
    let tipsAmount = parseInt(price.value)*(parseInt(tipPercentage.value))/100
    let priceWTips = parseInt(price.value) + tipsAmount 
    return { price, tipPercentage, tipsAmount, priceWTips }
}



function calculate() {
    let mode = localStorage.getItem("mode")
    if (mode == "restaurant") {
        const { price, tipPercentage, tipsAmount, priceWTips } = getTips()
        const total = priceWTips
        const porPersona = priceWTips / participants.length
        console.log(total)
        return { total, porPersona }
    } else {
        const total = participants.reduce((acc, user) => acc + user.amount, 0)
        const porPersona = total / participants.length
        return { total, porPersona }
    }
}

function separateUsers() {
    const { total, porPersona } = calculate()
    const prestador = participants.filter(user => user.amount > porPersona)
    const deudor = participants.filter(user => user.amount < porPersona)
    const prestadores = prestador.map((prestador) => ({ ...prestador, deposito: prestador.amount - porPersona }))
    const deudores = deudor.map((deudor) => ({ ...deudor, balance: porPersona - deudor.amount, debePagar: [] }))
    return { deudores, prestadores }
}

function prestadorDeudor() {
    const { total, porPersona } = calculate()
    console.log(total)
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




//Storage
function save() {
    localStorage.setItem("participantsS", JSON.stringify(participants))
}
function clean() {
    localStorage.setItem("participantsS", [])
}
// function darkmode() {
//     console.log("a")
//     let preference = localStorage.getItem("darkmode")
//     if (preference) {
//         localStorage.setItem("darkmode", false)
//     } else {
//         localStorage.setItem("darkmode", true)
//     }
    



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



//Promise?
function deleteParticipant(id) {
    if (participants.length == 1) {
        let name = participants[id - 1].name
        Swal.fire({
            title: '¿Estas seguro?',
            text: `Eliminar a ${participants[id - 1].name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    `¡${name} eliminado!`,
                    'success'
                )
                let toDelete = participants.splice(id - 1, 1)
                calculate()
                separateUsers()
                prestadorDeudor()
                showParticipants(participants)
                save()
            }
        })
    } else {
        let name = participants[id].name
        Swal.fire({
            title: '¿Estas seguro?',
            text: `Eliminar a ${participants[id].name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    `¡${name} eliminado!`,
                    'success'
                )
                let toDelete = participants.splice(id, 1)
                calculate()
                separateUsers()
                prestadorDeudor()
                showParticipants(participants)
                save()
            }
        })
    }

}

//Mostrar
function showParticipants(participants) {
    if (participants == '') {
        results.innerHTML = ``
        let nuevoParticipant = document.createElement("h3")
        nuevoParticipant.innerText = `No hay participantes ingresados`
        results.appendChild(nuevoParticipant)
    } else {
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
                    <button id="p.n${p.id}" class="button-1" role="button"><img src="bin.png" alt="delete" onclick="deleteParticipant(${p.id})"></button>
                </div>`
            results.appendChild(nuevoParticipant)
        }
    }
}

function showResult(total, balanceSheet, participants, porPersona) {
    let mode = localStorage.getItem("mode")
    if (mode == "restaurant"){
        const { price, tipPercentage, tipsAmount, priceWTips } = getTips()
        resultados.innerHTML = `<div id="restaurantNumbers"></div>
                                <div id="finalNumbers"></div>
                                <div id="finalParticipants"></div>
                                <div id="finalResult"></div>`
        let restaurantNumbers = document.getElementById("restaurantNumbers")
        let split = document.createElement("div")
        split.innerHTML = ` <h3>Precio sin propina: ${total} </h3>
                            <h3>Porcentaje de propina: ${tipPercentage.value}%</h3>
                            <h3>Precio con propina de ${tipPercentage.value}% : $${priceWTips} </h3>
                            <h3>Propinas: $${tipsAmount}</h3>`
        restaurantNumbers.appendChild(split)

        let finalNumbers = document.getElementById("finalNumbers")
        let numbers = document.createElement("div")
        finalNumbers.innerHTML = ` <li style="color: #252525">Total gastado: $${total.value}</li>
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
    } else {
        if (participants == '') {
            resultados.innerHTML = ''
        } else {
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
    }
}

//Modificar Nombre o Monto
function edit(array, optionStart) {
    //Cambiar a switch
    let updParticipantM = 0
    let updParticipantN = ''
    if (optionStart == 3) {
        updParticipantM = 0
        updParticipantN = ''
        let searchedName = name_monto.value
        let foundedID = array.findIndex((participante) => participante.name.toLowerCase() == searchedName.toLowerCase())
        updParticipantM = array[foundedID].amount = parseInt(new_monto.value)
        name_monto.value = '', new_monto.value = ''
    } else if (optionStart == 4) {
        updParticipantM = 0
        updParticipantN = ''
        let searchedName = old_name.value
        let foundedID = array.findIndex((participante) => participante.name.toLowerCase() == searchedName.toLowerCase())
        updParticipantN = array[foundedID].name = new_name.value
        old_name.value = '', new_name.value = ''
    }
}



//Iniciamos
let buttonAdd = document.getElementById("add")
buttonAdd.onclick = () => {
    if (nombreInput.value == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Cuidado',
            text: `Participante sin nombre`,
        })
    } else if (montoInput.value == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Cuidado',
            text: `Participante sin monto`,
        })
    } else {
        newParticipant(),
            showParticipants(participants),
            save()
    }

}

let buttonStart = document.getElementById("start")
buttonStart.onclick = () => {
    let mode = localStorage.getItem("mode")
    if (mode == "restaurant") {
        getTips(),
        calculate(),
        separateUsers(),
        prestadorDeudor(),
        showParticipants(participants),
        save()
    }
    if (participants == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Cuidado',
            text: `No hay participantes`,
        })
    } else {
        calculate(),
            separateUsers(),
            prestadorDeudor(),
            showParticipants(participants),
            save()
    }
}

let buttonNew = document.getElementById("new")
buttonNew.onclick = () => {
    getTips()
    calculate(),
            separateUsers(),
            prestadorDeudor(),
            showParticipants(participants),
            save()
    // clearEverything(),
    //     clean()
}

let buttonChangeMonto = document.getElementById("changeMonto")
buttonChangeMonto.onclick = () => {
    if (participants == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay participantes para modificar',
        })
    } else {
        edit(participants, 3),
            calculate(),
            separateUsers(),
            prestadorDeudor(),
            showParticipants(participants),
            save()
    }
}

let buttonChangeName = document.getElementById("changeName")
buttonChangeName.onclick = () => {
    if (participants == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `No hay participantes para modificar`,
        }) 
    } else {
        edit(participants, 4),
            calculate(),
            separateUsers(),
            prestadorDeudor(),
            showParticipants(participants),
            save()
    }
}


if (localStorage.getItem("participantsS") !== []) {
    participants = JSON.parse(localStorage.getItem("participantsS"))
        calculate(),
        separateUsers(participants),
        prestadorDeudor(),
        showParticipants(participants)
}


let checkBox = document.getElementById("checkbox")
checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
        localStorage.setItem("mode", "restaurant")
        textConfig.innerText = `Restaurante`
        restaurantContainer.innerHTML = `<div class="form__group field" id="priceContainer">
        <input type="number" class="form__field" placeholder="price" name="name" id="price" required />
        <label for="name" class="form__label">Precio</label>
    </div>
    <div class="form__group field" id="tipsContainer">
        <input type="number" class="form__field" placeholder="tips" name="name" id="tips" required />
        <label for="name" class="form__label">Propinas</label>
    </div>
        <h2>%</h2>`
        
    } else{
        localStorage.setItem("mode", "juntada")
        let textConfig = document.getElementById("textConfig")
        textConfig.innerText = `Juntada`
        restaurantContainer.innerHTML = ``
    }
})



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
