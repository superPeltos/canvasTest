

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var img = new Image();
var tablePosition = [];
var arrayDot = [];
var x, y,dot;
var numberDot = 5000;
var positionMouseX,positionMouseY;

img.onload = function() {
    ctx.drawImage(img, 0, 0,img.width,img.height);
    var myImg =ctx.getImageData(0, 0, img.width, img.height);
    for (var t=0;t< myImg.data.length;t+=4) {
        if(myImg.data[t] < 250  && myImg.data[t+1] < 250 && myImg.data[t+2] < 250){
            var x = (t / 4) % img.width;
            var y = Math.floor((t / 4) / img.width);
            tablePosition.push({
                x:x,y:y
            })
            myImg.data[t] = 255;
            myImg.data[t+1]= 255;
            myImg.data[t+2]= 255;


        }

    }

    ctx.putImageData(myImg,0,0); // Image data is adjusted according to context
    for(var i=0;i< numberDot;i++){

        let random = Math.floor(Math.random() * tablePosition.length);

        dot = { x: tablePosition[random].x, y: tablePosition[random].y, radius: 1 ,posInitX :tablePosition[random].x,posInitY :tablePosition[random].y};
        arrayDot.push(dot);
        drawDot(arrayDot[i]);

    }
    window.requestAnimationFrame(moveDot);

};
img.src = './nike.jpg';
function drawDot(dot) {

    ctx.fillStyle = getRandomColor();
    ctx.fillRect(dot.x, dot.y, dot.radius, dot.radius);
}

function moveDot() {
    ctx.clearRect(0, 0, img.width, img.height);
    for(var i=0;i< numberDot;i++) {
        // Find the x and y values of the dot based on the direction it is to move.
        let random = Math.floor(Math.random() * tablePosition.length);

        // dot = { x: tablePosition[random].x, y: tablePosition[random].y, radius: 2 };
        // drawDot(dot)

        //
        // if(arrayDot[i].y > arrayDot[i].posInitY + 5){
        //     arrayDot[i].y -= Math.random() * 5;
        // }else if(arrayDot[i].y < arrayDot[i].posInitY + 5){
        //     arrayDot[i].y += Math.random() * 5;
        // }

        if(positionMouseX === arrayDot[i].posInitX){
            console.log('couou')
            if(arrayDot[i].x > arrayDot[i].posInitX + 5){
                arrayDot[i].x -= Math.random() * 500;
            }else if(arrayDot[i].x < arrayDot[i].posInitX + 5){
                arrayDot[i].x += Math.random() * 500;
            }
        }else{
            if(arrayDot[i].x > arrayDot[i].posInitX + 5){
                arrayDot[i].x -= Math.random() * 2;
            }else if(arrayDot[i].x < arrayDot[i].posInitX + 5){
                arrayDot[i].x += Math.random() * 2;
            }
        }


        //arrayDot[i].y += Math.random() * 1;
        drawDot(arrayDot[i])
    }

    // Draw the dot in its new position.


    // If we hit a boundary in some direction, we reverse the movement in the
    // direction that caused the collision.


    // Render it again
    window.requestAnimationFrame(moveDot);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

canvas.addEventListener('mousemove', function(e){
        positionMouseX = e.clientX;
        positionMouseY = e.clientY;
});
