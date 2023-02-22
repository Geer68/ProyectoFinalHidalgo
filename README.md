# Cuentas claras

Cuentas claras está desarrollado con JavaScript, HTML y CSS (SCSS) con el propósito de ayudarte al momento de dividir esas cuentas complicadas con amigos.

## Descripción de uso

El usuario es capaz de seleccionar el modo de uso (juntada o restaurante), cargar los participantes que aportan a esta cuenta, editar sus montos, nombres o incluso eliminarlos. Una vez realizado el cálculo puede visualizar los resultados de la cuenta

Al abrir en PC o pantallas superiores de 1024px se agrega un gráfico de "anillos" interactivo para visualizar porcentajes con posibilidades de "suprimir" participantes.

## Descripción del código

La función `calculate()` es la que inicia todo el proceso de clasificar a los participantes ingresados por el usuario recibiendo el precio o la sumatoria de los montos, `separateUsers()` los separa en "deudor" o "prestador" de dinero, `prestadorDeudor()` se encarga de crear un array de resultados.

Para la parte de modificación/eliminación de los usuarios, cada botón generado en el DOM cuenta con el evento y su parámetro correspondiente (id de participante). Tanto `deleteParticipant(id)` como `editModal(id)` buscan este id en el array *participants*, permiten la eliminación del participante o su cambio de nombre/monto mediante inputs que actualizan el array principal *participants*.

Para mostrar los resultados de esta división se divide en 2 partes:
1. Mostrar los resultados "numéricos"
2. Mostrar el listado de participantes

Para los resultados numéricos se implementa `showResult(total, balanceSheet, participants, porPersona)` llamada por `prestadorDeudor()` que modifica el DOM en base a los parámetros recibidos. 
Para el listado de participantes se implementa la función `showParticipants(participants)` que recibe como parámetro el array principal *participants*.

Por cada modificación/eliminación/creación de usuario estas funciones son llamadas nuevamente para actualizar el array *participants* y volver a calcular el estado de cada participante.

## Funciones asincrónicas

`writeSplits()` consume el archivo JSON para generar los botones al usuario con los datos y la función loadSplits(id) con el id de la división previa a cargar. `loadSplits(id)` también consume el archivo JSON para "settear" todos los datos que este contiene como parámetros para la función `setParameters()`.

### Clase participante

La **clase Participante** tiene un método constructor con 3 atributos (id, nombre y monto).

### Otras funciones

`updateChart()` encargada de crear y posteriormente actualizar todos los datos del grafico de anillo.

`checkMoney()` en caso de seleccionar el modo "Restaurante" corrobora que la sumatoria de los montos coincida con el precio a pagar, en caso de no coincidir se utiliza Sweet Alert para notificar al usuario.

`save()` encargada de modificar el localStorage, se reutiliza a lo largo del cálculo y al momento de realizar una nueva división.

`modal (name, amount)` llamada por la función `editModal(id)` levanta un modal con el nombre y el monto del participante a ser editado. Para refrescar la parte superior del modal se usa `refreshNav()`.

`modalPreviousSplits()` encargada de cerrar el modal levantado por las funciones asincrónicas.

