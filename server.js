var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);

users=[];
connections=[];

server.listen(process.env.PORT||3000);

console.log('server is running ...');

app.get('/',function  (req,res) {
 res.sendFile(__dirname+'/index.html');
});


io.sockets.on('connection',function(socket){

   socket.on('stream',function (image) {
    
    socket.broadcast.emit('stream',image);
  });



    socket.on('drawClick', function(data) {
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });




connections.push(socket);
console.log('connected : %s sockets',connections.length);



socket.on('disconnect',function(data){
	if (!socket.username) return;
	users.splice(users.indexOf(socket),1);
connections.splice(connections.indexOf(socket),1);
updateusers();
console.log('disconnected :%s connected',connections.length);



});

socket.on('send message',function(data){
      console.log(data);
    io.sockets.emit('new message',{msg:data,user:socket.username});

});


socket.on('new user',function(data,callback){
      callback(true);
    socket.username=data;
    users.push(socket.username);
    updateusers();

});




function updateusers () {
	io.sockets.emit('get users',users);
}
})