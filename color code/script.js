const hexInput = document.getElementById("hexInput");
const preview = document.getElementById("colorPreview");
const colorNameEl = document.getElementById("colorName");
const rgbValueEl = document.getElementById("rgbValue");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const errorMsg = document.getElementById("errorMsg");
const darkToggle = document.getElementById("darkToggle");

const colorMap = {
  "#4A7FA7": "Steel Blue",
  "#FF5733": "Vivid Orange",
  "#000000": "Black",
  "#FFFFFF": "White",
  "#FF0000": "Red",
  "#00FF00": "Lime Green",
  "#0000FF": "Blue",
};

function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

function hexToRGB(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `RGB(${r}, ${g}, ${b})`;
}

hexInput.addEventListener("input", () => {
  let value = hexInput.value.trim();

  if (!value.startsWith("#")) {
    value = "#" + value;
  }

  value = value.toUpperCase();
  hexInput.value = value;

  copyMsg.textContent = "";
  errorMsg.textContent = "";

  if (!isValidHex(value)) {
    errorMsg.textContent = "Invalid HEX color code";
    preview.style.background = "#ddd";
    colorNameEl.textContent = "Color Name";
    rgbValueEl.textContent = "RGB";
    return;
  }

  preview.style.background = value;
  colorNameEl.textContent = colorMap[value] || "Custom Color";
  rgbValueEl.textContent = hexToRGB(value);
});

copyBtn.addEventListener("click", () => {
  const hex = hexInput.value;

  if (!isValidHex(hex)) return;

  navigator.clipboard.writeText(hex).then(() => {
    copyMsg.textContent = "Copied to clipboard ✔";
  });
});

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
