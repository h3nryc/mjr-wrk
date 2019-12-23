var token = localStorage.getItem('token');

//Recently played tracks
$.ajax({
        url: 'https://api.spotify.com/v1/me/player/recently-played?type=track&limit=5',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer "+token)
        }, success: function(data){
            for (var i = 0; i < data.items.length; i++) {
              var name = trunc(data.items[i].track.name,22)
              var artist = trunc(data.items[i].track.artists[0].name,22)
              var imgSrc = data.items[i].track.album.images[1].url
              $('.recent-ol').append('<li><img src="'+imgSrc+'" alt=""><p class="img-title">'+name+'</p><p class="img-artist">'+artist+'</p></li>');
            }
        }
})

//Recently saved tracks
$.ajax({
        url: 'https://api.spotify.com/v1/me/tracks?limit=5',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer "+token)
        }, success: function(data){
            for (var i = 0; i < data.items.length; i++) {
              var name = trunc(data.items[i].track.name,22)
              var artist = trunc(data.items[i].track.artists[0].name,22)
              var imgSrc = data.items[i].track.album.images[1].url
              $('.saved-ol').append('<li><img src="'+imgSrc+'" alt=""><p class="img-title">'+name+'</p><p class="img-artist">'+artist+'</p></li>');
            }
        }
})

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
                console.log(imgSrc);
                console.log(name);
                console.log(artist);
                $('.search-ol').append('<li><img src="'+imgSrc+'" alt=""><p class="img-title">'+name+'</p><p class="img-artist">'+artist+'</p></li>');
              }
            }
    })
  }
});

// https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
function trunc(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}
