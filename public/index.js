
const socket = io()
const chatbox = document.getElementById('chatbox')
//----------SE CREA EL "USUARIO"
let user = sessionStorage.getItem('user') || '';

if(!user) {
    
Swal.fire({
    title: 'AUTENTICACION',
    html: `
      <div>
        <p>INTRODUCIR NOMBRE</p>
        <input id="nameInput" type="text" class="swal2-input">
      </div>
      <div>
        <input id="termsCheckbox" type="checkbox">
        <label for="termsCheckbox">Acepto las reglas y condiciones</label>
        <li>Regla 1: Al aceptar lo estas haciendo bajo tu propia decision</li>
        <li>Regla 2: Aqui se puede encontrar cualquier cosa y conocer a cualquier persona</li>
        <li>Regla 3: El autor de esta aplicacion no asume la resposabilidad de los actos io acciones que usuarios le den, ya que esta aplicacion fue creada con fines de entretenimiento </li>
      
      </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const nameInput = document.getElementById('nameInput');
      const termsCheckbox = document.getElementById('termsCheckbox');
      const name = nameInput.value.trim();
      
      if (!name) {
        Swal.showValidationMessage('INGRESAR NOMBRE DE USUARIO');
      } else if (!termsCheckbox.checked) {
        Swal.showValidationMessage('Debes aceptar los términos y condiciones');
      } else {
        return name;
      }
    },
    allowOutsideClick: false
  }).then(result => {
    if (result.isConfirmed) {
      user = result.value;
      Swal.fire({
        title: 'Confirmar nombre',
        text: `¿Estás seguro de que quieres ingresar como ${user}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(confirmResult => {
        if (confirmResult.isConfirmed) {
          document.getElementById('username').innerHTML = user;
          sessionStorage.setItem("user", user);
          socket.emit('new', user);
        } else {
          user = null;
        }
      });
    }
  });
} else {
  document.getElementById('username').innerHTML = user;
  socket.emit('new', user);
  // Aquí puedes realizar otras acciones relacionadas con el usuario ya autenticado
}




//-------------ENVIAR MENSAJES----------
chatbox.addEventListener('keyup', event => {
    if(event.key === 'Enter'){
        const message = chatbox.value.trim()
        if(message.length > 0) {
            socket.emit('message', {
                user,
                message
            })

            chatbox.value = ''
        }
    }
})


//----------------RECIBIR MENSAJES------------
socket.on('logs', data =>{
    const divLogs = document.getElementById('logs')
    let messages = ''

    data.forEach(message => {
        messages = `<p><i>${message.user}</i>: ${message.message}</p>` + messages
    });

    

    divLogs.innerHTML = messages
    

})