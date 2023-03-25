import json from '../db/data.json';
import path from 'path';
import fs from 'fs';

export class Ticket {
  public number: number;
  public desk: string;
  
  constructor( number: number, desk: string){
    this.number = number;
    this.desk = desk;
  }
};


export class TicketControl{

    public last: number;  
    private today: number;
    public tickets: any[];
    public lastFour: number[];

    constructor (){
      this.last = 0;
      this.today = new Date().getDate();
      this.tickets = [];
      this.lastFour = [];

      this.init();
    };

    get toJson(){
      return{
        last: this.last,
        today: this.today,
        tickets: this.tickets,
        lastFour: this.lastFour  
      }
    };

    init(){
      const {last, lastFour, today, tickets} = json;
      if( today === this.today){
        this.tickets = tickets;
        this.last = last;
        this.lastFour = lastFour;
      }else{
        this.saveDB()
      }
    };

    saveDB(){
      const dbPath = path.join( __dirname, '../db/data.json')
      fs.writeFileSync( dbPath, JSON.stringify(this.toJson) );
    };

    nextTicket(){
      this.last += 1;
      const ticket = new Ticket( this.last, '');
      this.tickets.push(ticket);

      this.saveDB();
      return 'Ticket ' + ticket.number
    };

    attendTicket( desk: string ){
      //no tenemos ticket
      if(  this.tickets.length === 0 ){
        return null;
      };

      const ticket = this.tickets.shift(); // elimina el primer elemento del array y lo retorna
      ticket.desk = desk;
      this.lastFour.unshift(ticket);//agrega uno o más elementos al inicio del array

      if( this.lastFour.length > 4){
        this.lastFour.splice(-1, 1)//toma el ultimo elemento y lo elimina
      }
      this.saveDB();
      return ticket;
    }

};
