let newY = startY = initialStartY = 0;
var id = 0;
const card = document.getElementById('card')
const drawncard = document.getElementById('drawncard')
const overlay = document.getElementById('overlay')
const texteffect = document.getElementById('texteffect')
const closebutton = document.getElementById('close')

card.addEventListener('pointerdown', mouseDown)
closebutton.addEventListener('click', closeCard)

var cardDrawSFX = new Audio("assets/1carddraw.wav")

function mouseDown(e){
    initialStartY = startY = e.clientY
    cardDrawSFX = new Audio("assets/1carddraw.wav")
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
    cardDrawSFX = new Audio("assets/1carddraw.wav")
    if(card.offsetTop > parseInt(card.offsetHeight/2)+1){
        cardDrawSFX.play()
        let cardspeed = 50
        clearInterval(id)
        id = setInterval(frame, 5)
        function frame(){
            if (card.offsetTop >= 2000){
                clearInterval(id)
                card.style.display = "none"
                card.style.top = 0 + 'px'
                drawncard.style.top = 2000 +'px'
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
    id = 0;
    //dimbackground() isn't working properly, so I had to add some manual stuff
    $('#drawncard').dimBackground()
    overlay.style.display = "inline"
    $('#overlay').animate({opacity: '0.75'}, 300)

    //pick 1 of 22 possible cards, stores them as cardValues
    const cardValues = getRandomCardValue(Math.floor(Math.random()*22))

    //the drawn card is made visible and is given a new background asset
    //the text is given the card effect, and both it and the close button are given opacity 0
    drawncard.style.display = "inline"
    drawncard.style.background = "url('assets/"+cardValues.name+"') 0% 0% / contain"
    $('#texteffect').html(cardValues.effect);
    texteffect.style.opacity = 0;
    closebutton.style.opacity = 0;

    //We start the animationof the card being drawn
    //starts at 40px speed and becomes slower each loop until it speed becomes 10px
    clearInterval(id)
    id = setInterval(frame, 10)
    let drawncardspeed = 40;
    function frame(){
        if (drawncard.offsetTop <= 0){
            drawncard.style.top = 0 + 'px'
            $('#texteffect').animate({opacity: '0.9'}, 800)
            $('#close').animate({opacity: '0.75'}, 800)
            clearInterval(id)
        }
        else{
            drawncard.style.top = Math.max(0,(drawncard.offsetTop - Math.max(drawncardspeed,15))) + 'px'
            drawncardspeed -= 1
        }
    }

}

function closeCard(e){
    //removes the drawn card and returns eveything to their initial values
    drawncard.style.display = "none"
    texteffect.style.opacity = 0;
    closebutton.style.opacity = 0;
    card.style.display = "inline"
    
    //remove dimBackground
    $.undim()
    $('#overlay').animate({opacity: '0'}, 300)
    overlay.style.display = "none"

    clearInterval(id)
}

function getRandomCardValue(randomCard){
    let cardName = cardEffect = "default"
    switch (randomCard) {
        case 0: cardName = "Balance.jpg"; cardEffect = "Your mind suffers a wrenching alteration, causing your alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you."; break;
        case 1: cardName = "Comet.jpg"; cardEffect = "If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain experience points enough to gain one level. Otherwise, this card has no effect."; break;
        case 2: cardName = "Donjon.jpg"; cardEffect = "You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any divination magic, but a wish spell can reveal the location of your prison. You draw no more cards."; break;
        case 3: cardName = "Euryale.jpg"; cardEffect = "The card's medusa-like visage curses you. You take a -2 penalty on saving throws while cursed in this way. Only a god or the magic of The Fates card can end this curse."; break;
        case 4: cardName = "Fates.jpg"; cardEffect = "Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die."; break;
        case 5: cardName = "Flames.jpg"; cardEffect = "A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies."; break;
        case 6: cardName = "Fool.jpg"; cardEffect = "You lose 10,000 XP, discard this card, and draw from the deck again, counting both draws as one of your declared draws. If losing that much XP would cause you to lose a level, you instead lose an amount that leaves you with just enough XP to keep your level."; break;
        case 7: cardName = "Gem.jpg"; cardEffect = "Twenty-five pieces of jewelry worth 2,000 gp each or fifty gems worth 1,000 gp each appear at your feet."; break;
        case 8: cardName = "Idiot.jpg"; cardEffect = "Permanently reduce your Intelligence by 1d4 + 1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.Idiot"; break;
        case 9: cardName = "Jester.jpg"; cardEffect = "You gain 10,000 XP, or you can draw two additional cards beyond your declared draws."; break;
        case 10: cardName = "Key.jpg"; cardEffect = "A rare or rarer magic weapon with which you are proficient appears in your hands. The DM chooses the weapon."; break;
        case 11: cardName = "Knight.jpg"; cardEffect = "You gain the service of a 4th-level fighter who appears in a space you choose within 30 feet of you. The fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character."; break;
        case 12: cardName = "Moon.jpg"; cardEffect = "You are granted the ability to cast the wish spell 1d3 times."; break;
        case 13: cardName = "Rogue.jpg"; cardEffect = "A nonplayer character of the DM's choice becomes hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a wish spell or divine intervention can end the NPC's hostility toward you."; break;
        case 14: cardName = "Ruin.jpg"; cardEffect = "All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears."; break;
        case 15: cardName = "Skull.jpg"; cardEffect = "You summon an avatar of death-a ghostly humanoid skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the DM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A creature slain by an avatar of death can't be restored to life."; break;
        case 16: cardName = "Star.jpg"; cardEffect = "Increase one of your ability scores by 2. The score can exceed 20 but can't exceed 24."; break;
        case 17: cardName = "Sun.jpg"; cardEffect = "You gain 50,000 XP, and a wondrous item (which the DM determines randomly) appears in your hands."; break;
        case 18: cardName = "Talons.jpg"; cardEffect = "Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do vanish."; break;
        case 19: cardName = "Throne.jpg"; cardEffect = "You gain proficiency in the Persuasion skill, and you double your proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of monsters, which you must clear out before you can claim the keep as yours."; break;
        case 20: cardName = "Vizier.jpg"; cardEffect = "At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it."; break;
        case 21: cardName = "Void.jpg"; cardEffect = "This black card spells disaster. Your soul is drawn from your body and contained in an object in a place of the DM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is incapacitated. A wish spell can't restore your soul, but the spell reveals the location of the object that holds it. You draw no more cards."; break;
        default: console.log("something BAD happened"); break;}
    let cardValues = {
        name: cardName,
        effect: cardEffect,
    }
    return cardValues
}