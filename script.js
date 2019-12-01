var x, y, dot;
var numberDot = 6000;

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var img = new Image();
var tablePosition = [];
var arrayDot = [];
var positionMouseX, positionMouseY;
img.src = './nike.jpg';
img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var myImg = ctx.getImageData(0, 0, img.width, img.height);
    for (var t = 0; t < myImg.data.length; t += 4) {
        if (myImg.data[t] < 250 && myImg.data[t + 1] < 250 && myImg.data[t + 2] < 250) {
            var x = (t / 4) % img.width;
            var y = Math.floor((t / 4) / img.width);
            tablePosition.push({
                x: x, y: y
            })
            myImg.data[t] = 255;
            myImg.data[t + 1] = 255;
            myImg.data[t + 2] = 255;


        }

    }

    ctx.putImageData(myImg, 0, 0); // Image data is adjusted according to context
    for (var i = 0; i < numberDot; i++) {

        let random = Math.floor(Math.random() * tablePosition.length);

        dot = {
            x: tablePosition[random].x,
            y: tablePosition[random].y,
            radius: 1,
            posInitX: tablePosition[random].x,
            posInitY: tablePosition[random].y
        };
        arrayDot.push(dot);
        drawDot(arrayDot[i]);

    }
    window.requestAnimationFrame(moveDot);

};


function drawDot(dot) {

    ctx.fillStyle = getRandomColor();
    ctx.fillRect(dot.x, dot.y, dot.radius, dot.radius);
}

function moveDot() {
    ctx.clearRect(0, 0, img.width, img.height);
    for (var i = 0; i < numberDot; i++) {
        var distanceDeplacement = 50;
        var radiusAction = 15;
        if (
            positionMouseX > arrayDot[i].posInitX - radiusAction &&
            positionMouseX < arrayDot[i].posInitX + radiusAction &&
            positionMouseY > arrayDot[i].posInitY - radiusAction &&
            positionMouseY < arrayDot[i].posInitY + radiusAction
        ) {
            console.log('couou')

            if (arrayDot[i].x > arrayDot[i].posInitX + 5) {
                arrayDot[i].x -= Math.random() * distanceDeplacement;
            } else if (arrayDot[i].x < arrayDot[i].posInitX + 5) {
                arrayDot[i].x += Math.random() * distanceDeplacement;
            }
            if (arrayDot[i].y > arrayDot[i].posInitY + 5) {
                arrayDot[i].y -= Math.random() * distanceDeplacement;
            } else if (arrayDot[i].y < arrayDot[i].posInitY + 5) {
                arrayDot[i].y += Math.random() * distanceDeplacement;
            }
        } else {
            if (arrayDot[i].x > arrayDot[i].posInitX + 5) {
                arrayDot[i].x -= Math.random() * 2;
            } else if (arrayDot[i].x < arrayDot[i].posInitX + 5) {
                arrayDot[i].x += Math.random() * 2;
            }
            if (arrayDot[i].y > arrayDot[i].posInitY + 5) {
                arrayDot[i].y -= Math.random() * 5;
            } else if (arrayDot[i].y < arrayDot[i].posInitY + 5) {
                arrayDot[i].y += Math.random() * 5;
            }
        }

        drawDot(arrayDot[i])
    }

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

canvas.addEventListener('mousemove', function (e) {
    positionMouseX = e.clientX;
    positionMouseY = e.clientY;
});
