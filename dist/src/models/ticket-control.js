"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketControl = exports.Ticket = void 0;
const data_json_1 = __importDefault(require("../db/data.json"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}
exports.Ticket = Ticket;
;
class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];
        this.init();
    }
    ;
    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };
    }
    ;
    init() {
        const { last, lastFour, today, tickets } = data_json_1.default;
        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.lastFour = lastFour;
        }
        else {
            this.saveDB();
        }
    }
    ;
    saveDB() {
        const dbPath = path_1.default.join(__dirname, '../db/data.json');
        fs_1.default.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }
    ;
    nextTicket() {
        this.last += 1;
        const ticket = new Ticket(this.last, '');
        this.tickets.push(ticket);
        this.saveDB();
        return 'Ticket ' + ticket.number;
    }
    ;
    attendTicket(desk) {
        //no tenemos ticket
        if (this.tickets.length === 0) {
            return null;
        }
        ;
        const ticket = this.tickets.shift(); // elimina el primer elemento del array y lo retorna
        ticket.desk = desk;
        this.lastFour.unshift(ticket); //agrega uno o más elementos al inicio del array
        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); //toma el ultimo elemento y lo elimina
        }
        this.saveDB();
        return ticket;
    }
}
exports.TicketControl = TicketControl;
;
//# sourceMappingURL=ticket-control.js.map