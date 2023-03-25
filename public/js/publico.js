const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('actual-state', (payload) => {
  const audio = new Audio('./audio/new-ticket.mp4');
  audio.play()

  lblTicket1.innerText = payload.length >= 1 ? 'Ticket ' + payload[0].number: 'Ticket'; 
  lblEscritorio1.innerText = payload.length >= 1 ? payload[0].desk: 'Escritorio';
  
  lblTicket2.innerText = payload.length >= 2 ? 'Ticket ' + payload[1].number: 'Ticket'; 
  lblEscritorio2.innerText = payload.length >= 2 ? payload[1].desk: 'Escritorio';
  
  lblTicket3.innerText = payload.length >= 3 ? 'Ticket ' + payload[2].number: 'Ticket'; 
  lblEscritorio3.innerText = payload.length >= 3 ? payload[2].desk: 'Escritorio';

  lblTicket4.innerText = payload.length >= 4 ?'Ticket ' + payload[3].number: 'Ticket'; 
  lblEscritorio4.innerText = payload.length >= 4 ?payload[3].desk: 'Escritorio';

});
