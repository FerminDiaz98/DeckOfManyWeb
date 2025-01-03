document.getElementById("drawCard").onclick = function(){drawCard()};
function drawCard(){
    cardDrawn = Math.floor(Math.random()*3)
    $("#result").load(cardSelect(cardDrawn))
    //document.getElementById("result").innerHTML = `<iframe src="${cardSelect(cardDrawn)}" style="border:none;"></iframe>`;
}
function cardSelect(card){
    console.log(card)
    let pathToCard = "js/cards/";
    switch (card) {
        case 0: pathToCard+="balance.html";break;
        case 1: pathToCard+="comet.html";break;
        case 2: pathToCard+="donjon.html";break;
        default: console.log("something happened");
    }
    //console.log(pathToCard)
    return pathToCard
}