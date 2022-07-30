
const lblNuevoTicket=document.querySelector('#lblNuevoTicket');
const btnCrear= document.querySelector('button');


const socket = io();

socket.on('on-connect', payload => {
    
    lblNuevoTicket.innerText=payload;

});

socket.on('disconnect', () => {
    
    btnCrear.disabled=true;

});


btnCrear.addEventListener( 'click', () => { 
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText=ticket;
    });

});