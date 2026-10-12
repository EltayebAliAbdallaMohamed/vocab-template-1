let data = null;
let index = 0;

// DOM elements
const wordEl = document.getElementById("word");
const exampleEl = document.getElementById("example");
const arabicEl = document.getElementById("arabic");
const counterEl = document.getElementById("counter");
const pageTitleEl = document.getElementById("pageTitle");

const playEnglishBtn = document.getElementById("playEnglish");
const playArabicBtn = document.getElementById("playArabic");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const autoTTS = document.getElementById("autoTTS");

// Load JSON file
fetch("data.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    pageTitleEl.textContent = data.title;
    loadWord();
  })
  .catch(err => console.error("Error loading JSON:", err));

// Load current word
function loadWord() {
  const item = data.items[index];
  speechSynthesis.cancel();


  wordEl.textContent = item.word;
  exampleEl.textContent = item.example;
  arabicEl.textContent = item.arabic;

  counterEl.textContent = `${index + 1} / ${data.items.length}`;

  // AUTO English TTS ONLY if checkbox is checked
  if (autoTTS.checked) {
    speakEnglishFull(item);
  }
}

// English TTS: word → pause → example
function speakEnglishFull(item) {
  const wordUtter = new SpeechSynthesisUtterance(item.word);
  wordUtter.lang = "en-US";

  wordUtter.onend = () => {
    const exampleUtter = new SpeechSynthesisUtterance(item.example);
    exampleUtter.lang = "en-US";
    speechSynthesis.speak(exampleUtter);
  };

  speechSynthesis.speak(wordUtter);
}

// Arabic TTS: translation only
function speakArabicFull(item) {
  const utter = new SpeechSynthesisUtterance(item.arabic);
  utter.lang = "ar-SA";
  speechSynthesis.speak(utter);
}

// Play English button (manual always works)
function handlePlayEnglish() {
  const item = data.items[index];
  speechSynthesis.cancel();

  speakEnglishFull(item);
}

// Play Arabic button (manual always works)
function handlePlayArabic() {
  const item = data.items[index];
  speechSynthesis.cancel();

  speakArabicFull(item);
}

// Navigation
prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    loadWord();  // auto English only if checkbox is checked
  }
});

nextBtn.addEventListener("click", () => {
  if (index < data.items.length - 1) {
    index++;
    loadWord();  // auto English only if checkbox is checked
  }
});

// Button events
playEnglishBtn.addEventListener("click", handlePlayEnglish);
playArabicBtn.addEventListener("click", handlePlayArabic);
