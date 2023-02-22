//Variables
let restaurantContainer = document.getElementById("restaurantContainer");
let priceContainer = document.getElementById("priceContainer");
let tipsContainer = document.getElementById("tipsContainer");
let results = document.getElementById("participantList");
let resultados = document.getElementById("resultados");
let nombreInput = document.getElementById("name");
let montoInput = document.getElementById("monto");
let participants = [];

//Class
class Participante {
  constructor(id, nombre, monto) {
    (this.id = id), (this.name = nombre), (this.amount = monto);
  }
}

//Agregar participante
function newParticipant() {
  const participanteNuevo = new Participante(
    participants.length,
    nombreInput.value,
    parseInt(montoInput.value)
  );
  participants.push(participanteNuevo);
  (nombreInput.value = ""), (montoInput.value = "");
}

//Propinas
function getTips() {
  let price = document.getElementById("price");
  let tipPercentage = document.getElementById("tips");
  if (localStorage.getItem("mode") == "restaurant") {
    if (tipPercentage.value == "") {
      tipPercentage.value = 0;
    }
    let tipsAmount =
      (parseInt(price.value) * parseInt(tipPercentage.value)) / 100;
    let priceWTips = parseInt(price.value) + tipsAmount;
    return { price, tipPercentage, tipsAmount, priceWTips };
  }
}

//Gráfico
function updateChart() {
  let labelChart = [];
  let colors = [
    "#3e95cd",
    "#8e5ea2",
    "#3cba9f",
    "#e8c3b9",
    "#c45850",
    "#66545E",
    "#A39193",
    "#AA6F73",
    "#EEA990",
    "#F6E0B5",
    "#33539E",
    "#7FACD6",
    "#BFB8DA",
    "#E8B7D4",
    "#A5678E",
    "#0274BD",
    "#E9E6DD",
    "#C4AD9D",
    "#252525",
    "#F57251",
  ];
  let amount = [];
  let chartPercentage = 0;
  for (let p of participants) {
    labelChart.push(p.name);
    chartPercentage += p.amount;
  }
  for (let p of participants) {
    amount.push(Math.round((p.amount / chartPercentage) * 100));
  }

  new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: labelChart,
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: colors, //Max capacity: 20
          data: amount,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "% de cuanto colocó cada participante",
      },
    },
  });
}

//Calcular
function calculate() {
  let mode = localStorage.getItem("mode");
  if (mode == "restaurant") {
    const { price, tipPercentage, tipsAmount, priceWTips } = getTips();
    const total = priceWTips;
    const sumado = participants.reduce((acc, user) => acc + user.amount, 0);
    const porPersona = priceWTips / participants.length;
    return { total, porPersona, sumado };
  } else {
    const total = participants.reduce((acc, user) => acc + user.amount, 0);
    const porPersona = total / participants.length;
    return { total, porPersona };
  }
}

//Separacion participantes
function separateUsers() {
  const { total, porPersona } = calculate();
  const prestador = participants.filter((user) => user.amount > porPersona);
  const deudor = participants.filter((user) => user.amount < porPersona);
  const prestadores = prestador.map((prestador) => ({
    ...prestador,
    deposito: prestador.amount - porPersona,
  }));
  const deudores = deudor.map((deudor) => ({
    ...deudor,
    balance: porPersona - deudor.amount,
  }));
  return { deudores, prestadores };
}

//Tipo de participante
function prestadorDeudor() {
  const { total, porPersona } = calculate();
  const { prestadores, deudores } = separateUsers();
  const balanceSheet = [];
  deudores.forEach((deudor) => {
    const name = deudor.name;
    prestadores.every((prestador) => {
      const a = prestador.name;
      if (prestador.deposito) {
        const debePagar = Math.min(prestador.deposito, deudor.balance);
        if (debePagar) {
          deudor.balance -= debePagar;
          prestador.deposito -= debePagar;
          balanceSheet.push({ name, debePagar, a });
        }
      }
      return deudor.balance;
    });
  });
  showResult(total, balanceSheet, participants, porPersona);
  return balanceSheet;
}

