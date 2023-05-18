     // ファイアベースの設定
        // Import the functions you need from the SDKs you need
        import { initializeApp }
        from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
   import { getDatabase, ref, push, set, onChildAdded, remove,child,onChildRemoved,onValue } 
       from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
   import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
       from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyBIAp77hJUMvb1lMxxib8eSGMmkGh8U-1g",
 authDomain: "confee-5aca7.firebaseapp.com",
 databaseURL : "https://confee-5aca7-default-rtdb.firebaseio.com",
 projectId: "confee-5aca7",
 storageBucket: "confee-5aca7.appspot.com",
 messagingSenderId: "754456726342",
 appId: "1:754456726342:web:bfa971473689237a873347"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);

    //GoogleAuth(認証用)
        const provider = new GoogleAuthProvider();
       provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
       const auth = getAuth();

       //Login処理
       $("#login").on("click",function(){
       //Google認証完了後の処理
       signInWithPopup(auth, provider).then((result) => {
       //Login後のページ遷移
       location.href="home.html";  
       }).catch((error) => {
       // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       // The email of the user's account used.
       const email = error.email;
       // The AuthCredential type that was used.
       const credential = GoogleAuthProvider.credentialFromError(error);
       // ...
       });
   });

   // ログアウト設定
   document.getElementById('logout-link').addEventListener('click', (event) => {
           event.preventDefault(); // リンクのデフォルトの挙動をキャンセルする
           signOut(auth)
           .then(() => {
               // ログアウト成功時の処理
               console.log('ログアウトしました');
               window.location.href = 'top.html'; // トップページのURLに変更してください
           })
           .catch((error) => {
               // ログアウト失敗時の処理
               console.log('ログアウトに失敗しました', error);
           });
       });
       
// 入力ページのjs
const buttons = document.querySelectorAll('.fselect button'); // 感情ボタンの要素を取得
const saveButton = document.getElementById('save'); // 保存ボタンの要素を取得
const view = document.querySelector('.view'); // 結果表示エリアの要素を取得
let selectedButtons = []; // 選択されたボタンの配列を初期化

