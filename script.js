let rgbInput = document.getElementById("rgb");
let hexInput = document.getElementById("hex");

window.addEventListener('load', () => {
    rgbInput.value = "";
    hexInput.value = "";
});


// If element is valid (good rgb or hex format) => normal color
function valid(element) {
    element.style.color = "#202040";
}

// If element is invalid (bad rgb or hex format) => red color
function invalid(element, otherElement) {
    element.style.color = "#f04624";
    otherElement.value = 0;
}

function toRgb() {
    let hexCode = hexInput.value;
    let rgbArr = [];
    if(/^#?[A-Fa-f0-9]{6}$/.test(hexCode)) {
        valid(hexInput);
        hexCode = hexCode.split("#")[1] || hexCode;
        for(let i=0; i< hexCode.length; i+=2) {
            rgbArr.push(parseInt(hexCode[i] + hexCode[i+1], 16));
        }
        rgbInput.value = "rgb(" + rgbArr + ")";
        document.body.style.backgroundColor = "rgb(" + rgbArr + ")";
    } else {
        invalid(hexInput, rgbInput);
    }
}