//Sumatoria de totales
function checkMoney() {
  const { total, porPersona, sumado } = calculate();
  const { price, tipPercentage, tipsAmount, priceWTips } = getTips();
  let status = "clean";
  if (Math.round(priceWTips) > sumado) {
    let sumadoStyle = document.getElementById("sumadoStyle");
    sumadoStyle.classList.add("errorDinero");
    Swal.fire({
      icon: "error",
      title: "Cuidado",
      text: `Falta plata, revise`,
    });
    status = "debtor";
    return { status };
  } else if (Math.round(priceWTips) < sumado) {
    let sumadoStyle = document.getElementById("sumadoStyle");
    sumadoStyle.classList.add("noErrorDinero");
    Swal.fire({
      icon: "info",
      title: "Cuidado",
      text: `Plata de mas, modifique`,
    });
    status = "extra";
    return { status };
  }
  return { status };
}

//Storage
function save() {
  localStorage.setItem("participantsS", JSON.stringify(participants));
  if (localStorage.getItem("mode") == "restaurant") {
    let price = document.getElementById("price");
    let tipPercentage = document.getElementById("tips");
    localStorage.setItem("price", price.value);
    localStorage.setItem("tipPercentage", tipPercentage.value);
  }
}

//Limpiar
function clearEverything() {
  participants = [];
  save();
  calculate();
  separateUsers();
  prestadorDeudor();
  showParticipants(participants);
}