// 以下、結果の定義３６通り作る関数
// まずjoyとの組み合わせ
const getResult = (emotion1, emotion2) => {
    if (emotion1 === 'joy') {
      if (!emotion2){
        return '喜び';
      } else if (emotion2 === 'trust') {
        return '愛';
      } else if (emotion2 === 'fear') {
        return '罪悪感';
      } else if (emotion2 === 'surprise') {
        return '歓喜';
      } else if (emotion2 === 'disgust') {
        return '不健康';
      } else if (emotion2 === 'anger') {
        return '自尊心';
      } else if (emotion2 === 'anticipation') {
        return '楽観';
      }else if (emotion2 === 'sadness') {
        return 'ほろ苦さ';
    }}
    // 次にtrustとのくみ合せ
    if (emotion1 === 'trust') {
        if (!emotion2){
          return '信頼';
        } else if (emotion2 === 'joy') {
          return '愛';
        } else if (emotion2 === 'fear') {
          return '服従';
        } else if (emotion2 === 'surprise') {
          return '好奇心';
        } else if (emotion2 === 'disgust') {
          return '葛藤';
        } else if (emotion2 === 'anger') {
          return '支配';
        } else if (emotion2 === 'anticipation') {
          return '希望';
        }else if (emotion2 === 'sadness') {
          return '感傷的';
      }}
    // 次にfearとのくみ合せ
        if (emotion1 === 'fear') {
        if (!emotion2){
          return '恐れ';
        } else if (emotion2 === 'joy') {
          return '罪悪感';
        } else if (emotion2 === 'trust') {
          return '服従';
        } else if (emotion2 === 'surprise') {
          return '畏怖';
        } else if (emotion2 === 'disgust') {
          return '羞恥心';
        } else if (emotion2 === 'anger') {
          return '冷淡';
        } else if (emotion2 === 'anticipation') {
          return '懸念';
        }else if (emotion2 === 'sadness') {
          return '絶望';
      }}
         // 次にsurpriseとのくみ合せ
         if (emotion1 === 'surprise') {
            if (!emotion2){
              return '驚き';
            } else if (emotion2 === 'joy') {
              return '歓喜';
            } else if (emotion2 === 'trust') {
              return '好奇心';
            } else if (emotion2 === 'fear') {
              return '畏怖';
            } else if (emotion2 === 'disgust') {
              return '不信感';
            } else if (emotion2 === 'anger') {
              return '憤慨';
            } else if (emotion2 === 'anticipation') {
              return '混乱';
            }else if (emotion2 === 'sadness') {
              return '拒絶';
          }}
        // 次にsadnessとのくみ合せ
         if (emotion1 === 'sadness') {
            if (!emotion2){
              return '悲しみ';
            } else if (emotion2 === 'joy') {
              return 'ほろ苦さ';
            } else if (emotion2 === 'trust') {
              return '感傷的';
            } else if (emotion2 === 'fear') {
              return '絶望';
            } else if (emotion2 === 'disgust') {
              return '後悔';
            } else if (emotion2 === 'anger') {
              return '嫉妬';
            } else if (emotion2 === 'anticipation') {
              return '悲観的';
            }else if (emotion2 === 'surprise') {
              return '拒絶';
          }}
          // 次にdisgustとのくみ合せ
         if (emotion1 === 'disgust') {
            if (!emotion2){
              return '嫌悪';
            } else if (emotion2 === 'joy') {
              return '不健康';
            } else if (emotion2 === 'trust') {
              return '葛藤';
            } else if (emotion2 === 'fear') {
              return '羞恥心';
            } else if (emotion2 === 'sadness') {
              return '後悔';
            } else if (emotion2 === 'anger') {
              return '軽蔑';
            } else if (emotion2 === 'anticipation') {
              return '皮肉';
            }else if (emotion2 === 'surprise') {
              return '不信感';
          }}
        // 次にangerとのくみ合せ
         if (emotion1 === 'anger') {
            if (!emotion2){
              return '怒り';
            } else if (emotion2 === 'joy') {
              return '自尊心';
            } else if (emotion2 === 'trust') {
              return '支配';
            } else if (emotion2 === 'fear') {
              return '冷淡';
            } else if (emotion2 === 'sadness') {
              return '嫉妬';
            } else if (emotion2 === 'disgust') {
              return '軽蔑';
            } else if (emotion2 === 'anticipation') {
              return '攻撃性';
            }else if (emotion2 === 'surprise') {
              return '憤慨';
          }}
          // 次にanticipationとのくみ合せ
         if (emotion1 === 'anticipation') {
            if (!emotion2){
              return '期待';
            } else if (emotion2 === 'joy') {
              return '楽観';
            } else if (emotion2 === 'trust') {
              return '希望';
            } else if (emotion2 === 'fear') {
              return '懸念';
            } else if (emotion2 === 'sadness') {
              return '悲観的';
            } else if (emotion2 === 'disgust') {
              return '皮肉';
            } else if (emotion2 === 'anger') {
              return '攻撃性';
            }else if (emotion2 === 'surprise') {
              return '混乱';
          }}

}


// ボタンがクリックされたときの処理
function handleClick(e) {
  const button = e.target;
  const id = button.id;
  console.log(id);
  
  // 選択済みのボタンをクリックした場合、選択を解除
  if (selectedButtons.includes(button)) {
    button.classList.remove('selected');
    selectedButtons = selectedButtons.filter((selectedButton) => selectedButton !== button);
    return;
  }

  // 選択されたボタンを追加し、背景色を変更
  selectedButtons.push(button);
  button.classList.add('selected');

    // 選択できるボタンが2つを超えた場合、アラートを表示して選択を解除
    if (selectedButtons.length > 2) {
        alert('1つか2つしか選択できないので、選び直してください');
        selectedButtons.pop();
        button.classList.remove('selected');
      }
}
// 保存ボタンがクリックされたときの関数
function handleSave() {
  let result = "";
    // 選択されたボタンが1つもない場合、アラートを表示して処理を中断
    if (selectedButtons.length === 0) {
      alert('感情が選択されていません。');
      return;
    }

  // 選択されたボタンの数によって、結果を設定
  // 🟡feelingsのローカルストレージ保存が１つ選択の場合にうまくいってない

  if (selectedButtons.length === 1) {
    result = getResult(selectedButtons[0].id);
  } else if (selectedButtons.length === 2) {
    const emotion1 = selectedButtons[0].id;
    const emotion2 = selectedButtons[1].id;
    result = getResult(emotion1, emotion2);
    const emotions = emotion1 + ',' + emotion2; // 2つのIDを連結した文字列
    localStorage.setItem('feelings', emotions); // ローカルストレージに保存
  }
  // 結果を表示
  // view.textContent = result;
    // saveButtonにselectedクラスを追加
    saveButton.classList.add('selected');
    console.log(result)
    localStorage.setItem( "result",result);  
}
// ボタンにクリックイベントを追加
buttons.forEach((button) => {
  button.addEventListener('click', handleClick);
});

