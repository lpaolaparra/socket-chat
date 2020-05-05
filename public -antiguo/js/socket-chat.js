var socket = io();

//leer los parametros de la URL

var params = new URLSearchParams( window.location.search);

    if( !params.has('nombre') || !params.has('sala')){

        window.location = 'index.html';
        throw new Error ('El nombre y sala  son necesario');
    }

    var usuario ={
        nombre: params.get('nombre'),
        sala: params.get('sala')
    }

socket.on('connect', function() {

    console.log('Me conecte al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
        
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//escuchar cambios de usuarios
//cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});

//mensjae privados
socket.on('mensajePrivado', function(mensaje){
    console.log('mensaje privado',mensaje);
})