//Eliminar
function deleteParticipant(id) {
  let index = id;
  let foundedPosition = participants.findIndex(
    (participants) => participants.id == index
  );
  let name = participants[foundedPosition].name;
  Swal.fire({
    title: "¿Estas seguro?",
    text: `Vas a eliminar a ${participants[foundedPosition].name}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Borrado!", `¡${name} eliminado/a!`, "success");
      participants.splice(foundedPosition, 1);
      save();
      calculate();
      separateUsers();
      prestadorDeudor();
      showParticipants(participants);
    }
  });
}

//Mostrar participantes
function showParticipants(participants) {
  if (participants.length == 0) {
    results.innerHTML = ``;
    document.getElementById("chartContainer").style.visibility = "hidden";
  } else {
    results.innerHTML = ``;
    let h2Participants = document.createElement("h2");
    h2Participants.innerText = `Participantes`;
    results.appendChild(h2Participants);
    document.getElementById("chartContainer").style.visibility = "visible";

    for (let p of participants) {
      let nuevoParticipant = document.createElement("div");
      nuevoParticipant.innerHTML = `
                <div class="participantsDescription" id="${p.id}">
                    <h3>${p.name}</h3>
                    <h3>$${p.amount}</h3>
                    <button id="e.n${p.id}" class="button4" role="button"><img src="edit.png" alt="delete" onclick="editModal(${p.id})"></button>
                    <button id="p.n${p.id}" class="button5" role="button"><img src="bin.png" alt="delete" onclick="deleteParticipant(${p.id})"></button>
                </div>`;
      results.appendChild(nuevoParticipant);
    }
  }
}

//Mostrar resultados numéricos
function showResult(total, balanceSheet, participants, porPersona) {
  resultados.innerHTML = `<div id="modePresentation"></div>
                            <div id="restaurantNumbers"></div>
                            <div id="finalNumbers"></div>
                            <div id="finalParticipants"></div>
                            <div id="finalResult"></div>`;
  let mode = localStorage.getItem("mode");
  if (mode == "restaurant") {
    if (participants.length == 0) {
      resultados.innerHTML = "";
    } else {
      let modePresentation = document.getElementById("modePresentation");

      let h2Restaurant = document.createElement("h2");
      h2Restaurant.innerText = `Restaurante`;
      modePresentation.appendChild(h2Restaurant);

      const { total, porPersona, sumado } = calculate();
      const { price, tipPercentage, tipsAmount, priceWTips } = getTips();

      let restaurantResume = document.createElement("div");
      restaurantResume.innerHTML = ` <h3>Precio sin propina: $${price.value} </h3>
            <h3>Porcentaje de propina: ${tipPercentage.value}%</h3>
            <h3>Propinas: $${tipsAmount}</h3>
            <h3>Precio + propinas: $${priceWTips} </h3>`;
      restaurantNumbers.appendChild(restaurantResume);

      let finalNumbers = document.getElementById("finalNumbers");
      let numbers = document.createElement("div");
      finalNumbers.innerHTML = ` <li id="sumadoStyle">Total sumado: $${sumado}</li>
                <li>Total participantes: ${participants.length}</li>
                <li>Monto por persona: $${Math.round(porPersona)}</li>`;
      finalNumbers.appendChild(numbers);

      let finalParticipants = document.getElementById("finalParticipants");
      let h2Participants = document.createElement("h2");
      h2Participants.innerText = `Nombres`;
      finalParticipants.appendChild(h2Participants);
      for (let p of participants) {
        let nuevoParticipant = document.createElement("li");
        nuevoParticipant.innerText = `${p.name}`;
        finalParticipants.appendChild(nuevoParticipant);
      }

      let finalResult = document.getElementById("finalResult");
      finalResult.innerHTML = "";
      checkMoney();

      const { status } = checkMoney();
      if (status == "debtor") {
        let h3Result = document.createElement("h3");
        h3Result.innerText = `Falta plata`;
        h3Result.classList.add("errorDinero");
        finalResult.appendChild(h3Result);
      } else if (status == "extra") {
        let h3Result = document.createElement("h3");
        h3Result.classList.add("noErrorDinero");
        h3Result.innerText = `Plata de mas`;
        finalResult.appendChild(h3Result);
      } else {
        if (balanceSheet == "") {
          let h3Result = document.createElement("h3");
          h3Result.innerText = `No se debe`;
          finalResult.appendChild(h3Result);
        } else {
          let h3Result = document.createElement("h3");
          h3Result.innerText = `Resultados`;
          finalResult.appendChild(h3Result);
          for (let p of balanceSheet) {
            let nuevoResultado = document.createElement("h3");
            nuevoResultado.innerText = `${p.name} debe pagar: $${Math.round(
              p.debePagar
            )} a ${p.a}`;
            finalResult.appendChild(nuevoResultado);
          }
        }
      }
    }
  } else {
    if (participants.length == 0) {
      resultados.innerHTML = "";
    } else {
      let modePresentation = document.getElementById("modePresentation");

      let h2Juntada = document.createElement("h2");
      h2Juntada.innerText = `Juntada`;
      modePresentation.appendChild(h2Juntada);

      let restaurantNumbers = document.getElementById("restaurantNumbers");
      restaurantNumbers.remove();
      let finalNumbers = document.getElementById("finalNumbers");
      let numbers = document.createElement("div");
      finalNumbers.innerHTML = ` <li>Total gastado: $${total}</li>
                                       <li>Total participantes: ${
                                         participants.length
                                       }</li>
                                       <li>Monto por persona: $${Math.round(
                                         porPersona
                                       )}</li>`;
      finalNumbers.appendChild(numbers);

      let finalParticipants = document.getElementById("finalParticipants");
      let h2Participants = document.createElement("h2");
      h2Participants.innerText = `Participantes`;
      finalParticipants.appendChild(h2Participants);
      for (let p of participants) {
        let nuevoParticipant = document.createElement("li");
        nuevoParticipant.innerText = `${p.name}`;
        finalParticipants.appendChild(nuevoParticipant);
      }

      let finalResult = document.getElementById("finalResult");
      finalResult.innerHTML = "";
      if (balanceSheet == "") {
        let h3Result = document.createElement("h3");
        h3Result.innerText = `No se debe`;
        finalResult.appendChild(h3Result);
      } else {
        let h3Result = document.createElement("h3");
        h3Result.innerText = `Resultados`;
        finalResult.appendChild(h3Result);
        for (let p of balanceSheet) {
          let nuevoResultado = document.createElement("h3");
          nuevoResultado.innerText = `${p.name} debe pagar: $${Math.round(
            p.debePagar
          )} a ${p.a}`;
          finalResult.appendChild(nuevoResultado);
        }
      }
    }
  }
  updateChart();
}

//Refresh nav modal
function refreshNav() {
  let closeName = document.getElementById("closeName");
  closeName.innerHTML = `<span class="close">&times;</span>`;
}

//Modal
function modal(name, amount) {
  refreshNav();
  let closeName = document.getElementById("closeName");
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var span = document.getElementsByClassName("close")[1];
  span.onclick = function () {
    modal.style.display = "none";
    refreshNav();
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  let nameANDamount = document.createElement("h2");
  nameANDamount.innerText = `${name}  $${amount}`;
  closeName.appendChild(nameANDamount);
}

//Modificar nombres/monto
function editModal(id) {
  let index = id;
  let foundedPosition = participants.findIndex(
    (participants) => participants.id == index
  );
  let name = participants[id].name;
  let amount = participants[id].amount;

  modal(name, amount);

  let new_monto = document.getElementById("new_monto");
  let new_name = document.getElementById("new_name");

  let buttonChangeMonto = document.getElementById("changeMonto");
  buttonChangeMonto.onclick = () => {
    participants[foundedPosition].amount = parseInt(new_monto.value);
    new_monto.value = "";
    editModal(id);
    calculate(),
      separateUsers(),
      prestadorDeudor(),
      showParticipants(participants),
      save();
  };

  let buttonChangeName = document.getElementById("changeName");
  buttonChangeName.onclick = () => {
    participants[foundedPosition].name = new_name.value;
    new_name.value = "";
    editModal(id);
    calculate(),
      separateUsers(),
      prestadorDeudor(),
      showParticipants(participants),
      save();
  };
}

//Modal consumo de JSON
function modalPreviousSplits() {
  let closeName = document.getElementById("closeModal");
  var modal = document.getElementById("previousModal");
  modal.style.display = "block";
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

//Funciones async para carga de JSON
async function writeSplits() {
  let splitContainer = document.getElementById("splitContainer");
  splitContainer.innerHTML = "";
  fetch("previousSplits.json")
    .then((response) => response.json())
    .then((json) => {
      for (let previousSplit of json) {
        mode = previousSplit.mode;
        mode == "restaurant" ? (mode = "Restaurante") : (mode = "Juntada");
        let split = document.createElement("div");
        split.classList.add("split");
        split.innerHTML = `
                <button class="buttonSplit" id="splitN${previousSplit.splitID}" role="button" onclick="loadSplits(${previousSplit.splitID})">
                    <h3>${mode}</h3>
                    <h3>${previousSplit.participants.length}</h3>
                    <h3>$${previousSplit.porPersona}</h3>
                </button>`;
        splitContainer.appendChild(split);
      }
    });
}

async function loadSplits(id) {
  fetch("previousSplits.json")
    .then((response) => response.json())
    .then((json) => {
      let index = id;
      let foundedPosition = json.findIndex((json) => json.splitID == index);
      let splitID = json[foundedPosition].splitID;
      let splitParticipants = json[foundedPosition].participants;
      let splitPrice = json[foundedPosition].price;
      let splitTipPercentage = json[foundedPosition].tipPercentage;
      let splitmode = json[foundedPosition].mode;
      splitmode == "juntada"
        ? (splitmode = "Juntada")
        : (splitmode = "Restaurante");
      let splitPorPersona = json[foundedPosition].porPersona;
      Swal.fire({
        title: "¿Cargar esta división?",
        text: `${splitmode} entre ${splitParticipants.length} $${splitPorPersona}c/u`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Cargar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Cargado!", ``, "success");
          var modal = document.getElementById("previousModal");
          modal.style.display = "none";
          setParameters(
            splitParticipants,
            splitPrice,
            splitTipPercentage,
            splitmode,
            splitPorPersona
          );
        } else {
        }
      });
    });
}

async function setParameters(
  splitParticipants,
  splitPrice,
  splitTipPercentage,
  splitmode,
  splitPorPersona
) {
  participants = splitParticipants;
  splitmode == "Juntada" ? (splitmode = "juntada") : (splitmode = "restaurant");
  localStorage.setItem("mode", splitmode);
  let checkBox = document.getElementById("checkbox");
  localStorage.getItem("mode") == "restaurant"
    ? (checkBox.checked = true)
    : (checkBox.checked = false);
  changeMode();
  if (splitmode == "restaurant") {
    let price = document.getElementById("price");
    let tipPercentage = document.getElementById("tips");
    price.value = splitPrice;
    tipPercentage.value = splitTipPercentage;
  }
  calculate(),
    separateUsers(),
    prestadorDeudor(),
    showParticipants(participants),
    save();
}

//Change mode
function changeMode() {
  let checkBox = document.getElementById("checkbox");
  if (checkBox.checked) {
    localStorage.setItem("mode", "restaurant");
    textConfig.innerText = `Restaurante`;
    restaurantContainer.innerHTML = `<div class="form__group field" id="priceContainer">
        <input type="number" class="form__field" placeholder="price" name="name" id="price" required />
        <label for="name" class="form__label">Precio</label>
        </div>
        <div class="form__group field" id="tipsContainer">
        <input type="number" class="form__field" placeholder="tips" name="name" id="tips" required />
        <label for="name" class="form__label">Propinas</label>
        </div>
        <h2>%</h2>`;
  } else {
    localStorage.setItem("mode", "juntada");
    let textConfig = document.getElementById("textConfig");
    textConfig.innerText = `Juntada`;
    restaurantContainer.innerHTML = ``;
  }
}

//Botones
let buttonAdd = document.getElementById("add");
buttonAdd.onclick = () => {
  if (nombreInput.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Cuidado",
      text: `Participante sin nombre`,
    });
  } else if (montoInput.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Cuidado",
      text: `Participante sin monto`,
    });
  } else {
    newParticipant(), showParticipants(participants), save();
  }
};

let buttonStart = document.getElementById("start");
buttonStart.onclick = () => {
  let mode = localStorage.getItem("mode");
  if (mode == "restaurant") {
    let price = document.getElementById("price");
    if (price.value == 0) {
      Swal.fire({
        icon: "warning",
        title: "Cuidado",
        text: `No ingresó precio`,
      });
    } else {
      getTips(),
        calculate(),
        separateUsers(),
        prestadorDeudor(),
        showParticipants(participants),
        save();
      if (participants == "") {
        Swal.fire({
          icon: "warning",
          title: "Cuidado",
          text: `No hay participantes`,
        });
      } else {
        calculate(),
          separateUsers(),
          prestadorDeudor(),
          showParticipants(participants),
          save();
      }
    }
  } else {
    if (participants == "") {
      Swal.fire({
        icon: "warning",
        title: "Cuidado",
        text: `No hay participantes`,
      });
    } else {
      calculate(),
        separateUsers(),
        prestadorDeudor(),
        showParticipants(participants),
        save();
    }
  }
};

let buttonNew = document.getElementById("new");
buttonNew.onclick = () => {
  Swal.fire({
    title: "¿Guardar esta dvisión?",
    text: `Se almacenará en el documento JSON`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Guardar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Guardada!", ``, "success");
      clearEverything();
    } else {
      clearEverything();
    }
  });
};

let buttonPrevious = document.getElementById("previous");
buttonPrevious.onclick = () => {
  modalPreviousSplits(), writeSplits();
};

let checkBox = document.getElementById("checkbox");
checkBox.addEventListener("change", () => {
  changeMode();
});

//Reload
if (localStorage.getItem("mode") == "restaurant") {
  checkBox.checked = true;
  textConfig.innerText = `Restaurante`;
  restaurantContainer.innerHTML = `<div class="form__group field" id="priceContainer">
            <input type="number" class="form__field" placeholder="price" name="name" id="price" required />
            <label for="name" class="form__label">Precio</label>
        </div>
        <div class="form__group field" id="tipsContainer">
            <input type="number" class="form__field" placeholder="tips" name="name" id="tips" required />
            <label for="name" class="form__label">Propinas</label>
        </div>
        <h2>%</h2>`;
}

participants = JSON.parse(localStorage.getItem("participantsS"));
if (participants == undefined) {
  participants = [];
  localStorage.setItem("price", 0);
  localStorage.setItem("tipPercentage", 0);
  localStorage.setItem("mode", "juntada");
  document.getElementById("chartContainer").style.visibility = "hidden";
}
if (participants.length !== 0 && localStorage.getItem("mode") == "juntada") {
  calculate(),
    separateUsers(),
    prestadorDeudor(),
    showParticipants(participants),
    save();
} else if (
  participants.length !== 0 &&
  localStorage.getItem("mode") == "restaurant"
) {
  let price = document.getElementById("price");
  let tipPercentage = document.getElementById("tips");
  price.value = localStorage.getItem("price");
  tipPercentage.value = localStorage.getItem("tipPercentage");
  calculate(),
    separateUsers(),
    prestadorDeudor(),
    showParticipants(participants),
    save();
}
