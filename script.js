let vocabData = {};
let index = 0;

// Load JSON data
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    vocabData = data;
    updateTitle();
    updateContent();
  });

// Update page title
function updateTitle() {
  document.getElementById("pageTitle").textContent = vocabData.title;
}

// Update displayed content
function updateContent() {
  const items = vocabData.items;

  document.getElementById("word").textContent = items[index].word;
  document.getElementById("example").textContent = items[index].example;
  document.getElementById("arabic").textContent = items[index].arabic;

  // Update progress counter
  document.getElementById("counter").textContent =
    `Item ${index + 1} of ${items.length}`;
}

// English TTS
function speakEnglish() {
  const items = vocabData.items;
  const word = items[index].word;
  const example = items[index].example;

  const utterWord = new SpeechSynthesisUtterance(word);
  const utterExample = new SpeechSynthesisUtterance(example);

  utterWord.lang = "en-US";
  utterExample.lang = "en-US";

  utterWord.onend = () => {
    setTimeout(() => {
      speechSynthesis.speak(utterExample);
    }, 600);
  };

  speechSynthesis.speak(utterWord);
}

// Arabic TTS
function speakArabic() {
  const items = vocabData.items;
  const arabicSentence = items[index].arabic;

  const utterArabic = new SpeechSynthesisUtterance(arabicSentence);
  utterArabic.lang = "ar-SA";
  speechSynthesis.speak(utterArabic);
}

// Navigation
function nextWord() {
  const items = vocabData.items;
  index = (index + 1) % items.length;
  updateContent();
}

function prevWord() {
  const items = vocabData.items;
  index = (index - 1 + items.length) % items.length;
  updateContent();
}

// Button listeners
document.getElementById("playEnglish").addEventListener("click", speakEnglish);
document.getElementById("playArabic").addEventListener("click", speakArabic);
document.getElementById("nextBtn").addEventListener("click", nextWord);
document.getElementById("prevBtn").addEventListener("click", prevWord);
