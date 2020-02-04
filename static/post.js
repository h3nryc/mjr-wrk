var token = localStorage.getItem('token');
var post = new PostHandler();


//Displays suggested songs
var reqs = [{url: 'https://api.spotify.com/v1/me/player/recently-played?type=track&limit=5',elm: '.recent-ol'},{url: 'https://api.spotify.com/v1/me/tracks?limit=5',elm: '.saved-ol'}];
for (var y = 0; y < reqs.length; y++) {
  $.ajax({
          url: reqs[y].url,
          beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer "+token)
          }, success: function(data){
              for (var i = 0; i < data.items.length; i++) {
                var name = trunc(data.items[i].track.name,22)
                var artist = trunc(data.items[i].track.artists[0].name,22)
                var imgSrc = data.items[i].track.album.images[1].url
                var id = data.items[i].track.id
                if ($('.recent-ol').children().length < 5) {
                  $('.recent-ol').append('<li onclick="pickToPost(); post.displayPic(\'' + name + '\',\'' + artist + '\',\'' + imgSrc + '\',\'' + id + '\');"><img src="'+imgSrc+'" alt=""><p class="img-title">'+name+'</p><p class="img-artist">'+artist+'</p></li>')
                }else{
                  $('.saved-ol').append('<li onclick="pickToPost(); post.displayPic(\'' + name + '\',\'' + artist + '\',\'' + imgSrc + '\',\'' + id + '\');"><img src="'+imgSrc+'" alt=""><p class="img-title">'+name+'</p><p class="img-artist">'+artist+'</p></li>');
                }
              }
          }
  })
}
//Searh functionality
$('.search-box').on('input', function() {
  if ($('.search-box').val() == "") {
    console.log(1);
    $('.search-ol').empty();
  }else{
    $.ajax({
            url: 'https://api.spotify.com/v1/search?q='+$('.search-box').val()+'&type=track&limit=5',
            beforeSend: function(xhr) {
                 xhr.setRequestHeader("Authorization", "Bearer "+token)
            }, success: function(data){
              $('.search-ol').empty();
              for (var i = 0; i < data.tracks.items.length; i++) {
                var name = trunc(data.tracks.items[i].name,22)
                var artist = trunc(data.tracks.items[i].artists[0].name,22)
                var imgSrc = data.tracks.items[i].album.images[1].url
                var id = data.tracks.items[i].id
                $('.search-ol').append('<li onclick="pickToPost(); post.displayPic(\'' + name + '\',\'' + artist + '\',\'' + imgSrc + '\',\'' + id + '\');"><img src="'+imgSrc+'" alt=""><p class="img-title">'+name+'</p><p class="img-artist">'+artist+'</p></li>');
              }
            }
    })
  }
});


//Animations
function pickToPost() {
    $( ".offscreen" ).animate({
      right: "200px",
      position: 'absolute'
    }, 1500 );

    $( ".onscreen" ).animate({
      left: "2000px",
      position: 'absolute'
    }, 1500 );

    $('.offscreen').show();
    $('.onscreen').fadeOut(100)
    $('.offscreen').css("position", "absolute");
    $('.offscreen').css("top", "60px");
    $('.offscreen').css("right", "700px");

}

function postToPick() {
  $( ".offscreen" ).animate({
    right: "1000px",
    position: 'absolute'
  }, 1500 );

  $( ".onscreen" ).animate({
    left: "0px",
    position: 'absolute'
  }, 1500 );
  $('.onscreen').toggle();
  $('.offscreen').hide(10);
  $('textarea').val('')
      $('.picked-song').empty();
}

// https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
function trunc(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

function navProfile() {
  var cUser = null;
  socket.emit('isMe', token,cUser , function(res){
    window.location = "/user/"+res[1];
  });
}
