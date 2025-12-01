let held_item = ("null");
let prep_cup = false;
let prep_milk = 0; //requires two scoops
let prep_boba = 0; //requires two scoops
let prep_percentage = 0.0;
let anger = 0; //two bad items and no tip, three bad items and no pay.
let money = 10;
let this_sale = 6;
let tip = 1;
let drink_complete = false;
let starting_time=90 //in seconds

let background_image;
let cup_image;
let cup_translucent_image;
let prep_boba_image_1;
let prep_boba_image_2;
let prep_milk_image_1;
let prep_milk_image_2;
let prep_milk_image_boba;
let submit_button_image;
let start_screen_image;
let win_screen_image;
let lose_screen_image;
let warning_indicator_image;
let cursor_image;
let cursor_cup_image;
let cursor_milk_image;
let cursor_boba_image;

let screen_tracker = 1; //0 is off, 1 is start,2 is win, 3 is lose
let millis_prev_game = 0;

let old_seed = 0;
let recycled_cups = 0;
let recycled_milk = 0;
let recycled_boba = 0;

let indicator_x=0;
let indicator_y=0;
let indicator_time=0;

let store_jingle_sound;
let store_ambiance_sound;
let cup_sound;
let milk_1_sound;
let milk_2_sound;
let boba_sound;
let button_sound;
let button_sound_bad;


function preload() {
  background_image = loadImage('background.png');
  cup_image = loadImage('Cup.png');
  cup_translucent_image = loadImage('Cup Translucent.png');
  prep_boba_image_1 = loadImage('prep_boba_image_1.png');
  prep_boba_image_2 = loadImage('prep_boba_image_2.png');
  prep_milk_image_1 = loadImage('prep_milk 1.png');
  prep_milk_image_2 = loadImage('prep_milk 2.png');
  prep_milk_image_boba = loadImage('prep_milk boba.png');
  submit_button_image = loadImage('Submit_button_on.png');
  start_screen_image = loadImage('Start Screen.gif');
  win_screen_image = loadImage('win Screen.png');
  lose_screen_image = loadImage('lose Screen.png');
  warning_indicator_image = loadImage('Warning.gif');
  cursor_image = loadImage('cursor.png');
  cursor_cup_image = loadImage('cursor_cup.png');
  cursor_milk_image = loadImage('cursor_milk.png');
  cursor_boba_image = loadImage('cursor_boba.png');
  store_jingle_sound = loadSound('ScreenRecording_11-25-2025 5-27-32 pm_1.mp3');
  store_ambiance_sound = loadSound('shop-background-tesco-store-71549.mp3');
  cup_sound = loadSound('place_cup_sound.wav');
  milk_1_sound = loadSound('fill_cup_1_sound.wav');
  milk_2_sound = loadSound('fill_cup_2_sound.wav');
  boba_sound = loadSound('add_boba_sound.wav');
  button_sound = loadSound('button click.wav');
  button_sound_bad = loadSound('button click fail.wav');
}

