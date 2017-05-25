/**
 * Created by HP ELITEBOOK on 1/6/2017.
 */




function createMatch (team1Name, team2Name) {
    team1Name = document.getElementById('team1').value;
    team2Name = document.getElementById('team2').value;

    var scoreHome= {
        score:"0"
    };
    var scoreAway= {
        score:"0"
    };


    firebase.database().ref('matches/').push(
        {
            //in the meantime I just want to store these three fields for the agent
            "Home": team1Name,
            "HomeScore": scoreAway,
            "Away": team2Name,
            "AwayScore": scoreHome,
            "Comment": ''
        }
    );
    var $toastContent = $('<span>Team added</span>');
    Materialize.toast($toastContent, 5000);


//okay twas really no problem posting data to the freaking DB
// now I gotta get back my data and print it on the dashboard----
}

firebase.database().ref('matches/').limitToLast(10).on('child_added', function(snapshot) {

    var match = snapshot.val();
    console.log(match);
    console.log(match.key);

    this.matchList = function( team1name, team2name, team2score){


        var myKey = snapshot.key;
        console.log(myKey);

        //var ordernum = mykey.s;ubstring(1, 4);
        return'<li id="'+myKey+'">'+
            '<div class="collapsible-header"><span class="team1">'+team1name+'</span><span>Vs</span><span class="team2">'+team2name+'</span></div>'+
            '<div class="collapsible-body"><input style="width: 40%;" class="comments" id="'+myKey+'Home"/>' +
            '<input style="width: 40%; margin-left: 10px" class="comments" id="'+myKey+'Away"/>' +
            '<a onclick="score(\''+myKey+'\');" class="waves-effect waves-light btn" href="#modal1">Update</a>'+
            '</div>'+
            '</li>';

    };

    $("#matches").append(this.matchList(match.Home ,match.Away, match.AwayScore));
//beauty

});


function score(uid) {

    team1update = document.getElementById(uid+"Home").value;
    team2update = document.getElementById('team2').value;

    firebase.database().ref('matches/'+uid+'/HomeScore/').update(
        {

            "score": team1update
        }
    );
}
function talk() {

    var x = document.getElementsByClassName("talk")[0].textContent;
    var msg = new SpeechSynthesisUtterance(x);

    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = x;
    msg.lang = 'en-US';

    // var msg = new SpeechSynthesisUtterance('I see dead people!');

    speechSynthesis.getVoices().forEach(function(voice) {
        console.log(voice.name, voice.default ? voice.default :'');
    });
    msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Whisper'; })[0];
    speechSynthesis.speak(msg);

    msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
          };
        window.speechSynthesis.speak(msg);



        if (msg){
        console.log('Now I am talking');
    }
    else{
        console.log('hapana zvikuitika')
    }
}
talk();


