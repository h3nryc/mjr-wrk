var socket = io.connect('http://10.0.105.197:3000/');
function ExploreHandler() {

  this.token = localStorage.getItem('token');

    this.displaySearch = function(docs){
      //Displays the return of a user searched
        $('.search-user-ol').empty();
      for (var i = 0; i < docs.length; i++) {
        $('.search-user-ol').append('<li onclick="window.location = \'/user/'+docs[i].id+'\'"><img src="'+docs[i].dp+'" class="avatar"><p>'+docs[i].displayName+'</p></li>');

      }
    }

    this.mLiked = function(docs){

      //Displays the most liked posts
      bubbleSort(docs,"likes");
      console.log(docs);
      docs.reverse();
      for (var i = 0; i < 10; i++) {
        $('.recent-ol').append('<li><img onclick="window.location = \'/post/'+docs[i]._id+'\'"src="'+docs[i].sImage+'" alt=""><p class="img-title">'+docs[i].sName+'</p><p class="img-artist">'+docs[i].sArtist+'</p></li>')

      }
    }


}

//A sort function used to sort the posts by most liked
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
