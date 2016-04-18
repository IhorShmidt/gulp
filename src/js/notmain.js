var nrImg = 6; // the number of img , I only have 6
var Vect = []; // picture array
var mytime; // timer
var IntSeconds = 10; //the seconds between the imgs ** Basic value

window.onload = function Load() {

    imgVisible = 0; //the img visible
    Vect[0] = document.getElementById("Img1");
    Vect[0].style.visibility = "visible";

    document.getElementById("S" + 0).style.visibility = "visible";

    for (var i = 1; i < nrImg; i++) {
        Vect[i] = document.getElementById("Img" + (i + 1));
        document.getElementById("S" + i).style.visibility = "visible";
    }

    document.getElementById("S" + 0).style.backgroundColor = "rgba(255, 255, 255, 0.90)";
    document.getElementById("SP" + imgVisible).style.visibility = "visible";

    mytime = setInterval(Timer, IntSeconds * 1000);

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 37) {
            prev();
        }
        if (event.keyCode === 39) {
            next();
        }
    });
}

function Timer() {
    imgVisible++;
    if (imgVisible == nrImg)
        imgVisible = 0;
    Effect();
}

function next() {
    imgVisible++;
    if (imgVisible == nrImg)
        imgVisible = 0;
    Effect();

    clearInterval(mytime);
    mytime = setInterval(Timer, IntSeconds * 1000);
}

function prev() {
    imgVisible--;
    if (imgVisible == -1)
        imgVisible = nrImg - 1;
    Effect();

    clearInterval(mytime);
    mytime = setInterval(Timer, IntSeconds * 1000);
}

function Effect() {
    for (var i = 0; i < nrImg; i++) {
        Vect[i].style.opacity = "0"; //to add the fade effect
        Vect[i].style.visibility = "hidden";

        document.getElementById("S" + i).style.backgroundColor = "rgba(0, 0, 0, 0.70)";
        document.getElementById("SP" + i).style.visibility = "hidden";
    }
    Vect[imgVisible].style.opacity = "1";
    Vect[imgVisible].style.visibility = "visible";
    document.getElementById("S" + imgVisible).style.backgroundColor = "rgba(255, 255, 255, 0.90)";
    document.getElementById("SP" + imgVisible).style.visibility = "visible";
}

function userTime() {
    var usrInput = document.getElementById('bottom-input').value;

    if (!isNaN(usrInput) && usrInput != '') {
        IntSeconds = usrInput;
        clearInterval(mytime);
        mytime = setInterval(Timer, IntSeconds * 1000);
    } else {
        document.getElementById('bottom-input').value = 'Please enter number';
    }
}

function clearInput() {
    document.getElementById('bottom-input').value = '';
}
