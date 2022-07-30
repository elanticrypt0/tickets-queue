
// Referencias del HTML
// const lblOnline  = document.querySelector('#lblOnline');

const socket = io();

const searchParams= new URLSearchParams(window.location.search);

if( !searchParams.has('desktop') ){
    throw new Error('El el escritorio es obligatorio');
}
const desktop = searchParams.get('desktop');

btnAttend           = document.querySelector('button');
lblDesktop          = document.querySelector('h1');
lblCurrentTicket    = document.querySelector('small');
lblRemainingTickets = document.querySelector('#lblPendientes');
divAlert            = document.querySelector('.alert');

lblDesktop.innerText=`Escritorio ${desktop}`;

divAlert.style.display="none";

btnAttend.disabled=false;

socket.on('on-desktop-connect', (payload) => {

    attendTicket(payload);

});

socket.on('disconnect', (payload) => {
    
    btnAttend.disabled=true;
    attendTicket(payload);

});

btnAttend.addEventListener( 'click', () => {

    socket.emit( 'attend-ticket', { desktop }, ( payload ) => {

        attendTicket(payload);

    });

});


const attendTicket = (payload) => {

    if( payload.ticket ){
        lblCurrentTicket.innerText=payload.ticket.num;
    }

    if(payload.remainingTickets){
        lblRemainingTickets.innerText=payload.remainingTickets;
        if(payload.remainingTickets < 2) {
            divAlert.style.display="block";
            lblRemainingTickets.style.display="none";
            btnAttend.disabled=true;            
        }
    }

}