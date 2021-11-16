
var score1 = 0;
var score2 = 0;
var c1_value;
var c2_value;
var endgame = false;
var str = "";

var card1 = new Image;
var card2 = new Image;
var canvas = document.getElementById("myCanvas1");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");

window.onload = function () {
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.strokeText("Player 1", 120, 160);
    //ctx.drawImage(img, 4, 3);
    ctx2.font = "30px Arial";
    ctx2.textAlign = "center";
    ctx2.strokeText("Player 2", 120, 160);
};

function resetGame() {
    ctx.clearRect(0, 0, 240, 320);
    ctx2.clearRect(0, 0, 240, 320);
    score1 = 0;
    score2 = 0;
    endgame = true;
    $("#s2").val(score2);
    $("#s1").val(score1);

    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.strokeText("Player 1", 120, 160);
    
    ctx2.font = "30px Arial";
    ctx2.textAlign = "center";
    ctx2.strokeText("Player 2", 120, 160);

    document.getElementById("s2").value = "";
    document.getElementById("s1").value = "";
    document.getElementById("s1").style.color = "";
    document.getElementById("s2").style.color = "";
}

function winner() {
    if (score1 > score2) {
        str = $("#p1_name").val() + " WINS !!!!!";
        $("#result").text(str);
    }
    else if (score2 > score1) {
        str = $("#p2_name").val() + " WINS !!!!!";
        $("#result").text(str);
    }
    else {
        $("#result").text("DRAW");
    }
}

function cardValue(){
    if (c1_value == 'ACE') { c1_value = '14'; }
    if (c1_value == 'KING') { c1_value = '13'; }
    if (c1_value == 'QUEEN') { c1_value = '12'; }
    if (c1_value == 'JACK') { c1_value = '11'; }

    if (c2_value == 'ACE') { c2_value = '14'; }
    if (c2_value == 'KING') { c2_value = '13'; }
    if (c2_value == 'QUEEN') { c2_value = '12'; }
    if (c2_value == 'JACK') { c2_value = '11'; }
}
function scoreCount(){
    if (parseInt(c1_value) > parseInt(c2_value)) {
        score1 = score1 + 1;
        $("#s1").val(score1);
        $("#s2").val(score2);
        
    }
    else if (parseInt(c1_value) < parseInt(c2_value)) {
        score2 = score2 + 1;
        $("#s1").val(score1);
        $("#s2").val(score2);

    }
    else {
        score1 = score1 + 1;
        score2 = score2 + 1;
        $("#s2").val(score2);
        $("#s1").val(score1);
    }
    if(score1>score2){
        document.getElementById("s1").style.color = "#20c20e";
        document.getElementById("s2").style.color = "red";
    }
    if(score2>score1){
        document.getElementById("s2").style.color = "#20c20e";
        document.getElementById("s1").style.color = "red";
    }
    if(score2==score1){
        document.getElementById("s2").style.color = "#20c20e";
        document.getElementById("s1").style.color = "#20c20e";
    }
}

$("#eg").on("click", function () {
    winner();
    resetGame();
});

$("#p_1").on("click", function () {
    c1_value = 0;
    c2_value = 0;
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", `https://deckofcardsapi.com/api/deck/new/draw/?count=1`);
    xhr1.onload = function () {
        c1_value = JSON.parse(xhr1.responseText).cards[0].value;
        card1.src = JSON.parse(xhr1.responseText).cards[0].image;
    }
    xhr1.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `https://deckofcardsapi.com/api/deck/new/draw/?count=1`);
    xhr2.onload = function () {
        c2_value = JSON.parse(xhr2.responseText).cards[0].value;
        card2.src = JSON.parse(xhr2.responseText).cards[0].image;
    }
    xhr2.send();
    
    setTimeout(() => {
        ctx.drawImage(card1, 4, 3);
        ctx2.drawImage(card2, 4, 3);
        if (endgame) {
            $("#result").text("");
            endgame = false;
        }
        cardValue();
        scoreCount();
    }, 1200);

});
    
