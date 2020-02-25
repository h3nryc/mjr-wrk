var socket = io.connect('http://localhost:3000');
function ExploreHandler() {

  this.token = localStorage.getItem('token');

    this.displaySearch = function(docs){
        $('.search-user-ol').empty();
      for (var i = 0; i < docs.length; i++) {
        $('.search-user-ol').append('<li onclick="window.location = \'/user/'+docs[i].id+'\'"><img src="'+docs[i].dp+'" class="avatar"><p>'+docs[i].id+'</p></li>');

      }
    }

    this.mLiked = function(docs){
      bubbleSort(docs,"likes");
      docs.reverse();
      for (var i = 0; i < 10; i++) {
        $('.recent-ol').append('<li><img src="'+docs[i].sImage+'" alt=""><p class="img-title">'+docs[i].sName+'</p><p class="img-artist">'+docs[i].sArtist+'</p></li>')

      }
    }


}

function bubbleSort(a, key)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i][key] > a[i+1][key]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}
