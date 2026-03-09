// Multi-word phrases
const phrases = [
  "apple pie","blue whale","high school","ice cream","mountain peak",
  "sweet home","golden gate","black board","space station","happy birthday",
  "chocolate cake","rainy day","morning coffee","summer vacation","silver spoon",
  "reading book","green garden","city park","grand canyon","new york",
  "golden retriever","flying kite","deep ocean","snowy mountain","morning jog",
  "birthday party","family dinner","coffee shop","night sky","ocean breeze",
  "sunset beach","fast car","basketball court","running shoes","happy hour",
  "fresh fruit","digital clock","morning walk","big city","hot chocolate",
  "summer camp","rainy season","green tea","chicken soup","flower garden",
  "movie theater","music festival","travel bag","newspaper headline","space exploration",
  "friendly neighbor","colorful painting"
];

let phrase = phrases[Math.floor(Math.random() * phrases.length)].toLowerCase();
const grid = document.getElementById("grid");
const message = document.getElementById("message");
const guessedLetters = new Set();
let boxes = [];
let wrongGuesses = 0;
const maxWrong = 7; // 7 hangman parts

// Build the grid
grid.innerHTML = "";
boxes = [];
for (let i = 0; i < phrase.length; i++) {
  let ch = phrase[i];
  let box = document.createElement("div");
  if (ch === " ") { box.className = "box space"; box.innerText = ""; }
  else { box.className = "box"; box.innerText = "_"; box.dataset.letter = ch; }
  grid.appendChild(box);
  boxes.push(box);
}

// Fade-in animation
boxes.forEach((box,i)=>box.style.animationDelay=`${i*0.05}s`);

// Guess function
function guess(){
  let input = document.getElementById("letter");
  let letter = input.value.toLowerCase();
  input.value = "";
  if(!letter.match(/^[a-z]$/)){ message.innerText="Please enter a valid letter A-Z."; return; }
  if(guessedLetters.has(letter)){ message.innerText=`You already guessed "${letter.toUpperCase()}"`; return; }
  guessedLetters.add(letter);
  
  let correctGuess=false;
  boxes.forEach(box=>{
    if(box.dataset.letter===letter){
      box.innerText=letter.toUpperCase();
      box.classList.add("correct");
      setTimeout(()=>box.classList.remove("correct"),600);
      correctGuess=true;
    }
  });

  if(correctGuess){ message.innerText=`Good job! Letter "${letter.toUpperCase()}" is in the phrase.`; }
  else{
    message.innerText=`Sorry! Letter "${letter.toUpperCase()}" is NOT in the phrase.`;
    grid.classList.add("wrong");
    setTimeout(()=>grid.classList.remove("wrong"),300);
    showHangmanPart();
  }

  checkWin();
}

function showHangmanPart(){
  wrongGuesses++;
  if(wrongGuesses <= maxWrong){
    document.querySelector(`.part${wrongGuesses}`).style.display="block";
  }
  if(wrongGuesses===maxWrong){
    message.innerText=`💀 Game Over! The phrase was: "${phrase.toUpperCase()}"`;
    document.getElementById("letter").disabled=true;
  }
}

function checkWin(){
  let won=boxes.every(box=>box.classList.contains("space") || box.innerText!=="_");
  if(won){
    message.innerText=`🎉 Congratulations! You guessed the phrase: "${phrase.toUpperCase()}"`;
    message.classList.add("win");
    document.getElementById("letter").disabled=true;
  }
}