// 保存ボタンにクリックイベントを追加
saveButton.addEventListener('click', function() {
  handleSave();
  const  dekigoto  = $("#aerea").val();
  localStorage.setItem( "dekigoto",dekigoto);  
  const  year  = $("#year").val();
  const  month  = $("#month").val();
  const  date  = $("#date").val();
  const  hour  = $("#hour").val();
  localStorage.setItem( "date",year+'年'+month+'月'+date+'日'+hour+'時ごろ'); 
  const riyu = $("#aerea_2").val();
  localStorage.setItem( "riyu",riyu);  
  const title = $("#f_title").val();
  localStorage.setItem( "title",title);  
});

// 編集に戻った際にローカルストレージの内容を表示し、そこから編集
// ページ読み込み時に、保存されたデータがあれば表示する
window.addEventListener('load', function(){

    // 選択した感情ボタンのIDを取得
    const emotions = localStorage.getItem('feelings');
    if (emotions) {
      const [emotion1, emotion2] = emotions.split(',');
      // 感情ボタンをクリックされた状態にする
      // ボタンに書いている要素のみとっている状態
      const button1 = document.getElementById(emotion1);
      const button2 = document.getElementById(emotion2);
      // ボタンを押していると伝えている
      selectedButtons.push(button1);
      selectedButtons.push(button2);
      // 選んでいるボタンに背景色をつけている
      button1.classList.add('selected');
      button2.classList.add('selected');
    }
    // 出来事について表示
    const dekigoto = localStorage.getItem("dekigoto");
    if(dekigoto){
    $("#aerea").val(dekigoto);
    }
    
  // 年月日について表示
  const date = localStorage.getItem("date");
  if(date){
    const [year, month, day, hour] = date.split(/年|月|日|時/);
    $("#year").val(year);
    $("#month").val(month);
    $("#date").val(day);
    $("#hour").val(hour);
  }
  // 理由について表示
  const riyu = localStorage.getItem("riyu");
  if(riyu){
    $("#aerea_2").val(riyu);
  }
  // タイトルについて表示
  const title = localStorage.getItem("title");
  if(title){
    $("#f_title").val(title);
  }
});


// 日時入力画面のセレクトボックスに現在の時間を表示
function addOptions(select, start, end) {
  for (let i = start; i <= end; i++) {
    const option = document.createElement("option");
    option.text = i;
    select.add(option);
  }
}

function setDatetime() {
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  const dateSelect = document.getElementById("date");
  const hourSelect = document.getElementById("hour");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();

  addOptions(yearSelect, year -1, year + 1);
  addOptions(monthSelect, 1, 12);
  addOptions(dateSelect, 1, 31);
  addOptions(hourSelect, 0, 23);

  yearSelect.value = year;
  monthSelect.value = month;
  dateSelect.value = date;
  hourSelect.value = hour;
}
setDatetime();

        // ハンバーガーアイコンをクリックした時のイベントリスナーを設定
        hamburgerIcon.addEventListener('click', toggleMenu);

        // ハンバーガーアイコンをクリックした時の処理
        document.querySelector('.hamburger-icon').addEventListener('click', function() {
        this.classList.toggle('open');
        var menuItems = document.querySelector('.menu-items');
        menuItems.classList.toggle('open');
        });





