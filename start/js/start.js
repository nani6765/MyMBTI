// querySelector는 문서에서 CSS 선택자에 대응하는 것을 선택해주는 메소드
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 결과 연산 함수
function calResult() {
  // .sort() 메소드 인자에 compareFunction이 제공되면, 배열 요소는 compare 함수의 반환 값에 따라 정렬됨
  // mozilla mdn에서 sort 메소드 참조할 것
  // compareFunction(a,b)를 사용했다
  // ...select : 전개구문...!
  console.log(select);
  var result = select.indexOf(Math.max(...select)); // 가지고 있는 최댓값을 선택한다.
  return result;
}

// 결과 출력
function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

// 결과창으로 가는 함수 goResult()
function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  setResult();
}

// 답안 받고 다음 질문으로 넘기기
function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button"); //지정한 tagName의 HTML요소를 만들어 반환한다.
  answer.classList.add("answerList"); // 클래스 값을 넣어줘서 쿼리셀렉터를 활용할 수 있게 한다.
  answer.classList.add("my-5");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");

  a.appendChild(answer); // answer라는 버튼이 a에 소속될 수 있도록 한다.
  // 현재 a에는 answerBox div 버튼이 담겨있다.
  answer.innerHTML = answerText;
  // addEventListener : 사용자가 선택
  answer.addEventListener(
    "click",
    function () {
      var children = document.querySelectorAll(".answerList");
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true; // QNA 박스 디자인 (+html에 )
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        // 버튼 누르자마자 값 갱신
        var target = qnaList[qIdx].a[idx].type;
        for (let i = 0; i < target.length; i++) {
            select[target[i]] += 1;
        }

        // 애니메이션 부드럽게 하기
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        goNext(++qIdx);
      }, 450);
    },
    false
  );
}

// innerHTML
function goNext(qIdx) {
  if (qIdx === endPoint) {
    // qIdx +1에서 qIdx로 변경했다 이유에 대해 생각해볼것
    goResult(); // 12문항 응답 완료시, goResult() 함수 호출
    return;
  }
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  } // a는 배열임 즉, 3번 돈다.
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
}

// setTimeout 활용
function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}