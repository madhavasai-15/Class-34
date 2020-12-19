var ball, db, position;

function setup(){
    createCanvas(500,500);

    db = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var locData = db.ref("ball/position");
    locData.on("value", readPos, showErr);
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
        drawSprites();
    }
}

function changePosition(x,y){

   db.ref("ball/position").set({
        x: position.x + x,
        y: position.y + y
   });

}

function readPos(data){
    position = data.val();

    ball.x = position.x;
    ball.y = position.y;
}

function showErr(){
    console.log("ERROR");
}


/*
.ref() - refers to the location of the value that you want in database

.on() - READ - turns on a listener - listens to the changes in the value that you have referred to
                1. reads the value
                2. shows the error
.set() - WRITE/UPDATE
*/
