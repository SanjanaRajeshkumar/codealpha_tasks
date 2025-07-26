function appendValue(val) {
  const display = document.getElementById("display");
  display.value += val;
  updatePreview();
}

function clearDisplay() {
  document.getElementById("display").value = '';
  document.getElementById("preview")?.remove(); 
}

function deleteLast() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
  updatePreview();
}

function calculateResult() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
    document.getElementById("preview")?.remove();
  } catch {
    alert("Invalid input!");
  }
}

function updatePreview() {
  let preview = document.getElementById("preview");
  const input = document.getElementById("display").value;

  if (!preview) {
    preview = document.createElement("p");
    preview.id = "preview";
    preview.style.color = "gray";
    preview.style.textAlign = "right";
    preview.style.marginTop = "8px";
    preview.style.fontSize = "16px";
    document.getElementById("display").insertAdjacentElement("afterend", preview);
  }

  try {
    if (input.trim() !== '') {
      const result = eval(input);
      preview.textContent = `= ${result}`;
    } else {
      preview.textContent = '';
    }
  } catch {
    preview.textContent = '';
  }
}

function copyToClipboard() {
  const display = document.getElementById("display");
  if (display.value) {
    navigator.clipboard.writeText(display.value);
    alert("Copied to clipboard!");
  }
}
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const allowed = "0123456789+-*/.";

  if (allowed.includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
