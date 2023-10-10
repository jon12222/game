let tank1, tank2, tankO, poopShoot1, poopShoot2, poopShootO, angle1, angle2, ground;
let tankSize = 25, resistance = 5, shell, shellSize = 5, maxSpeed = 149, minSpeed = 51, shellSpeed1 = 100, shellSpeed2 = 100, shellSpeedO = shellSpeed1;
let borderOut = 25,borderIn = 80;
let cnvW = 600;
let hitSound, shootSound, deathSound, resetSound, startVideo, ballsSound, titlePlayed = 0;
let num = 0, run = 1;
let vidLength = 8, start = 0;
let grain, fill, grainWidth = 10, grainLevel = 20, roughness = 0.4;
let hit = [], hitRadius = 50, hitSprite;
let tank1Score = 0, tank2Score = 0;


function preload(){
  startVideo = createVideo('Video.mp4');
  Titleimg = loadImage('Title.png');
  Titlesound = loadSound('Title.mp3');
  shootSound = loadSound('Shoot.mp3');
  hitSound = loadSound('Hit.mp3');
  deathSound = loadSound('Death.mp3');
  resetSound = loadSound('Reset.mp3');
  gameSound = loadSound('gameSound.mp3');
  ballsSound = loadSound('3 BIG BALLS.mp3');
}

function shoot(x, y, direction, speed, tank) {
  shell = new Sprite();
  shell.x = x;
  shell.y = y;
  shell.rotation = direction;
  shell.speed = speed;
  shell.diameter = shellSize;
  shell.collider = 'd';
  shell.colour = 'black';
  shell.overlaps(tank)
}

function setup() {
  startVid();
}
 

function startVid(){ //Screen 0
  startVideo.play();
  startVideo.size(cnvW, cnvW);
  if (frameCount % 60 == 0 && vidLength > 0) {
    vidLength--;
  } 
  if (kb.pressing('enter')){
    num = 1;
  }
  if (vidLength == 0){
    num = 1;
  }
}

function menu(){ //Screen 1
  createCanvas(cnvW, cnvW);
  background(Titleimg);
  text('Press Enter to Start',cnvW/2.5,cnvW/2);
  if (titlePlayed == 0){
  Titlesound.loop();
  startVideo.hide();
  startVideo.pause();
  titlePlayed = 1;
  }

if (kb.pressing('enter')){
  num = 2;
  gameSound.loop();
}
}

