let newY = startY = initialStartY = 0;
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
    //console.log("NewY: "+newY+" startY: "+startY)
    card.style.top = (card.offsetTop - newY) + 'px'
}
function mouseUp(e){
    document.removeEventListener('pointermove', mouseMove)
    while (startY > initialStartY){
        startY = startY - 1
        card.style.top = (card.offsetTop - 1) + 'px'
    }
}