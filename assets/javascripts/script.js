let rgbInput = document.getElementById("rgb");
let hexInput = document.getElementById("hex");
let icon = document.getElementById("icon");
let rgbClipboard = document.getElementById("clipboard-button-rgb");
let hexClipboard = document.getElementById("clipboard-button-hex");
let rgbTooltip = document.getElementById("tooltip-rgb");
let hexTooltip = document.getElementById("tooltip-hex");

window.addEventListener('load', function () {
    rgbInput.value = "rgb()";
    hexInput.value = "#";
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

function removeWhitespace(value) {
    return value.replace(/\s/g, '');
}

function toRgb() {
    let hexCode = removeWhitespace(hexInput.value);
    let hexRegex = /^#?[A-Fa-f0-9]{6}$/;
    let rgbArr = [];
    if (hexRegex.test(hexCode)) {
        valid(hexInput);
        hexCode = hexCode.split("#")[1] || hexCode;
        for (let i = 0; i < hexCode.length; i += 2) {
            rgbArr.push(parseInt(hexCode[i] + hexCode[i + 1], 16));
        }
        icon.classList.add("icon-animation-rgb");
        hexInput.value = removeWhitespace(hexInput.value);
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
    let rgbCode = removeWhitespace(rgbInput.value);
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbRegex2 = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/;
    let hex = "#";
    if (rgbRegex1.test(rgbCode) || rgbRegex2.test(rgbCode)) {
        rgbCode = rgbCode.replace(/[rgb()]+/g, "") || rgbCode;
        rgbCode = rgbCode.split(",");
        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });
        if (condition) {
            valid(rgbInput);
            rgbCode.forEach(value => {
                value = parseInt(value).toString(16);
                hex += value.lenght == 1 ? "0" + value : value;
            });
            icon.classList.add("icon-animation-hex");
            rgbInput.value = removeWhitespace(rgbInput.value);
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

rgbClipboard.addEventListener("click", function () {
    rgbInput.select();
    rgbInput.setSelectionRange(0, 99999);
    rgbInput.value = rgbInput.value.includes("rgb") ? rgbInput.value : "rgb(" + rgbInput.value + ")";
    navigator.clipboard.writeText(rgbInput.value);
    rgbTooltip.innerHTML = "Copied: " + rgbInput.value;
});

hexClipboard.addEventListener("click", function () {
    hexInput.select();
    hexInput.setSelectionRange(0, 99999);
    hexInput.value = hexInput.value.includes("#") ? hexInput.value : "#" + hexInput.value;
    navigator.clipboard.writeText(hexInput.value);
    hexTooltip.innerHTML = "Copied: " + hexInput.value;
});

rgbClipboard.addEventListener("mouseout", function () {
    rgbTooltip.innerHTML = "Copy to clipboard";
});

hexClipboard.addEventListener("mouseout", function () {
    hexTooltip.innerHTML = "Copy to clipboard";
});