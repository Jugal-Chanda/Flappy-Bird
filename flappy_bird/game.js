cvs = document.getElementById("mycanvas");
ctx = cvs.getContext("2d");


const ground = new Image();
ground.src = "img/bird.png";

const unit = 20;

const gravity = 10;
pipeup = [];
pipedown  = [];


var heightup = 0;
var heightdown = 0;
var down_y = 28;
var up_y = 2;

var score = 0;

function pipe_height() {
    var height1 = Math.floor(Math.random()*21);
    var y_block = height1 + 4 + 2;
    var height2_max = 28-y_block;
    var height2 = Math.floor(Math.random()*height2_max );
    heightup = height1;
    heightdown = height2;
    down_y = 28-heightdown;
 } 

 

pipe_height();

pipeup[0] = {
    x : 28 * unit,
    y :  up_y * unit,
    upper_height : heightup * unit
}
pipedown[0] = {
    x :28 * unit,
    y : down_y * unit,
    lower_height : heightdown * unit
}

bird = {
    x : 10 * unit,
    y : 15 * unit,
}


document.addEventListener("keydown",move_bird);

 function move_bird(event)
 {
     let key_code = event.keyCode;

     if(key_code == 38)
     {
         bird.y = bird.y - 2*unit;
     }else if (key_code == 40) {
         bird.y = bird.y + 2 * unit; 
     }

 }


function collision_with_pipe() {
    birdX = bird.x +(2*unit);
    birdY = bird.y ;
    ctx.fillStyle = "red";

    for (let index = 0; index < pipeup.length; index++) {
        pipex = pipeup[index].x - (1*unit);
        pipey = pipeup[index].y;
        pipeup_height = pipeup[index].upper_height + (1.5*unit);
        pipey = pipedown[index].y - (2.5* unit);

        if (birdY < 2*unit || birdY > (26 * unit)) {
            if (birdY < 2*unit) {
                ctx.fillRect(0,0,30*unit,2*unit);
            }else{
                ctx.fillRect(0,28*unit,30*unit,2*unit)
            }
            return true;
        }else{
            if ((birdX>pipex && birdX  < (pipeup[index].x +(3*unit)))) {
                if (birdY < pipeup_height) {
                    ctx.fillRect(pipeup[index].x,pipeup[index].y,2*unit,pipeup[index].upper_height);
                    return true;
                }else if(birdY > pipey){
                    ctx.fillRect(pipedown[index].x,pipedown[index].y,2*unit,pipedown[index].lower_height);
                    return true;
                }
            }
        }
       
    }

    return false;


}


function draw()
{
    // whole body
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0,0,30*unit,30*unit);
    //footer
    ctx.fillStyle = "#ffa31a";
    ctx.fillRect(0,28*unit,30*unit,2*unit);
    //header
    ctx.fillRect(0,0,30*unit,2*unit);
    //bird
    ctx.drawImage(ground,bird.x,bird.y,3*unit,3*unit);
    
    for (let index = 0; index < pipeup.length; index++) {
        
        ctx.fillStyle = "#ffa31a";
        ctx.fillRect(pipeup[index].x,pipeup[index].y,2*unit,pipeup[index].upper_height);
        ctx.fillStyle = "#ffa31a";
        ctx.fillRect(pipedown[index].x,pipedown[index].y,2*unit,pipedown[index].lower_height);        
    }
    var cheak = collision_with_pipe();
    if(cheak == true)
    {
        clearInterval(game);
    }

    for (let index = 0; index < pipeup.length; index++) {

        if(pipeup[index].x<(10*unit) && pipeup[index].x >(8*unit)){
            score++;
        }
        pipeup[index].x = pipeup[index].x -unit;
        pipedown[index].x = pipedown[index].x - unit;
        
    }
    
    lengthOfPipe = pipeup.length;
    lengthOfPipe = lengthOfPipe - 1;
    var next_pipe_x = pipeup[lengthOfPipe].x + 13*unit;

    pipe_height();
    newpossition_up = {
        x : next_pipe_x ,
        y : up_y *unit,
        upper_height : heightup * unit
    }
    newpossition_down = {
        x : next_pipe_x,
        y : down_y * unit,
        lower_height : heightdown * unit
    }
        
    
    pipeup.push(newpossition_up);
    pipedown.push(newpossition_down);



    if(pipeup[0].x<0){
        pipeup.shift();
        pipedown.shift();
    }

    bird.y = bird.y + gravity;

    ctx.fillStyle = "red";
    ctx.font = "25px Changa one";
    ctx.fillText("Score :"+score,0.5*unit,unit);

}


let game = setInterval(draw,100);




