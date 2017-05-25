/**
 * Created by HP ELITEBOOK on 9/24/2016.
 */



var url = 'http://scoreboard.co.zw/admin/api.php?data=news';
function sideNews(){
    fetch(url,{
        method : 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data.News);
        var news = data.News;
        console.log(news[0].headline);
        //set the loop to only take a maximum of 8 tabs

        // var ad = function () {
        //     var adurl= 'http://scoreboard.co.zw/admin/api.php?data=news';
        //     fetch(url,{
        //         method : 'GET'
        //     }).then(function(response){
        //         return response.json();
        //     }).then(function(data){
        //         var theAd = data.News;
        //
        //     }).catch(function(err){
        //         console.log(err);
        //     });
        // };
        var x = 0;
        for(var i= 0 ; i<20; i++){

            function topHeader(headline,body,timestamp,pic,id){


                return  '<div class="msg_card card">'+
                    '<div class="msg row">'+
                    '<div style="margin-left: 10px;" class="mgs_img col s4">'+
                    '<img src="http://scoreboard.co.zw/admin/img/'+pic+'" width="100%" height="90%">'+
                    '</div>'+
                    '<div class="mgs_text col s7">'+
                    '<div style="text-transform: uppercase; font-weight: 500;" class="text-head">'+headline+'</div>'+
                '<div class="text-body">'+moment(timestamp, "YYYYMMDD").fromNow()+'</div>'+
                '</div>'+
                '</div>'+
                '</div>';

            }
            $('#side-list').append(topHeader(news[i].title, news[i].text, news[i].created_at ,news[i].image_url, news[i].id));



        }

        // Materialize.showStaggeredList('.list1');

        function goTo(index){

            console.log(index)
        }
    }).catch(function(err){
        console.log(err);
    });

}

sideNews();