function setup() {
  //background is 125x75 pixels, each chunk is 5 pixels.
  if (windowHeight < windowWidth*0.6){
    window_x = (windowHeight*1.667);
    window_y = (windowHeight);
  }
  else{
    window_x = (windowWidth);
    window_y = (windowWidth*0.6);
  }

  var cnv = createCanvas(window_x, window_y);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  noSmooth(); //sharpens pixel art
  noCursor();

  store_jingle_sound.loop();
  store_jingle_sound.amp(0.3);
  store_ambiance_sound.loop();
  store_ambiance_sound.amp(0.4);
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
  text("$1.00",6*chunk,5.3*chunk)//cup price
  text("$1.20",6*chunk,9.3*chunk)//milk price
  text("$1.50",6*chunk,12.1*chunk)//boba price
  textAlign('center')
  text("$"+money+"/25",6.4*chunk,14.5*chunk) //display money
  text("$"+this_sale+"+"+tip,18.6*chunk,14.5*chunk) //display this sale and tip
  textAlign('left')
  textSize(0.4*chunk); //label values
  text("cash",4*chunk,14.9*chunk)
  text("sale + tip",20.2*chunk,14.9*chunk)

  //timer (using millis() so it isnt framerate dependent) starting_time-millis()/1000
  fill(237,202,76);
  normalised_time = ((starting_time-(millis()-millis_prev_game)/1000)/starting_time)
  if (normalised_time >0){ //normalised time is time left/time limit
    rect(6.4*chunk,0.4*chunk,(normalised_time)*9.8*chunk ,0.4*chunk)
  }
  //time based screen switches
    if (money >= 25){
      screen_tracker = 2
    }
  if (normalised_time<= 0 && screen_tracker == 0){
      screen_tracker = 3
  }

  fill(226,52,52);
  strokeWeight(0);
  if (anger > 3) { anger = 3} //normalise anger
  rect(8*chunk, 14*chunk, 9*chunk*(anger/3), 0.6*chunk) //anger bar
  textSize(0.5*chunk);
  text("RAGE",11.8*chunk,13.9*chunk);
  //anger based payment managment
  if (anger >= 2) {tip = 0}
  if (anger >= 3) {this_sale = 0}

  //drink completion meter
  fill(162,52,52);
  rect(16.8*chunk,12.8*chunk,2.8*prep_percentage*chunk,0.2*chunk);

  if (prep_cup == true && prep_milk == 2 && prep_boba == 2){ //completed drink detection
    image(submit_button_image,0,0,window_x,window_y);
    drink_complete = true
  }

  //render prep cup
  if (prep_cup == true){
    image(cup_image,0,0,window_x,window_y);
  }
  if (prep_milk == 1){
    image(prep_milk_image_1,0,0,window_x,window_y);
  }
  else if (prep_milk == 2){
    image(prep_milk_image_2,0,0,window_x,window_y);
  }
  else if (prep_boba == 1){
    image(prep_boba_image_1,0,0,window_x,window_y);
  }
  else if (prep_boba == 2){
    image(prep_boba_image_2,0,0,window_x,window_y);

  }
  if (prep_milk == 2 && prep_boba != 0){
    image(prep_milk_image_boba,0,0,window_x,window_y);
  }

  if (prep_cup == true){ //translucent cup film
    image(cup_translucent_image,0,0,window_x,window_y);
  }

  //old inventory
  fill(0,0,0);
  text(recycled_cups,17.55*chunk,0.75*chunk);
  text(recycled_milk,17.55*chunk,1.75*chunk);
  text(recycled_boba,17.55*chunk,2.75*chunk);

  //no old ingredients warning
  if (millis()<indicator_time){
    image(warning_indicator_image,indicator_x,indicator_y,1*chunk,1*chunk);
  }
  //raging warning
  if (anger >= 2){
    image(warning_indicator_image,19*chunk,13.8*chunk,1*chunk,1*chunk);
  }

  //screen projection
  if (screen_tracker == 1){
    image(start_screen_image,0,0,window_x,window_y);
  }
  else if (screen_tracker == 2){
    image(win_screen_image,0,0,window_x,window_y);
  }
  else if (screen_tracker == 3){
    image(lose_screen_image,0,0,window_x,window_y);
  }
  /*
  //test print values
  text(held_item,100,100)
  text(prep_cup,100,120)
  text(prep_milk,100,140)
  text(prep_boba,100,160)
  text(drink_complete,100,180)
  text(indicator_time,100,200)
  */

  //replace cursor
  if (held_item == "old_cup" || held_item == "fresh_cup"){
    image(cursor_cup_image,mouseX,mouseY,5*chunk,5*chunk)
  } 
  else if (held_item == "old_milk" || held_item == "fresh_milk"){
    image(cursor_milk_image,mouseX,mouseY,5*chunk,5*chunk)
  } 
  else if (held_item == "old_boba" || held_item == "fresh_boba"){
    image(cursor_boba_image,mouseX,mouseY,5*chunk,5*chunk)
  } 
  else {
    image(cursor_image,mouseX,mouseY,5*chunk,5*chunk)
  }

}

function mouseClicked(){ //enable music
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
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
      if (recycled_cups >= 1){
        held_item = ("old_cup")
      }
      else{
        warning_indicator(17.8,0.1)
      }
    }
    else if (mouseY > 5*chunk && mouseY < 8*chunk) { //milk
      if (recycled_milk >= 1){
      held_item = ("old_milk")
      }
      else{
        warning_indicator(17.8,1.1)
      }
    }
    else if (mouseY > 9*chunk && mouseY < 12*chunk) { //boba
      if (recycled_boba >= 1){
      held_item = ("old_boba")
      }
      else{
        warning_indicator(17.8,2.1)
      }
    }
  }
}

