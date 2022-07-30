const path = require('path');
const fs   = require('fs');


class Ticket{
    constructor(numOrder, desktop){
        this.num=numOrder;
        this.desktop=desktop;
    }
}


class TicketControl{

    constructor(){

        this.lastTurn         = 0,
        this.presentDay       = new Date().getDate();
        this.tickets          = [];
        this.lastFourTickets  = [];

        this.init();

    }

    get toJson(){

        return {
            lastTurn        : this.lastTurn,
            presentDay      : this.presentDay,
            tickets         : this.tickets,
            lastFourTickets : this.lastFourTickets
        }

    }

    init(){
        const {lastTurn,presentDay,tickets,lastFourTickets}=require('../db/data.json');
        if( presentDay===this.presentDay ){
            this.lastTurn=lastTurn;
            this.tickets=tickets;
            this.lastFourTickets=lastFourTickets;
        }else{
            this.saveIntoDB();
        }

    }


    saveIntoDB(){
        const dbPath=path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson) );
    }


    nextTicket(){
        
        this.lastTurn+=1;
        this.tickets.push(new Ticket(this.lastTurn,null));
        
        this.saveIntoDB();

        return 'Ticket '+this.lastTurn;

    }

    attentionTicket(desktop){

        if(this.tickets.length===0) return null;

        const ticket=this.tickets.shift();
        ticket.desktop=desktop;

        this.lastFourTickets.unshift( ticket );

        if(this.lastFourTickets.length > 4) this.lastFourTickets.splice(-1,1);

        this.saveIntoDB();

        return ticket;

    }



}

module.exports = TicketControl;