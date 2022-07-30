const TicketControl = require("../models/ticket-control");

const ticketControl=new TicketControl();

const socketController = (socket) => {
    
    
    
    updateRemainingTickets(socket);

    updateLastFourTickets(socket);
    
    socket.emit('on-connect', 'Ticket ' + ticketControl.lastTurn);
    

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('next-ticket', ( payload, callback ) => {
        
        const nextTurn= ticketControl.nextTicket();
        callback(nextTurn);
        //TODO: notificar que hay un nuevo ticket pendiente.
            
    });

    socket.on('ticket-on-desktop',(payload,callback) => {
        
    });

    socket.on('attend-ticket',({desktop},callback)=>{
        
        if(!desktop){
            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            });
        }
                
        const ticket = ticketControl.attentionTicket(desktop);

        const remainingTickets=ticketControl.tickets.length;

        updateLastFourTickets(socket);
        updateRemainingTickets(socket);

        if ( !ticket ){
            callback({
                ok:false,
                msg:'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok:true,
                ticket,
                remainingTickets
            });
        }
    });

}


const updateLastFourTickets= (socket) => {
    socket.broadcast.emit('on-public-connect', {
        lastFourTickets:ticketControl.lastFourTickets
    });
    
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

}

const updateRemainingTickets = (socket) => {
    socket.broadcast.emit('on-desktop-connect', {
        "remainingTickets":ticketControl.tickets.length
    });
}


module.exports = {
    socketController
}

