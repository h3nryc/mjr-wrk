var socket = io.connect('http://localhost:3000');
function PostHandler() {

  this.token = localStorage.getItem('token');
  this.cPost = {
    user: null,
    time: null,
    songId: null,
    token: this.token,
    sName: null,
    sArtist: null,
    sImage: null,
    desc: null,
    dp: null,
    mood: null
  };

  this.displayPic = function (name,artist,img,id) {
    this.cPost.sName = name;
    this.cPost.sArtist = artist;
    this.cPost.sImage = img;
    this.cPost.id = id;
    console.log(this.cPost);

    $('.picked-song').append('<li><img src="'+img+'" alt=""><p class="img-title">'+name+'</p><p class="img-artist">'+artist+'</p></li>')
  }

  this.submitPost = function () {
    console.log(1);
    var ts = Math.round((new Date()).getTime() / 1000);
    this.cPost.mood = $('input[name=radio]:checked', '#mood').val();
    this.cPost.desc = $('.desc-input').val();
    this.cPost.time = ts;
    socket.emit('post', this.cPost);
    alert('Posted!')
    window.location = "http://localhost:3000/";
  }

}
