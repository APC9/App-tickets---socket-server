const lblDesk = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const lblPendientes = document.querySelector('#lblPendientes');
const divAlert = document.querySelector('.alert');
const btnAttend = document.querySelector('button');

const searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has('escritorio') ){
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
}

const desk = searchParams.get('escritorio');
lblDesk.innerText = desk;


divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAttend.disabled = true;
});


socket.on('pending-ticket', payload => {
  lblPendientes.innerText = payload !== 0? payload : '';
  if(payload !== 0){
    divAlert.style.display = 'none';
  }
});


btnAttend.addEventListener( 'click', () => {

  socket.emit('attend-ticket', { desk }, ({Ticket, ok, msg})=>{
    if(!ok){
      lblTicket.innerText = 'Nadie'
      return divAlert.style.display = '';
    };
    
    lblTicket.innerText = 'Ticket ' + Ticket.number;
  });
  
  
});

