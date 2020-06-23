var socket = io.connect('http://localhost:3000/');
token = localStorage.getItem('token');

//Retrives the user's notifcation from the database using the spotify API Token.
socket.emit('getNotif', token, function(res){
  console.log(res);
  for (var i = 0; i < res.length; i++) {
    var id = res[i].emitter;
    var post = res[i].post;
    var displayName = res[i].displayName;
    if (res[i].reason == "like") {
      var pp = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png";
      $('#notif-ul').append('<li><img src="'+pp+'" class="avatar"> <span><a class="usr-link" href="/user/'+id+'"><span class="bold">'+displayName+'</span></a> liked your <a href="http://localhost:3000/post/'+post+'">post</a></span></li>')
    }else{
      var pp = "https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png";
      $('#notif-ul').append('<li><img src="'+pp+'" class="avatar"> <span><a class="usr-link" href="/user/'+id+'"><span class="bold">'+displayName+'</span></a> followed you!</a></span></li>')
    }
  }
});
