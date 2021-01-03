// get grid container dom element
const GRID_BOX = document.querySelector('#grid-container');

//instanstiate variable for number of squares to draw
let pixelNumber = 625;

// color picker
let startColor = document.querySelector('#colorPicker');
let hue = 0;
let displayColor = document.querySelector('#showColor');

displayColor.style.backgroundColor = `hsl(${hue}, 100%, ${50}%)`;

// set hue according to input
function setHue() {
  hue = this.value;
  displayColor.style.backgroundColor = `hsl(${hue}, 100%, ${50}%)`;
}

startColor.addEventListener('change', setHue);
startColor.addEventListener('mousemove', setHue);


//function (loop) to create boxes
function createGrid() {
  for (let i = 0; i < pixelNumber; i++) {
    drawBox();
  }
  makeLength();

  readyPixels();
}
createGrid();

// function to draw box
function drawBox() {
  let newBox = document.createElement('div');
  newBox.classList.add('pixel');
  GRID_BOX.appendChild(newBox);
}

// square root of pixelNumber * box length is container length. But the container length must be fixed
// pixel length is container length / sqr root of pixel pixelNumber
// function to determine pixel-box length and apply it to pixel class
function makeLength() {
  const LENGTH = 440 / Math.sqrt(pixelNumber);

  let pixels = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.width =  LENGTH + 'px';
    pixels[i].style.height =  LENGTH + 'px';

  }
}


// function to update number of pixels
function handleUpdate() {
temp = this.value;
pixelNumber = nearestSquare(temp);
createGrid();
}

// function to change pixelNumer to nearestSquare
function nearestSquare(input) {
  let i,j;
  for(i=j=input;Math.sqrt(i)%1!=0&&Math.sqrt(j)%1!=0;i++,j--);
  return Math.sqrt(i)%1==0?i:j;
}

//function to reset colorReset for when pixelnumbers are changed
function colorReset() {
  hue = startColor.value;
}

// change pixels
const pixelInput = document.querySelector('#pixNum');

pixelInput.addEventListener('change', handleUpdate);
pixelInput.addEventListener('change', colorReset);

// make pixels change color upon hovering and make pixels un colored when changing between pixel numbers or resetting.

let isDrawing = false; // won't draw by default

//rainbow
let rainbow = true;

function readyPixels() {
  let pixels = document.getElementsByClassName('pixel');
  let pix = Array.from(pixels);
  let light = 50;


  const draw = function(e) {
    if(!isDrawing) return; // won't draw
    e.target.style.backgroundColor=`hsl(${hue}, 100%, ${light}%)`;
    //e.target.globalCompositeOperation = 'lighter'; figure out how to do some things
    if (rainbow) {
      hue++;
    }
  }

  pix.forEach(pixel => pixel.style.backgroundColor='#fff');


  window.addEventListener('mousedown', () => isDrawing = true);
  pix.forEach(pixel => pixel.addEventListener('mousemove', draw)); // draws when mousedown
  //pix.forEach(pixel => pixel.addEventListener('mouseover', draw));

  //pix.forEach(pixel => pixel.addEventListener('mouseup', () => isDrawing = false));
  window.addEventListener('mouseup', () => isDrawing = false);
}


// plan: make buttons for options for colors, rainbow, erasing, (dark mode?), etc???
// colors options: color picker, rainbow, eraser. allow for manipulation of rainbow saturation and darkness;
// create color gradient option.
// also make color on click event;
