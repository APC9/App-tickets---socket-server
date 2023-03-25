"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const ticket_control_1 = require("../models/ticket-control");
const ticketControl = new ticket_control_1.TicketControl();
const socketController = (socket) => {
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-state', ticketControl.lastFour);
    socket.emit('pending-ticket', ticketControl.tickets.length);
    socket.on('next-ticket', (payload, callback) => {
        //const next = ticketControl.nextTicket();
        callback(ticketControl.nextTicket());
        socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);
    });
    socket.on('attend-ticket', (payload, callback) => {
        if (!payload.desk) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        ;
        const Ticket = ticketControl.attendTicket(payload.desk);
        socket.emit('pending-ticket', ticketControl.tickets.length);
        socket.emit('actual-state', ticketControl.lastFour);
        socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);
        if (!Ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }
        else {
            callback({
                ok: true,
                Ticket
            });
        }
    });
};
exports.socketController = socketController;
//# sourceMappingURL=controller.js.map