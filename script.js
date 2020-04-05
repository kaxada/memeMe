let topTextInput,
    bottomTextInput,
    topTextSizeInput,
    bottomTextSizeInput,
    imageInput,
    generateBtn,
    canvas,
    ctx;

function generateMeme(img, topText, bottomText, toptextSize, bottomtextSize) {
    canvas.width = img.width; // set canvas width to image width
    canvas.height = img.height; // set canvas height to image height

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.drawImage(img, 0, 0); // draw the image starting from 0,0 of canvas

    // DRAW THE TEXTS
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';

    // toptext size
    fontSize = canvas.width * toptextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 15;

    // draw the top text
    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function(t, i) {
        ctx.fillText(t, canvas.width / 2, i * fontSize,
            canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width)
    })

    // bottomtext size
    fontSize = canvas.width * bottomtextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 15;

    // draw the bottom text
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function(t, i) {
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize,
            canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width)
    })
}

function init() {
    // grab the HTML tags 
    topTextInput = document.getElementById('top-text');
    bottomTextInput = document.getElementById('bottom-text');
    topTextSizeInput = document.getElementById('top-text-size-input');
    bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    imageInput = document.getElementById('image-input');
    generateBtn = document.getElementById('generate-btn');
    canvas = document.getElementById('meme-canvas');

    ctx = canvas.getContext('2d'); // specify whether canvas is 2D or 3D

    canvas.width = canvas.height = 0; // set canvas height and width to zero so that it disappear when there is no image

    // click handler
    generateBtn.addEventListener('click', function() {
        let reader = new FileReader(); // use the file reader API to read file of the user's computer
        reader.onload = function() {
            let img = new Image; // make a new image with Image object
            img.src = reader.result; // choose image source with src method
            generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value); // the last two parameters get the values of the arguments
        };
        reader.readAsDataURL(imageInput.files[0]); // select image to draw on canvas

    })
}

init();