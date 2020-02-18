var socket = io.connect('http://localhost:3000');
function ExploreHandler() {

  this.token = localStorage.getItem('token');

    this.displaySearch = function(docs){
      console.log(docs);
      $('.search-user-ol').empty();
      $('.search-user-ol').append('<li onclick="window.location = \'/user/'+docs.id+'\'"><img src="'+docs.dp+'" class="avatar"><p>'+docs.id+'</p></li>');
    }


}
