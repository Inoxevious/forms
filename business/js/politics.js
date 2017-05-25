
/**
 * Created by HP ELITEBOOK on 9/24/2016.
 */

// enable vibration support
// navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
//
// if (navigator.vibrate) {
//     // vibration API supported
//     console.log('vibration supported');
// }

$("a").click(function(){
    // window.navigator.vibrate(200);
    navigator.vibrate(3000);
    console.log('should vibrate');

});
if (window.cordova && StatusBar)
{
    StatusBar.backgroundColorByHexString('#BE1912');
}


var url = 'http://www.263chat.com/wp-json/wp/v2/posts?_embed';

function displayNews() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        redrawTodosUI(doc.rows);
        if (err){
            console.log(err);
        }
    });
}

// var url = 'http://127.0.0.1:8887/news.json';
function sideNews(){
    fetch(url,{
        method : 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        for(var i= 0 ; i< data.length; i++){




            function topHeader(headline,body,id,image,date){
                // var tmp = inner.replace(/<img .*?>/g,"REPLACED");

                var jHtmlObject = jQuery(body);
                var editor = jQuery("<p>").append(jHtmlObject);
                editor.find(".wp-caption").remove();
                var newBody = editor.html();

                var news = {
                    _id: id.toString(),
                    title: headline,
                    body: newBody.replace(/<img .*?>/g,"REPLACED"),
                    date: date,
                    image: image.replace(/\s+/g, '')
                };
                db.put(news, function callback(err, result) {
                    if (err){
                        console.log(err.name);

                    }
                    if (err.name === 'conflict') {

                        console.log(err.message);



                    }
                    if (!err) {
                        console.log('Successfully posted a todo!');
                    }
                });

                console.log(id);


                return  '<div onclick="detail(this.id);" id="'+id+'" class="msg_card waves-green card">'+
                    '<div class="msg row">'+
                    '<div style="margin-left: 10px;" class="mgs_img col s4">'+
                    '<img src="'+image+'" width="100%" height="90%">'+
                    '</div>'+
                    '<div class="mgs_text col s7">'+
                    '<div style="text-transform: none; font-weight: 500; color: #5a5a5a" class="text-head">'+headline+'</div>'+
                    '<div class="text-body">'+moment(date, "YYYYMMDD").fromNow()+'</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
            }


            $('#jonah').append(topHeader(data[i].title.rendered,data[i].content.rendered, data[i].id,data[i]._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,data[i].date));
            document.getElementById('spin').style.display = "none";


        }


        //end here

        // Materialize.showStaggeredList('.list1');


    }).catch(function(err){
        console.log(err);
        var message = err.message;
        if(err){

            displayNews();
            var $toastContent = $('<span>'+message+'</span>');
            // Materialize.toast($toastContent, 5000);
        }
    });

}

sideNews();

function showTodos() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        redrawTodosUI(doc.rows);
    });
}

function detail(id) {

    console.log(id);
    document.getElementById('jonah').style.display="none";
    document.getElementById('menu').style.display="none";
    // document.getElementById('header-logo').style.display="none";
    document.getElementById('left-arrow').style.display="block";
    document.getElementById('more-vert').style.display="none";



    db.find({
        selector: {_id: {$eq: id}},
        sort: ['_id']
    }).then(function (result) {
        console.log(result.docs[0]);
        detail = result.docs[0];
        function createDetailView(title,image,body,date) {

            return '<div  class="detail">'+
                '<div style="font-weight: 500; font-size: 22px; color: #5a5a5a;" class="detail_head">'+title+'</div>'+
                '<div style="margin-top: 10px; color: gray">Posted '+moment(date, "YYYYMMDD").fromNow()+'</div>'+
                '<div class="detail_img">'+
                '<img src="'+image+'" width="100%" height="240px" >'+
                '</div>'+
                '<div class="col s7">'+
                '</div>'+
                '</div>'+
                '<div class="detail-body">'+body+'</div>'+
                '</div>'+
                '<div class="fixed-action-btn horizontal click-to-toggle" style="bottom: 45px;right: 24px;">'+
                '<a class="btn-floating btn-large light-green">'+
                '<i class="large material-icons">'+
                '<svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">'+
                '<path d="M0 0h24v24H0z" fill="none"/>'+
                '<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>'+
                '</svg>'+
                '</i>'+
                '</a>'+
                '<ul>'+
                '<li><a href="whatsapp://send?text='+title+'" data-action="share/whatsapp/share" class="btn-floating white">'+
                '<div style="padding-right: 10px;padding-top: 5px" class="ico">'+
                '<img src="img/whatsapp%20(1).png">'+
                '</div>'+
                '</a></li>'+
                '<li><a href="https://twitter.com/intent/tweet?text='+title+'#263chat" class="btn-floating white">'+
                '<div style="padding-right: 10px;padding-top: 5px" class="ico">'+
                '<img src="img/twitter%20(1).png">'+
                '</div>'+
                '</a></li>'+
                '<li><a class="btn-floating blue" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp; src=sdkpreparse">'+
                '<div style="padding-right: 10px;padding-top: 5px" class="ico">'+
                '<img src="img/facebook-letter-logo%20(1).png">'+
                '</div>'+
                '</a></li>'+
                '</ul>'+
                '</div>';

        }
        $('#details').append(createDetailView(result.docs[0].title,result.docs[0].image,result.docs[0].body,result.docs[0].date));

    }).catch(function (err) {
        // ouch, an error
    });
}




function redrawTodosUI(news) {
    news.forEach(function(todo) {
        console.log(todo);
        var news = todo.doc;
        console.log(news);
        function renderNewsUI(headline,body,id,image,date) {
            return  '<div onclick="detail(this.id);" id="'+id+'" class="msg_card waves-green card">'+
                '<div class="msg row">'+
                '<div style="margin-left: 10px;" class="mgs_img col s4">'+
                '<img src="'+image+'" width="100%" height="90px">'+
                '</div>'+
                '<div class="mgs_text col s7">'+
                '<div style="text-transform: none; font-weight: 500;" class="text-head">'+headline+'</div>'+
                '<div class="text-body">'+moment(date, "YYYYMMDD").fromNow()+'</div>'+
                '</div>'+
                '</div>'+
                '</div>';

        }
        $('#jonah').append(renderNewsUI(news.title,news.body,news._id,news.image,news.date));
        document.getElementById('spin').style.display = "none";

    });
}
document.addEventListener('deviceready', function(){
    StatusBar.backgroundColorByHexString('#17ff06');});

