import socketIO from 'socket.io';
import { TicketControl } from '../models/ticket-control';

const ticketControl = new TicketControl();

export const socketController = ( socket: socketIO.Socket) =>{

  socket.emit('last-ticket', ticketControl.last);
  socket.emit('actual-state', ticketControl.lastFour);
  socket.emit('pending-ticket', ticketControl.tickets.length);


  socket.on('next-ticket', (payload, callback)=>{
    //const next = ticketControl.nextTicket();
    callback( ticketControl.nextTicket() );
    socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);
  });

  socket.on('attend-ticket', (payload, callback)=>{
    if( !payload.desk){
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio'
      })
    };

    const Ticket = ticketControl.attendTicket(payload.desk);
    
    socket.emit('pending-ticket', ticketControl.tickets.length);
    socket.emit('actual-state', ticketControl.lastFour);
    socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);

    if( !Ticket ){
      return callback({
        ok: false,
        msg: 'Ya no hay tickets pendientes'
      })
    }else{
      callback({
        ok: true,
        Ticket
      })
    }

  });

}
