
// get grid container dom element
const GRID_BOX = document.querySelector('#grid-container');

//instanstiate variable for number of squares to draw
let pixelNumber = 625;

// color picker
let startColor = document.querySelector('#colorPicker');
let startSat = document.querySelector('#sat')
let startBright = document.querySelector('#brightness');
let hue = 0;
let sat = 100;
let brightness = 50;
let displayColor = document.querySelector('#showColor');

displayColor.style.backgroundColor = `hsl(${hue}, ${sat}%, ${brightness}%)`;

// set hue according to input
function setHue() {
  hue = this.value;
  displayColor.style.backgroundColor = `hsl(${hue}, ${sat}%, ${brightness}%)`;
}

startColor.addEventListener('change', setHue);
startColor.addEventListener('mousemove', setHue);

// set saturation according to input
function setSat() {
  sat = this.value;
  displayColor.style.backgroundColor = `hsl(${hue}, ${sat}%, ${brightness}%)`;
}

startSat.addEventListener('change', setSat);
startSat.addEventListener('mousemove', setSat);

// set brightness according to input
function setBright() {
  brightness = this.value;
  displayColor.style.backgroundColor = `hsl(${hue}, ${sat}%, ${brightness}%)`;
}

startBright.addEventListener('change', setBright);
startBright.addEventListener('mousemove', setBright);

//mobile check
window.mobileCheck = function() {
  return window.innerWidth <= 800;
};


//function (loop) to create boxes
function createGrid() {
  for (let i = 0; i < pixelNumber; i++) {
    drawBox();
  }
  // mobile check
  let k = window.mobileCheck();

  makeLength(k);

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
function makeLength(mobile) {
  const LENGTH = 530 / Math.sqrt(pixelNumber);
  const   MOBLENGTH = 320 / Math.sqrt(pixelNumber);

  let pixels = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixels.length; i++) {
    if (mobile) {
      pixels[i].style.width =  MOBLENGTH + 'px';
      pixels[i].style.height =  MOBLENGTH + 'px';
    } else {
    pixels[i].style.width =  LENGTH + 'px';
    pixels[i].style.height =  LENGTH + 'px';
    }
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

//color options
let rainbow = false;
let gradient = false;
let eraser = false;
let wasRainbow = false; //to store for rainbow value when toggling eraser
let wasGradient = false; // to store gradient value when toggling eraser

const BUTTON = document.querySelectorAll('button'); //node list
const BUTTONS = Array.from(BUTTON); // make array
BUTTON.forEach(button => button.addEventListener('click', togFunc));

function togFunc(e) {
  if (this.name === 'rainbow') {
    rainbow = !rainbow;
    if (rainbow) {
      eraser = false;
      let a = document.querySelector('.eraser'); //style eraser button
      if (a.classList.contains('pressed')) {
        a.classList.remove('pressed');
      }
      this.classList.add('pressed');
    } else {
      this.classList.remove('pressed');
    }
  }
  if (this.name === 'gradient') {
    gradient = !gradient;
    if (gradient) {
      brightness = 100;
      eraser = false;
      let b = document.querySelector('.eraser'); //style eraser button
      if (b.classList.contains('pressed')) {
        b.classList.remove('pressed');
      }
      this.classList.add('pressed');
    } else {
      this.classList.remove('pressed');
    }
  }
  if (this.name === 'eraser') {
    eraser = !eraser;
    if (eraser) {
      wasGradient = gradient;
      wasRainbow = rainbow;
      gradient = false;
      rainbow = false;
      this.classList.add('pressed');
    } else {
      gradient = wasGradient;
      rainbow = wasRainbow;
      this.classList.remove('pressed');
    }
  }
}

function readyPixels() {
  let pixels = document.getElementsByClassName('pixel');
  let pix = Array.from(pixels);


  const draw = function(e) {
    if(!isDrawing) return; // won't draw

    if (e.pointerType === 'touch') { ///mobile section
      let x = e.clientX;
      let y = e.clientY;
      let targ = document.elementFromPoint(x, y);
      let buul = targ.classList.contains('pixel');
      if (buul) {
        //
        if (!eraser) {
          targ.style.backgroundColor=`hsl(${hue}, ${sat}%, ${brightness}%)`;
          displayColor.style.backgroundColor = `hsl(${hue}, ${sat}%, ${brightness}%)`;
          //e.target.globalCompositeOperation = 'lighter'; figure out how to do some things
          if (rainbow) {
            hue++;
          }
          if (gradient) { // maybe come back later
            if (brightness >= 50){
              brightness--;
            } else {
              brightness = 90;
            }
          }
        } else {
          targ.style.backgroundColor = '#fff';
        }
        // end mobile section
      }

    }

    if (!eraser) {
      e.target.style.backgroundColor=`hsl(${hue}, ${sat}%, ${brightness}%)`;
      displayColor.style.backgroundColor = `hsl(${hue}, ${sat}%, ${brightness}%)`;
      //e.target.globalCompositeOperation = 'lighter'; figure out how to do some things
      if (rainbow) {
        hue++;
      }
      if (gradient) { // not finished!
        if (brightness >= 50){
          brightness--;
        } else {
          brightness = 90;
        }
      }
    } else {
      e.target.style.backgroundColor = '#fff';
    }

  }

  pix.forEach(pixel => pixel.style.backgroundColor='#fff');


  window.addEventListener('mousedown', () => isDrawing = true);
  window.addEventListener('pointerdown', () => isDrawing = true);
  pix.forEach(pixel => pixel.addEventListener('mousemove', draw)); // draws when mousedown
  pix.forEach(pixel => pixel.addEventListener('pointermove', draw, (e) => e.preventDefault())); //mobile
  window.addEventListener('mouseup', () => isDrawing = false);
  window.addEventListener('pointerup', () => isDrawing = false);
}
const clear = document.querySelector('#clear');
clear.addEventListener('click', readyPixels);
