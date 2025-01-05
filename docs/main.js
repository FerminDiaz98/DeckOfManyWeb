let newY = startY = initialStartY = 0;
let id = null;
const card = document.getElementById('card')

card.addEventListener('pointerdown', mouseDown)

function mouseDown(e){
    initialStartY = startY = e.clientY
    document.addEventListener('pointermove', mouseMove)
    document.addEventListener('pointerup', mouseUp)
}
function mouseMove(e){
    newY = startY - e.clientY
    startY = e.clientY
    if (startY < initialStartY){
        newY = 0;
    }
    card.style.top = (card.offsetTop - newY) + 'px'
}
function mouseUp(e){
    if(card.offsetTop > parseInt(card.offsetHeight/2)+1){
        clearInterval(id)
        id = setInterval(frame, 5)
        function frame(){
            if (card.offsetTop >= 3000){
                clearInterval(id)
                card.style.top = 0
            }
            else{
                card.style.top = (card.offsetTop + 50) + 'px'
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