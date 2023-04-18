let rgbInput = document.getElementById("rgb");
let hexInput = document.getElementById("hex");
let icon = document.getElementById("icon");

window.addEventListener('load', () => {
    rgbInput.value = "";
    hexInput.value = "";
});

// If element is valid (good rgb or hex format) => normal color
function valid(element) {
    element.style.color = "#000";
}

// If element is invalid (bad rgb or hex format) => red color
function invalid(element, otherElement) {
    element.style.color = "#ff0000";
    otherElement.value = 0;
}

function toRgb() {
    let hexCode = hexInput.value;
    let hexRegex = /^#?[A-Fa-f0-9]{6}$/;
    let rgbArr = [];
    if(hexRegex.test(hexCode)) {
        valid(hexInput);
        hexCode = hexCode.split("#")[1] || hexCode;
        for(let i=0; i< hexCode.length; i+=2) {
            rgbArr.push(parseInt(hexCode[i] + hexCode[i+1], 16));
        }
        icon.classList.add("icon-animation-rgb");
        rgbInput.value = "rgb(" + rgbArr + ")";
        document.body.style.backgroundColor = "rgb(" + rgbArr + ")";
        setTimeout(() => {
            icon.classList.remove("icon-animation-rgb");
        }, "1000");
    } else {
        invalid(hexInput, rgbInput);
    }
}

function toHex() {
    let rgbCode = rgbInput.value;
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbRegex2 = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/;
    let hex = "#";
    if(rgbRegex1.test(rgbCode) || rgbRegex2.test(rgbCode)) {
        rgbCode = rgbCode.replace(/[rgb()]+/g,"") || rgbCode;
        rgbCode = rgbCode.split(",");
        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });
        if(condition) {
            valid(rgbInput);
            rgbCode.forEach(value => {
                value = parseInt(value).toString(16);
                hex += value.lenght == 1? "0"+value : value;
            });
            icon.classList.add("icon-animation-hex");
            hexInput.value = hex;
            document.body.style.backgroundColor = hex;
            setTimeout(() => {
                icon.classList.remove("icon-animation-hex");
            }, "1000");
        } else {
            invalid(rgbInput, hexInput);
        }
    } else {
        invalid(rgbInput, hexInput);
    }
}