var rocket, rocketImg, rocketcrash, rocketcrashImg;
var space, spaceImg;
var meteor, meteorImg, meteorGroup;
var star, starImg, starGroup;
var score = 0;
var white = [255, 255, 255];
var play = 1;
var gameState = play;
var end = 0;
var Starcollect = 0;

function preload() {
    spaceImg = loadImage("space.png");
    starImg = loadImage("star.png");
    rocketImg = loadImage("rocket.png");
    rocketcrashImg = loadImage("rocketcrash.jpeg");
    meteorImg = loadImage("meteor.png");
    
}

function setup() {
    createCanvas(600, 600);
    createEdgeSprites();
    space = createSprite(300, 300);
    space.addImage("space.png", spaceImg);
    space.scale = 0.3;
    rocket = createSprite(300, 300, 126, 126);
    rocket.addImage("rocket.png", rocketImg);
    rocket.scale = 0.015;
    rocketcrash=createSprite(300,300,30,30);
    rocketcrash.addImage("rocketcrash.jpeg", rocketcrashImg);
    rocketcrash.scale=0.5;

    rocketcrash.visible=false;

    meteor = new Group();
    star = new Group();



}

function draw() {
 

    if (gameState === play) {
        
        //rocketcrash.visible=false;

        spawnStar();
        spawnMeteor();

        //rocket.debug=true;
        space.velocityY = 2;
        if (space.y > 500) {
            space.y = 300;
        }
        if (keyDown("RIGHT_ARROW")) {
            rocket.velocityX = 3;
        }
        if (keyWentUp("RIGHT_ARROW")) {
            rocket.velocityX = 0;
        }
        if (keyDown("LEFT_ARROW")) {
            rocket.velocityX = -3;
        }
        if (keyWentUp("LEFT_ARROW")) {
            rocket.velocityX = 0;
        }
        if (keyDown("SPACE")) {
            rocket.velocityY = -6;
        }

        rocket.velocityY = rocket.velocityY + 0.6

        if (star != null && rocket.isTouching(star)) {
            star.destroy();
            Starcollect = Starcollect + 1;

        }
        if (meteor != null && rocket.isTouching(meteor)) {
            rocket.collide(meteor);
        }
        score = score + Math.round(getFrameRate() / 60);

        if(rocket.y<0 || rocket.y>600 ){
            gameState = end;
        }

    }


    



    drawSprites();

    if(gameState === end){
        rocketcrash.visible=true;
        rocket.velocityX=0;
        rocket.velocityY=0;
        space.velocityY=0;
        star.setVelocityYEach(0);
        meteor.setVelocityYEach(0);
        textSize(20);
        fill(white);
        text("GAME OVER!", 250, 500);
    }


    textSize(20);
    fill(white);
    text("Score: " + score, 480, 30);



    textSize(20);
    fill(white);
    text("Stars: " + Starcollect, 480, 60);

    function spawnMeteor() {
        if (frameCount % 200 === 0) {
            meteor = createSprite(600, 0, 25, 90);
            meteor.debug = true;
            //console.log("hello");
            meteor.x = Math.round(random(100, 500));
            meteor.addImage("meteor.png", meteorImg);
            meteor.scale = 0.045;
            meteor.rotation = 45;
            meteor.velocityY = 5;
            meteor.lifetime = 200
            meteor.depth = rocket.depth;
            rocket.depth = rocket.depth + 1;
            meteor.setCollider("circle", 0, 0, 90);
            //rocket.collide(meteor); 

        }
    }

    function spawnStar() {
        if (frameCount % 300 === 0) {
            star = createSprite(600, 0, 25, 90);
            //console.log("hello");
            star.x = Math.round(random(100, 500));
            star.addImage("star.png", starImg);
            star.scale = 0.075;
            star.rotation = 45;
            star.velocityY = 5;
            star.lifetime = 300
            star.setCollider("circle", 0, 0, 90);
            star.depth = rocket.depth;

        }
    }

    
}