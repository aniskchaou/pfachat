var socket,video,canvas,context;
    
      initialisation();

     $(function() {
     $('#button').click(function  () {
         navigator.getUserMedia=(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msgGetUserMedia);

          if(navigator.getUserMedia)
          {
               
               navigator.getUserMedia({video:true,audio:true},loadCam,loadCamFail);

          } 
     })
     	
     });




    


     function logger (msg) {
          $('#logger').text(msg);
     }

     function loadCam (stream) {
          video.src=window.URL.createObjectURL(stream);
          logger("cam is loading");
     }

     function loadCamFail () {
          logger("cam not connected");
     }
     function viewVideo (video,context) {
          context.drawImage(video,0,0,context.width,context.height);  
          socket.emit('stream',canvas.toDataURL("image/png", 0.1));
         
     }
     function initialisation () {
     socket=io.connect("http://127.0.0.1:3000/");
     canvas=document.getElementById("preview");
     context=canvas.getContext("2d");
     canvas.width=20;
     canvas.height=20;
     context.height=canvas.height;
     context.width=canvas.width;
     video=document.getElementById("video");    
     }



 setInterval(function(){
      viewVideo(video,context);
     },70);