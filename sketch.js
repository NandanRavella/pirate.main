const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var boatAnimation = []
var boatSpritedata,boatSpritesheet

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("./assets/boat/boat.json")
  boatSpritesheet = loadImage("./assets/boat/boat.png")
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  console.log(boatSpritedata)
  console.log(boatSpritesheet)
 var  boatFrames = boatSpritedata.frames
  for (var i = 0 ; i< boatFrames.length; i++){
    var pos = boatFrames[i].position
    var img = boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img)
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display()
 
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for(var j = 0 ; j<boats.length;j++){
     var collision = Matter.SAT.collides(balls[i].body,boats[j].body)
     console.log(collision)
     if(collision.collided){
       boats[j].remove(j)
       World.remove(world,balls[i])
       balls.splice(i,1)
       i--
     }
    }

  }
  cannon.display();
  tower.display();
  showBoats();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall)
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
 if(ball.body.position.x > width || ball.body.position.y >= height -50){
   World.remove(world,ball.body)
   balls.splice(index,1)
 }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length -1].shoot()

  }
}

function showBoats(){
  if(boats.length > 0 ){
    if(boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300){
      var positions = [-130,-100,-120,-80]
      var position = random(positions)
      var boat = new Boat(width, height - 100,200,200,position, boatAnimation)
      boats.push(boat)
    }

    for (var i = 0; i < boats.length; i++) {
    Matter.Body.setVelocity(boats[i].body, {
      x: -0.9,
      y: 0
    });
    boats[i].display()
    boat[i].animate()
  }   
}
else{
  var boat = new Boat(width, height - 100,200,200,-100, boatAnimation)
      boats.push(boat)
      console.log(boats)
}
}