function game(){ //Screen 2
 
  Titlesound.stop();
  world.gravity.y = 10;
  createCanvas(cnvW, cnvW);
  text.size = 100;
  background('lightblue');
  text('Player 1: ' + tank2Score + '\nPlayer 2: ' + tank1Score, cnvW/2.5,30);
  

  if (start == 0){

  noStroke();
  grain = new Group();
  grain.colour = 'yellow';
  grain.w = grainWidth;
  grain.h = grainWidth;
  grain.collider = 's';
  
  fill = new Group();
  fill.colour = 'aqua';
  fill.collider = 'n';

  noStroke();
  new fill.Sprite(cnvW/2, cnvW-5*grainWidth, cnvW, 10*grainWidth);

  for (let i = 0; i < cnvW/grainWidth; i++){
    for (let j = 10; j < grainLevel; j++){
    new grain.Sprite((grainWidth/2 + i*grainWidth), (cnvW - grainWidth/2 - grainWidth*j));
    grainLevel = grainLevel + random(-roughness, roughness);
    
    }
  }

  tank1 = new Sprite();
  tank1.x = random(borderOut,cnvW/2-borderIn);
  tank1.y = 200;
  tank1.w = tankSize;
  tank1.h = tankSize/2;
  tank1.collider = 'd';
  tank1.colour = 'blue';
  tank1.drag = resistance;

  tankO = tank1;
  
  poopShoot1 = new Sprite();
  poopShoot1.w = tankSize/10;
  poopShoot1.h = tankSize/2;
  poopShoot1.collider = 'n';
  poopShoot1.colour = 'blue';

  poopShootO = poopShoot1;
  
  tank2 = new Sprite();
  tank2.x = random(cnvW/2+borderIn,cnvW-borderOut);
  tank2.y = 200;
  tank2.w = tankSize;
  tank2.h = tankSize/2;
  tank2.collider = 'd';
  tank2.colour = 'red';
  tank2.drag = resistance;
  
  poopShoot2 = new Sprite();
  poopShoot2.w = tankSize/10;
  poopShoot2.h = tankSize/2;
  poopShoot2.collider = 'n';
  poopShoot2.colour = 'red';
  
  ground = new Sprite();
  ground.x = cnvW/2;
  ground.y = cnvW;
  ground.w = cnvW*10;
  ground.h = 10;
  ground.collider = 's ';
  ground.colour = 'green';
  start = 1;
  }

  poopShoot1.x = tank1.x;
  poopShoot1.y = tank1.y;
  poopShoot1.offset.y = -(tankSize/2)/2;
  if (kb.pressing(RIGHT_ARROW) && tankO == tank1){
    poopShoot1.rotation += 0.5;
  } else if (kb.pressing(LEFT_ARROW) && tankO == tank1){
    poopShoot1.rotation -= 0.5;
  }

  poopShoot2.x = tank2.x;
  poopShoot2.y = tank2.y;
  poopShoot2.offset.y = -(tankSize/2)/2;
  if (kb.pressing('d') && tankO == tank2){
    poopShoot2.rotation += 0.5;
  } else if (kb.pressing('a') && tankO == tank2){
    poopShoot2.rotation -= 0.5;
  }
  
  if (kb.pressing('space') && toggle == 0 && shellLife == 0){
   shoot(tankO.x, tankO.y, poopShootO.rotation-90, shellSpeedO/10,tankO);
   toggle = 1;
   shellLife = 1;
   shootSound.play();
   if (tankO == tank1){
    tankO = tank2;
    poopShootO = poopShoot2;
    shellSpeedO = shellSpeed2;
   } else if (tankO == tank2){
    tankO = tank1;
    poopShootO = poopShoot1;
    shellSpeedO = shellSpeed1;
   }

  } else if (kb.pressing('space') == false){
    toggle = 0;
  } 
  if (kb.pressing(UP_ARROW)){
    if (shellSpeed1 <= maxSpeed && tankO == tank1){
      shellSpeed1++;
      shellSpeedO = shellSpeed1;
    }
  }
  if (kb.pressing(DOWN_ARROW)){
    if (shellSpeed1 >= minSpeed && tankO == tank1){
      shellSpeed1--;
      shellSpeedO = shellSpeed1;
    } 
  }
  if (kb.pressing('w')){
    if (shellSpeed2 <= maxSpeed && tankO == tank2){
      shellSpeed2++;
      shellSpeedO = shellSpeed2;
    }
  }
  if (kb.pressing('s')){
    if (shellSpeed2 >= minSpeed && tankO == tank2){
      shellSpeed2--;
      shellSpeedO = shellSpeed2;
    }
  }


  if (tankO == tank1){ //Player data
    circle(cnvW/20 - 10, cnvW/20,10);
   } else if (tankO == tank2){
    circle(cnvW - cnvW*3/20 - 10, cnvW/20,10);
   }

  text('Player 1\nPower: ' + shellSpeed1 + '\nDirection: ' + int(poopShoot1.rotation), cnvW/20, cnvW/20);
  text('Player 2\nPower: ' + shellSpeed2 + '\nDirection: ' + int(poopShoot2.rotation), cnvW - cnvW*3/20, cnvW/20);

  if (shellLife == 1){
    if (shell.collided(grain) || shell.collided(ground) || shell.collided(tankO)) {
      shell.remove();
      shellLife = 0;
      hitSound.play();

      if (shell.collided(tankO)){
        if (tankO == tank1){
          tank1Score++;
         } else if (tankO == tank2){
          tank2Score++;
         }
        deathSound.play();
        num = 3;
      }
    }
  }


}

function score(){ //Screen 3
  background('grey');
  stroke('white');

  if (tankO == tank2){
    text('Player 1 Wins!!!\n\nPress Enter to continue.', cnvW/2.5,60);
    if (tank1Score == 3){
      ballsSound.play();
      gameSound.stop();
    }
   } else if (tankO == tank1){
    text('Player 2 Wins!!!\n\nPress Enter to continue.', cnvW/2.5,60);
    if (tank2Score == 3){
      ballsSound.play();
      gameSound.stop();
    }
   }
  if (kb.pressing('Enter')){
    for (let i = grain.length; i > 0; i--){
      grain[i-1].remove();
    }
    if (tankO == tank2){
      tank1.remove();
      poopShoot1.remove();
      poopShoot2.remove();
     } else if (tankO == tank1){
      tank2.remove();
      poopShoot2.remove();
      poopShoot1.remove();
     }
    fill.remove();
    resetSound.play();
    num = 2;
    start = 0;
  }
  noStroke();
}

let toggle = 0, shellLife = 0;

function draw() {
  if (num == 0){
    startVid();
  } else if (num == 1){
    menu();
  } else if (num == 2){
    game();
  } else if (num == 3){
    score();
  } 

  }
