const $ = (selector) => document.querySelector(selector);
let wrongCount = 0;
let answered = false;
let kisses = 0;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function scatterHearts(x, y, count = 18) {
  if (reducedMotion.matches) return;
  const layer = $('#particles');
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'kiss-particle';
    heart.textContent = ['♡', '♥', '✧'][i % 3];
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 150;
    heart.style.cssText = `left:${x}px;top:${y}px;font-size:${14 + Math.random() * 21}px;--dx:${Math.cos(angle) * distance}px;--dy:${Math.sin(angle) * distance - 90}px;--spin:${Math.random() * 90 - 45}deg;`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }
}

$('#kiss-button').addEventListener('click', (event) => {
  kisses++;
  const box = event.currentTarget.getBoundingClientRect();
  scatterHearts(box.x + box.width / 2, box.y + box.height / 2);
  $('#kiss-hint').textContent = `牛牛已收到 ${kisses} 个亲亲，再给你一个也可以 ♡`;
});

$('#open-letter').addEventListener('click', () => {
  $('#envelope').classList.add('open');
  $('#closed-letter').hidden = true;
  $('#quiz-card').hidden = false;
  $('#quiz-heading').focus({ preventScroll: true });
});

document.querySelectorAll('[data-answer]').forEach((button) => {
  button.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    const isWrong = button.dataset.answer === 'D';
    let message;
    if (isWrong) {
      wrongCount++;
      message = wrongCount === 1 ? '行，寒假等着被我狠狠惩罚吧' : `惩罚时间×${wrongCount}`;
    } else {
      message = wrongCount > 0 ? '骗牛牛的，选对了我也惩罚你，嘻嘻' : '嘻嘻，寒假等着被我狠狠奖励吧';
    }
    $('#question-view').hidden = true;
    $('#result-view').hidden = false;
    $('#result-message').textContent = message;
    $('#result-label').textContent = isWrong ? '哼，牛牛再想想' : '收到牛牛的答案啦';
    $('#result-icon').textContent = isWrong ? '୨୧' : '♡';
    $('#retry').hidden = !isWrong;
    $('#result-foot').textContent = isWrong ? '再给你一次机会，要不要改口？' : '反正，牛牛已经被文文预订了 ♡';
    $('#result-message').focus({ preventScroll: true });
    if (!isWrong) {
      const box = $('#result-icon').getBoundingClientRect();
      scatterHearts(box.x + box.width / 2, box.y + box.height / 2, 24);
    }
  });
});

$('#retry').addEventListener('click', () => {
  answered = false;
  $('#result-view').hidden = true;
  $('#question-view').hidden = false;
  $('#quiz-heading').focus({ preventScroll: true });
});
