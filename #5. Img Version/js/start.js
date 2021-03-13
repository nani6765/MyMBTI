const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 3;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
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

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function ImageFadeOut(qIdx, idx){
  var left = document.querySelector('.leftImage');
  var right = document.querySelector('.rightImage');
  left.disabled = true;
  left.classList.remove("fadeIn");
  left.classList.add("fadeOut");
  right.disabled = true;
  right.classList.remove("fadeIn");
  right.classList.add("fadeOut");

  setTimeout(() =>{
    if(qIdx+1 === endPoint){
      goResult();
      return;
    } else{
      setTimeout(() => {
        var target = qnaList[qIdx].a[idx].type;
        for(let i = 0; i < target.length; i++){
          select[target[i]] += 1;
        }
        goNext(++qIdx);
      },450);
    }
  },450)

}

function goNext(qIdx){
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  var left = document.querySelector('.leftImage');
  var right = document.querySelector('.rightImage');
  var qnaURL = './img/question/';
  left.src = qnaURL + qIdx + '-A.png';
  right.src = qnaURL + qIdx + '-B.png';

  try {
    left.classList.remove("fadeOut");
    right.classList.remove("fadeOut");
  } catch (e) {
    console.log(e);
  }
  left.classList.add("fadeIn");
  right.classList.add("fadeIn");

  left.addEventListener("click", function(){
    var target = qnaList[qIdx].a[0].type;
    ImageFadeOut(qIdx ,0);
  }, false);

  right.addEventListener("click", function(){
    var target = qnaList[qIdx].a[1].type;
    ImageFadeOut(qIdx, 1);
  }, false);

  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
