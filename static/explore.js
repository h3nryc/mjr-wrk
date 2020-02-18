var explore = new ExploreHandler;


$('.search-box').on('input', function() {
  if ($('.search-box').val() == "") {
    $('.search-user-ol').empty();
  }else{
    socket.emit('usrSearch', $('.search-box').val(), function(res){
      explore.displaySearch(res)
    });
  }
});