function mouseReleased() {
  //out button
  if (mouseX >16.4*chunk && mouseX <20*chunk && mouseY >11.4 && mouseY <12.6*chunk && drink_complete == true){ //submit drink detection
    money += this_sale + tip
    if (this_sale == 0){ //if player made no money on this sale, play offputting sound
      button_sound_bad.play()
    }
    else{
      button_sound.play()
    }
      //give old ingredients
    old_seed = int(random(3,9))//selects intager between 3 and 8, 3 cup, 4 milk, 5 boba, 6 cup and milk, 7 milk and boba, 8 cup and boba
    if (old_seed>2){
      if (old_seed == 3 || old_seed == 6 || old_seed == 8){
        recycled_cups +=1
      }
      if (old_seed == 4 || old_seed == 6 || old_seed == 7){
        recycled_milk +=1
      }
      if (old_seed == 5 || old_seed == 7 || old_seed == 8){
        recycled_boba +=1
      }
    }
    ResetGame()
  }

  //segway from screens to gameplay
  if ((screen_tracker==1)||(screen_tracker>1 && mouseX > 11.6*chunk && mouseX < 13.4*chunk && mouseY > 4.8*chunk && mouseY < 6.6*chunk)){
    button_sound.play()
    screen_tracker = 0
    millis_prev_game = millis()
    money = 10
    
    recycled_cups=0
    recycled_milk=0
    recycled_boba=0
    
    ResetGame()
  }

  //load prep station
  if (mouseX>10*chunk && mouseX<15*chunk && mouseY>5*chunk && mouseY<13*chunk){ //mouse released on prep station
    if (held_item != "old_cup" && held_item != "fresh_cup" && prep_cup==false){
      held_item=("null"); //nothing will happen if you try to use milk or boba without a cup
    } 
    else if ((held_item == "old_cup" || held_item == "fresh_cup")&&prep_cup==false){
      prep_cup=true
      cup_sound.play()
      //old/new cost
      if (held_item == "old_cup"){
        anger += 1
        recycled_cups -= 1
      }
      else{
        CalculateCash(1); //costs $1
      }
    }
    else if ((held_item == "old_milk" || held_item == "fresh_milk")&&(prep_milk==0 || prep_milk==1)){
      prep_milk += 1
      //play correct sound
      if (prep_milk == 1){
        milk_1_sound.play()
      }
      else {
        milk_2_sound.play()
      }
      //old/new cost
      if (held_item == "old_milk"){
        anger += 1
        recycled_milk -= 1
      }
      else{
        CalculateCash(1.2);//costs $1.20
      }
    }
    else if ((held_item == "old_boba" || held_item == "fresh_boba")&&(prep_boba==0 || prep_boba==1)){
      prep_boba +=1
      boba_sound.play()
      //old/new cost
      if (held_item == "old_boba"){
        anger += 1
        recycled_boba -= 1
      }
      else{
        CalculateCash(1.5);//costs $1.50
      }
    }
    
  }
  held_item=("null"); //mouse not released on prep station or item placed in prep station
  
  //truncate money
  money = (round(money,2))

  //calculate prep percentage
  prep_percentage = 0
  if (prep_cup){ prep_percentage += 1/5}
  prep_percentage += prep_milk/5
  prep_percentage += prep_boba/5

}

function ResetGame() {
  held_item = ("null");
  prep_cup = false;
  prep_milk = 0; //requires two scoops
  prep_boba = 0; //requires two scoops
  anger = 0; //two bad items and no tip, three bad items and no pay.
  this_sale = 6;
  tip = 1;
  drink_complete = false;
}

function CalculateCash(cost) {
  if (money >= cost) {
    money -= cost;
  }
  else {
    money = 10;
    ResetGame();
  }
}

function warning_indicator(x,y){
  if (screen_tracker == 0){
    indicator_x=x*chunk;
    indicator_y=y*chunk;
    indicator_time=millis()+5000
  }
}
