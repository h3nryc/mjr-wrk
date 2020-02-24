var socket = io.connect('http://localhost:3000');
function ExploreHandler() {

  this.token = localStorage.getItem('token');

    this.displaySearch = function(docs){
        $('.search-user-ol').empty();
      for (var i = 0; i < docs.length; i++) {
        $('.search-user-ol').append('<li onclick="window.location = \'/user/'+docs[i].id+'\'"><img src="'+docs[i].dp+'" class="avatar"><p>'+docs[i].id+'</p></li>');

      }
    }


}
