let held_item = ("null");
let prep_cup = false;
let prep_milk = 0; //requires two scoops
let prep_boba = 0; //requires two scoops
let anger = 0; //two bad items and no tip, three bad items and no pay.
let money = 10;
let this_sale = 6;
let tip = 1;
let drink_complete = false;
let background_image;

function preload() {
  background_image = loadImage('background.png');
}

function setup() {
  //background is 125x75 pixels, each chunk is 5 pixels.
  window_x = (windowWidth);
  window_y = (windowWidth*0.6);
  createCanvas(window_x, window_y);
  noSmooth(); //sharpens pixel art
}


function draw() {
  image(background_image,0,0,window_x,window_y);
  chunk = window_x/25 //a chunk is a workable unit of measurment for colliders
  
  /*visualise colliders
  fill(255,255,255);
  square(chunk, chunk, 3*chunk)
  square(chunk, 5*chunk, 3*chunk)
  square(chunk, 9*chunk, 3*chunk)
  square(21*chunk, chunk, 3*chunk)
  square(21*chunk, 5*chunk, 3*chunk)
  square(21*chunk, 9*chunk, 3*chunk)

  rect(10*chunk, 5*chunk,5*chunk,8*chunk)*/

  

  //Prices
  fill(31,25,30);
  textSize(0.6*chunk);
  text("£1.00",6*chunk,5.3*chunk)//cup price
  text("£1.20",6*chunk,9.3*chunk)//milk price
  text("£1.50",6*chunk,12.1*chunk)//boba price

  /*test print values
  text(held_item,100,100)
  text(prep_cup,100,120)
  text(prep_milk,100,140)
  text(prep_boba,100,160)
  text(drink_complete,100,180)*/

  fill(226,52,52);
  strokeWeight(0);
  if (anger > 3) { anger = 3} //normalise anger
  rect(8*chunk, 14*chunk, 9*chunk*(anger/3), 0.6*chunk) //anger bar
  //anger based payment managment
  if (anger >= 2) {tip = 0}
  if (anger >= 3) {this_sale = 0}

  text(money,chunk,14*chunk) //display money
  text(this_sale+"+"+tip,21*chunk,14*chunk) //display this sale and tip

  if (prep_cup == true && prep_milk == 2 && prep_boba == 2){ //completed drink detection
    rect(16.4*chunk, 11.4*chunk,3.6*chunk,1.2*chunk)
    drink_complete = true
  }

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

  if (mouseX >16.4*chunk && mouseX <20*chunk && mouseY >11.4 && mouseY <12.6*chunk && drink_complete == true){ //submit drink detection
    money += this_sale + tip
    ResetGame()
  }
}

function mouseReleased() {
  if (mouseX>10*chunk && mouseX<15*chunk && mouseY>5*chunk && mouseY<13*chunk){ //mouse released on prep station
    if (held_item != "old_cup" && held_item != "fresh_cup" && prep_cup==false){
      held_item=("null"); //nothing will happen if you try to use milk or boba without a cup
    } 
    else if ((held_item == "old_cup" || held_item == "fresh_cup")&&prep_cup==false){
      prep_cup=true
      if (held_item == "old_cup"){
        anger += 1
      }
    }
    else if ((held_item == "old_milk" || held_item == "fresh_milk")&&(prep_milk==0 || prep_milk==1)){
      prep_milk += 1
      if (held_item == "old_milk"){
        anger += 1
      }
    }
    else if ((held_item == "old_boba" || held_item == "fresh_boba")&&(prep_boba==0 || prep_boba==1)){
      prep_boba +=1
      if (held_item == "old_boba"){
        anger += 1
      }
    }
  }
  else{
    held_item=("null"); //mouse not released on prep station
  }
}

function ResetGame() {
  held_item = ("null");
  prep_cup = false;
  prep_milk = 0; //requires two scoops
  prep_boba = 0; //requires two scoops
  anger = 0; //two bad items and no tip, three bad items and no pay.
  this_sale = 5;
  tip = 2;
  drink_complete = false;
}
