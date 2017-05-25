
function post() {

    var url = "http://localhost:81/Lion/loginapi.php";
    fetch(url,{
        method : 'GET',
        mode: 'no-cors'
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
    }).catch(function(err){
        console.log(err);
    });

}

