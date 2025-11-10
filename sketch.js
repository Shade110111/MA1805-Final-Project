let held_item = ("null");

function setup() {
  window_x = (windowWidth);
  window_y = (windowWidth*0.5625);
  createCanvas(window_x, window_y);
}


function draw() {
  background(150);
  chunk = window_x/25 //a chunk is a workable unit of measurment for colliders
  fill(255,255,255);
  square(chunk, chunk, 3*chunk)
  square(chunk, 5*chunk, 3*chunk)
  square(chunk, 9*chunk, 3*chunk)
  square(21*chunk, chunk, 3*chunk)
  square(21*chunk, 5*chunk, 3*chunk)
  square(21*chunk, 9*chunk, 3*chunk)

  rect(10*chunk, 5*chunk,5*chunk,8*chunk)

  fill(225,0,225);
  square(7*chunk, 5*chunk, chunk)
  text(held_item,100,100)
}

function mousePressed() {
  if (mouseX > chunk && mouseX < 4*chunk) { //fresh ingredient
    if (mouseY > chunk && mouseY < 4*chunk) { //cup
      held_item = ("fresh_cup")
    }
    else if (mouseY > 5*chunk && mouseY < 8*chunk) { //milk
      held_item = ("fresh_milk")
    }
    else if (mouseY > 9*chunk && mouseY < 12*chunk) { //boba
      held_item = ("fresh_boba")
    }
  }
  if (mouseX > 21*chunk && mouseX < 24*chunk) { //old ingredient
    if (mouseY > chunk && mouseY < 4*chunk) { //cup
      held_item = ("old_cup")
    }
    else if (mouseY > 5*chunk && mouseY < 8*chunk) { //milk
      held_item = ("old_milk")
    }
    else if (mouseY > 9*chunk && mouseY < 12*chunk) { //boba
      held_item = ("old_boba")
    }
  }
}

function mouseReleased() {
  if (mouseX>10*chunk && mouseX<15*chunk && mouseY>5*chunk && mouseY<13*chunk){
  }
  else{
    held_item=("null");
  }
}
