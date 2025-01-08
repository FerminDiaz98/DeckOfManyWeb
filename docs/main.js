let newY = startY = initialStartY = 0;
let id = null;
const card = document.getElementById('card')
const drawncard = document.getElementById('drawncard')
const overlay = document.getElementById('overlay')


card.addEventListener('pointerdown', mouseDown)

function mouseDown(e){
    initialStartY = startY = e.clientY
    document.addEventListener('pointermove', mouseMove)
    document.addEventListener('pointerup', mouseUp)
}
function mouseMove(e){
    newY = startY - e.clientY
    startY = e.clientY
    if (startY < initialStartY){ newY = 0 }
    card.style.top = (card.offsetTop - newY) + 'px'
}
function mouseUp(e){
    if(card.offsetTop > parseInt(card.offsetHeight/2)+1){
        let cardspeed = 50
        clearInterval(id)
        id = setInterval(frame, 5)
        function frame(){
            if (card.offsetTop >= 2000){
                card.style.top = 0 + 'px'
                drawncard.style.top = 2000 +'px'
                clearInterval(id)
                drawRandomCard()
            }
            else{
                card.style.top = (card.offsetTop + Math.min(cardspeed,70)) + 'px'
                cardspeed++
            }
        }
    }
    else{
        clearInterval(id)
        id = setInterval(frame, 5)
        function frame(){
            if (card.offsetTop <= 0){
                clearInterval(id)
                card.style.top = 0
            }
            else{
                card.style.top = (card.offsetTop - 25) + 'px'
            }
        }
    }
    document.removeEventListener('pointermove', mouseMove)
}

function drawRandomCard(){
    //dimbackground() isn't working properly, so this will do for now
    overlay.style.display = "inline"
    overlay.style.opacity = 0.1

    //pick 1 of 22 possible cards
    const cardValues = getRandomCardValue(Math.floor(Math.random()*22))
    drawncard.style.display = "inline"
    drawncard.style.background = "url('assets/"+cardValues.nombre+"') 0% 0% / contain"
    $('#drawncard').dimBackground()
    clearInterval(id)
    id = setInterval(frame, 5)
    let drawncardspeed = 50;
    function frame(){
        if (drawncard.offsetTop <= 0){
            drawncard.style.top = 0 + 'px'
            clearInterval(id)
        }
        else{
            drawncard.style.top = Math.max(0,(drawncard.offsetTop - Math.max(drawncardspeed,5))) + 'px'
            drawncardspeed -= 1
        }
    }

}

function getRandomCardValue(randomCard){
    let cartaNombre = cartaEfecto = "default"
    switch (randomCard) {
        case 0: cartaNombre = "Balance.jpg"; cartaEfecto = "Your mind suffers a wrenching alteration, causing your alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you."; break;
        case 1: cartaNombre = "Comet.jpg"; cartaEfecto = "testComet"; break;
        case 2: cartaNombre = "Donjon.jpg"; cartaEfecto = "testComet"; break;
        case 3: cartaNombre = "Euryale.jpg"; cartaEfecto = "testEuryale"; break;
        case 4: cartaNombre = "Fates.jpg"; cartaEfecto = "testFates"; break;
        case 5: cartaNombre = "Flames.jpg"; cartaEfecto = "testComet"; break;
        case 6: cartaNombre = "Fool.jpg"; cartaEfecto = "testComet"; break;
        case 7: cartaNombre = "Gem.jpg"; cartaEfecto = "testComet"; break;
        case 8: cartaNombre = "Idiot.jpg"; cartaEfecto = "testComet"; break;
        case 9: cartaNombre = "Jester.jpg"; cartaEfecto = "testComet"; break;
        case 10: cartaNombre = "Key.jpg"; cartaEfecto = "testComet"; break;
        case 11: cartaNombre = "Knight.jpg"; cartaEfecto = "testComet"; break;
        case 12: cartaNombre = "Moon.jpg"; cartaEfecto = "testComet"; break;
        case 13: cartaNombre = "Rogue.jpg"; cartaEfecto = "testComet"; break;
        case 14: cartaNombre = "Ruin.jpg"; cartaEfecto = "testComet"; break;
        case 15: cartaNombre = "Skull.jpg"; cartaEfecto = "testComet"; break;
        case 16: cartaNombre = "Star.jpg"; cartaEfecto = "testComet"; break;
        case 17: cartaNombre = "Sun.jpg"; cartaEfecto = "testComet"; break;
        case 18: cartaNombre = "Talons.jpg"; cartaEfecto = "testComet"; break;
        case 19: cartaNombre = "Throne.jpg"; cartaEfecto = "testComet"; break;
        case 20: cartaNombre = "Vizier.jpg"; cartaEfecto = "testComet"; break;
        case 21: cartaNombre = "Void.jpg"; cartaEfecto = "testComet"; break;
        default: console.log("something BAD happened"); break;}
    let cardValues = {
        nombre: cartaNombre,
        efecto: cartaEfecto,
    }
    return cardValues
}