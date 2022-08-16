// const
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// 字母清單
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];
  

  // 初始化word
  let randomWord;

  // 初始化成績
  let score = 0;

  // 初始化剩餘時間
  let time = 10;


  // 設定難度是local storage的 或 中等
  let difficulty = 
    localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

  // 顯示難度的value
  difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


  // function
  // 自動生成英文單字
  function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
  }

  // 將生成的單字顯示在DOM
  function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }

  // 開始倒數計時
  const timeInterval = setInterval(updateTime, 1000);

  // 更新時間
  function updateTime(){
    time--;
    timeEl.innerHTML = time + '秒';

    // 時間終了
    if(time === 0){
        clearInterval(timeInterval);
        // 遊戲結束
        gameOver();
    }
  }

  //更新成績
  function updateScore(){
    score++;
    scoreEl.innerHTML = score;
  }

  //Game over
  function gameOver(){
        endgameEl.innerHTML =
        `<h1>時間到了</h1>
         <p>您的最終成績是: ${score}</p>
         <button onclick="location.reload()">再來一次</button>
        `;

    // 顯示出來在dom
    endgameEl.style.display ='flex';
  }

  // 難度設定
  function difficultySet(e){
    difficulty = e.target.value;
    localStorage.setItem('difficulty' , difficulty);
  }

  // 設定條的顯示控制
  function settingToggle(){
    settings.classList.toggle('hide')
  }

  // 檢查輸入的文字
  function textCheck(e){
    //抓去輸入的內容
    const insertedText = e.target.value;

    // 如果輸入的文字等於randomWord
    if (insertedText === randomWord) {
        //抓取新的單字
        addWordToDOM();
        //更新成績
        updateScore();
  
        // 清除輸入欄位
         e.target.value = '';
  
        // 依據難度曾經秒數
         if (difficulty === 'hard') {
            time += 2;
         } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }
        // 更新時間
        updateTime();
  }};


  // eventlistner
  // text 輸入
  text.addEventListener('input' , textCheck )

  // Settings btn click
  settingsBtn.addEventListener('click', settingToggle);

  // 難度設定
  settingsForm.addEventListener('change', difficultySet)


  // text focus
  text.focus();

  // 初始化單字
  addWordToDOM();