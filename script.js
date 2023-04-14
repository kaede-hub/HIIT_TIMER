let timer = document.getElementById('timer');
    let startBtn = document.getElementById('startBtn');
    let pauseBtn = document.getElementById('pauseBtn');
    let resetBtn = document.getElementById('resetBtn');
    let workoutTimeInput = document.getElementById('workoutTimeInput');
    let restTimeInput = document.getElementById('restTimeInput');
    let setsInput = document.getElementById('setsInput');
    let saveBtn = document.getElementById('saveBtn');
    let facebookBtn = document.getElementById('facebookBtn');
    let twitterBtn = document.getElementById('twitterBtn');
    let beep = document.getElementById('beep');
    let workoutTime = parseInt(workoutTimeInput.value);
    let restTime = parseInt(restTimeInput.value);
    // 実行中のタイマーを格納する変数
    let interval;

    // セット数を初期化する
    let sets = parseInt(setsInput.value);

    // 残り時間を更新する関数
    function updateTimer(time) {
      timer.textContent = time.toFixed(0);
      if (time <= 3) {
        beep.play();
      }
    }

    // セット数を更新する関数
    function updateSets(remainingSets) {
      document.title = 'Interval Timer (' + remainingSets + ' sets remaining)';
      if (remainingSets === 0) {
        clearInterval(interval);
        startBtn.disabled = true;
        pauseBtn.disabled = true;
        document.title = 'Interval Timer (Completed)';
      }
    }

    // タイマーを開始する関数
    function startTimer() {
      let remainingSets = sets;
      updateSets(remainingSets);
      interval = setInterval(function () {
        if (workoutTime > 0) {
          updateTimer(workoutTime);
          workoutTime--;
        } else if (restTime > 0) {
          updateTimer(restTime);
          restTime--;
        } else {
          remainingSets--;
          workoutTime = parseInt(workoutTimeInput.value);
          restTime = parseInt(restTimeInput.value);
          updateSets(remainingSets);
        }
      }, 1000);
      startBtn.disabled = true;
      pauseBtn.disabled = false;
    }

    // タイマーを一時停止する関数
    function pauseTimer() {
      clearInterval(interval);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }

    // タイマーをリセットする関数
    function resetTimer() {
      clearInterval(interval);
      workoutTime = parseInt(workoutTimeInput.value);
      restTime = parseInt(restTimeInput.value);
      updateTimer(workoutTime);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      document.title = 'Interval Timer';
    }

    // 設定を保存する関数
    function saveSettings() {
      workoutTime = parseInt(workoutTimeInput.value);
      restTime = parseInt(restTimeInput.value);
      sets = parseInt(setsInput.value);
      resetTimer();
    }

    // Facebookで共有する関数
    function shareOnFacebook() {
      let url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
      window.open(url, '_blank');
    }

    // Twitterで共有する関数
    function shareOnTwitter() {
      let url = 'https://twitter.com/share?url=' + encodeURIComponent(window.location.href);
      window.open(url, '_blank');
    }

    // ボタンにイベントリスナーを追加する
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    saveBtn.addEventListener('click', saveSettings);
    facebookBtn.addEventListener('click', shareOnFacebook);
    twitterBtn.addEventListener('click', shareOnTwitter);

    // タイマーを初期化する
    resetTimer();