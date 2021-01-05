
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
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
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
  window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
  });
  pix.forEach(pixel => pixel.addEventListener('mousemove', draw)); // draws when mousedown
  pix.forEach(pixel => pixel.addEventListener('touchmove', draw)); //mobile
  window.addEventListener('mouseup', () => isDrawing = false);
  window.addEventListener('touchend', (e) => {
    e.preventDefault();
    isDrawing = false
  });
}
const clear = document.querySelector('#clear');
clear.addEventListener('click', readyPixels);
