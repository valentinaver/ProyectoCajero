var cuentas = [
  { nombre: "Mali", username: "mali123", password: "123", saldo: 200, movimientos: [] },
  { nombre: "Gera", username: "gera456", password: "456", saldo: 290, movimientos: [] },
  { nombre: "Maui", username: "maui789", password: "789", saldo: 67, movimientos: [] }
];
var cuentaSeleccionada = null;

function iniciarSesion() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  cuentaSeleccionada = cuentas.find(function(cuenta) {
    return cuenta.username === username && cuenta.password === password;
  });

  if (cuentaSeleccionada) {
    document.getElementById("login").style.display = "none";
    document.getElementById("operaciones").style.display = "block";
    document.getElementById("nombreCuenta").textContent = cuentaSeleccionada.nombre;

    // Mostrar el saldo actual y número de cuenta
    mostrarSaldo();
    // Mostrar el historial de movimientos
    mostrarMovimientos();
    // Mostrar la fecha y hora actualizada cada segundo
    mostrarFechaHora();
  } else {
    alert("Credenciales incorrectas. Inténtalo nuevamente.");
  }
}

function realizarOperacion(tipo) {
  var monto = parseInt(document.getElementById("monto").value);
  if (isNaN(monto) || monto < 1) {
    alert("El monto ingresado no es válido.");
    return;
  }

  if (tipo === 'ingreso') {
    if (cuentaSeleccionada.saldo + monto > 990) {
      alert("No puedes ingresar más de $990. Intenta con un monto menor.");
      return;
    }

    cuentaSeleccionada.saldo += monto;
    alert("Monto ingresado: $" + monto + "\nNuevo saldo: $" + cuentaSeleccionada.saldo);
  } else if (tipo === 'retiro') {
    if (cuentaSeleccionada.saldo - monto < 10) {
      alert("No puedes retirar más de tu saldo actual o dejar menos de $10 en la cuenta.");
      return;
    }

    cuentaSeleccionada.saldo -= monto;
    alert("Monto retirado: $" + monto + "\nNuevo saldo: $" + cuentaSeleccionada.saldo);
  }

  // Agregar el movimiento al historial
  var movimiento = {
    tipo: tipo === 'ingreso' ? "Income" : "Pull out",
    monto: monto,
    fecha: new Date()
  };
  cuentaSeleccionada.movimientos.push(movimiento);

  // Actualizar el saldo en el banner
  mostrarSaldo();
  // Actualizar el historial de movimientos
  mostrarMovimientos();
}

function cerrarSesion() {
  cuentaSeleccionada = null;
  document.getElementById("login").style.display = "block";
  document.getElementById("operaciones").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// Función para mostrar el saldo actual, número de cuenta y fecha y hora en tiempo real
function mostrarSaldo() {
  var saldoActual = document.getElementById('saldoActual');
  saldoActual.textContent = "Account balance: $" + cuentaSeleccionada.saldo.toFixed(2);

  var numCuenta = document.getElementById('numCuenta');
  numCuenta.textContent = "Account Number: " + obtenerNumeroCuenta(cuentaSeleccionada.nombre.toLowerCase());

  var fechaHora = document.getElementById('fechaHora');
  var date = new Date();
  var fecha = date.toLocaleDateString();
  var hora = date.toLocaleTimeString();
  fechaHora.textContent = "Date and time: " + fecha + " " + hora;
}

// Función para mostrar el historial de movimientos
function mostrarMovimientos() {
  var historialMovimientos = document.getElementById('historialMovimientos');
  historialMovimientos.innerHTML = "";

  for (var i = 0; i < cuentaSeleccionada.movimientos.length; i++) {
    var movimiento = cuentaSeleccionada.movimientos[i];
    var movimientoElement = document.createElement('li');
    movimientoElement.textContent = `${movimiento.tipo}: $${movimiento.monto.toFixed(2)} (${movimiento.fecha})`;
    historialMovimientos.appendChild(movimientoElement);
  }
}

// Función auxiliar para obtener el número de cuenta según el nombre de la cuenta
function obtenerNumeroCuenta(nombreCuenta) {
  // Ejemplo de números de cuenta para las tres personas
  var cuentas = {
    mali: "1234567890",
    gera: "0987654321",
    maui: "9876543210"
  };

  return cuentas[nombreCuenta];
}
