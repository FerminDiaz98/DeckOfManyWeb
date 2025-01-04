let newY = 0, startY = 0;
const card = document.getElementById('card')

card.addEventListener('mousedown', mouseDown)

function mouseDown(e){
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e){
    newY = startY - e.clientY
    startY = e.clientY
    //if (newY > 0){
    //    newY = 0;
    //}  
    card.style.top = (card.offsetTop - newY) + 'px'
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}