var game_main_score = 0

window.onload = function() {
  // BEGIN : Score Configuration
  updateScore();
  // END : Score Configuration

  // BEGIN : Apple Configuration
  setAtRandomTopPosition(document.getElementById('apple'));
  moveElementDown(document.getElementById('apple'));
  // END : Apple Configuration

  // BEGIN : Basket Configuration
  setElementDraggable(document.getElementById('basket'));
  // END : Basket Configuration
}

function setElementDraggable(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function moveElementDown(element) {
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos > window.innerHeight) {
            pos = -50;
            setAtRandomTopPosition(document.getElementById('apple'));
            game_main_score -= 1;
            updateScore();
        } else if(overlap(document.getElementById('apple'), document.getElementById('basket')) === true) {
          pos = -50;
          setAtRandomTopPosition(document.getElementById('apple'));
          element.style.top = pos + 'px';
          game_main_score += 1;
          updateScore();
        } else {
          pos += 3;
          element.style.top = pos + 'px';
        }
    }
}

function updateScore() {
  document.getElementById('game_score').innerHTML = "Score: " + game_main_score;
}

function checkCollision() {
  var apple = document.getElementById('apple');
  var basket = document.getElementById('basket');
  if (apple.style.left < basket.style.left + basket.style.width &&
   apple.style.left + apple.style.width > basket.style.left &&
   apple.style.top < basket.style.top + basket.style.height &&
   apple.style.top + apple.style.height > basket.style.top) {
    return true
  } else {
    return false
  }
}

function setAtRandomTopPosition(element) {
  element.style.left = Math.floor(Math.random() * Math.floor(window.innerWidth)) + "px";
}
