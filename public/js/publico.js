
const lblTicket1      =  document.querySelector('#lblTicket1');
const lblEscritorio1  =  document.querySelector('#lblEscritorio1');
const lblTicket2      =  document.querySelector('#lblTicket2');
const lblEscritorio2  =  document.querySelector('#lblEscritorio2');
const lblTicket3      =  document.querySelector('#lblTicket3');
const lblEscritorio3  =  document.querySelector('#lblEscritorio3');
const lblTicket4      =  document.querySelector('#lblTicket4');
const lblEscritorio4  =  document.querySelector('#lblEscritorio4');

const socket = io();
let tickets=[];

socket.on('on-public-connect',(payload) => {

    tickets=payload.lastFourTickets;
    console.log(tickets);
    showInfo();

});


const showInfo= () => {
    if(tickets[0]){
        lblTicket1.innerText='Ticket '+ tickets[0].num
        lblEscritorio1.innerText='Escritorio '+tickets[0].desktop
    
    }
    if(tickets[1]){
        lblTicket2.innerText='Ticket '+ tickets[1].num
        lblEscritorio2.innerText='Escritorio '+tickets[1].desktop
        
    }
    if(tickets[2]){
        lblTicket3.innerText='Ticket '+ tickets[2].num
        lblEscritorio3.innerText='Escritorio '+tickets[2].desktop
        
    }
    if(tickets[3]){
        lblTicket4.innerText='Ticket '+ tickets[3].num
        lblEscritorio4.innerText='Escritorio '+tickets[3].desktop
        
    }
}