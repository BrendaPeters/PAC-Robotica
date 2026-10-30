"use strict";
// Demonstração visual: não se conecta a uma placa física.
const led = document.querySelector("#led");
const ledStatus = document.querySelector("#led-status");
const toggle = document.querySelector("#toggle-led");
const interval = document.querySelector("#interval");
let timer = null;
let running = false;
function setLed(on) {
  led.classList.toggle("on", on);
  // Evita anunciar cada oscilação do LED a leitores de tela.
}
function startBlink() {
  clearInterval(timer);
  setLed(true);
  timer = setInterval(() => setLed(!led.classList.contains("on")), Number(interval.value));
}
toggle.addEventListener("click", () => {
  running = !running;
  toggle.setAttribute("aria-pressed", String(running));
  toggle.textContent = running ? "Pausar demonstração" : "Iniciar demonstração";
  ledStatus.textContent = running ? "LED piscando" : "LED desligado";
  if (running) startBlink(); else { clearInterval(timer); setLed(false); }
});
interval.addEventListener("input", () => {
  document.querySelector("#interval-value").textContent = `${interval.value} ms`;
  if (running) startBlink();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) clearInterval(timer); else if (running) startBlink();
});
document.querySelector("#copy").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(document.querySelector("#blink-code").textContent);
    status.textContent = "Código copiado! Cole em um sketch na Arduino IDE.";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector("#blink-code"));
    selection.removeAllRanges(); selection.addRange(range);
    status.textContent = "Código selecionado. Use Ctrl+C (ou ⌘+C) para copiar.";
  }
});
const distanceInput = document.querySelector('#distance');
let lastBlocked = false;
function updateSensor() {
  const distance = Number(distanceInput.value);
  const blocked = distance <= 20;
  document.querySelector('#distance-value').textContent = distance;
  document.querySelector('#obstacle').style.left = `${42 + (distance - 5) / 95 * 45}%`;
  document.querySelector('#sensor-grid').classList.toggle('blocked', blocked);
  if (blocked !== lastBlocked) {
    document.querySelector('#sensor-status').textContent = blocked ? 'Obstáculo próximo: motores parados.' : 'Caminho livre: motores ligados.';
    lastBlocked = blocked;
  }
}
distanceInput.addEventListener('input', updateSensor);
updateSensor();
function updateProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.reading-progress').style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0})`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
window.addEventListener('resize', updateProgress);
window.addEventListener('load', updateProgress);
updateProgress();
// Questões originais, alinhadas aos temas da trilha de robótica.
const quizSheets = [
  {title:'Folha 1 — Primeiras conexões', level:'Fácil', description:'Reconheça as funções das peças. Escolha uma alternativa em cada questão.', questions:[
    ['Qual peça recebe informações do ambiente?', ['Motor DC','Sensor','Bateria','Chave'],1,'Sensores são as entradas do robô: recebem informações do ambiente.'],
    ['Qual peça executa o programa do robô?', ['Arduino / controlador','Resistor','Motor','LED'],0,'O controlador executa o programa e usa as leituras para comandar ações.'],
    ['Qual componente produz movimento?', ['Jumper','Sensor de luz','Motor','Resistor'],2,'O motor é um atuador que transforma energia elétrica em movimento.'],
    ['Para que serve o resistor em série com um LED?', ['Guardar código','Inverter o motor','Medir distância','Limitar a corrente'],3,'O resistor limita a corrente que percorre o LED.'],
    ['Qual é a função da bateria no robô?', ['Escolher uma direção','Fornecer energia','Interpretar sensores','Armazenar o programa'],1,'A bateria fornece energia aos circuitos e motores, conforme a montagem.']
  ]},
  {title:'Folha 2 — O primeiro programa', level:'Fácil', description:'Revise o Blink e os fundamentos de Arduino. Escolha uma alternativa.', questions:[
    ['Qual função é executada uma vez ao iniciar o Arduino?', ['loop()','delay()','setup()','analogWrite()'],2,'setup() configura o programa quando a placa inicia.'],
    ['Qual função se repete durante a execução?', ['loop()','setup()','pinMode()','map()'],0,'loop() é chamada repetidamente após setup().'],
    ['Quanto tempo representa delay(1000)?', ['1 minuto','100 segundos','10 segundos','1 segundo'],3,'O argumento está em milissegundos: 1.000 ms = 1 s.'],
    ['O que pinMode(LED_BUILTIN, OUTPUT) configura?', ['Uma entrada de distância','O pino do LED como saída','A velocidade de um motor','O monitor serial'],1,'OUTPUT configura o pino como saída para comandar o LED.'],
    ['Qual instrução acende o LED integrado no exemplo Blink deste site?', ['delay(1000)','digitalWrite(LED_BUILTIN, LOW)','digitalWrite(LED_BUILTIN, HIGH)','pinMode(LED_BUILTIN, INPUT)'],2,'Neste exemplo, HIGH acende e LOW apaga o LED integrado.']
  ]},
  {title:'Folha 3 — Circuitos e decisões', level:'Médio', description:'Aplique os conceitos em pequenas situações de montagem e programação.', questions:[
    ['Um resistor de 1.000 Ω recebe 5 V entre seus terminais. Qual é a corrente?', ['5 mA','5 A','200 A','1.000 mA'],0,'I = V/R = 5/1.000 = 0,005 A, ou 5 mA.'],
    ['Como medir a tensão em uma bateria com multímetro configurado corretamente?', ['Em série com o motor','No modo resistência com a bateria ligada','Unindo os polos com um fio','Em paralelo entre os polos'],3,'A tensão é medida entre dois pontos, com o multímetro em paralelo.'],
    ['Qual a função do pull-down em uma entrada de botão?', ['Aumentar a tensão acima da alimentação','Manter LOW quando o botão está solto','Inverter os motores','Substituir a bateria'],1,'O pull-down dá uma referência LOW à entrada e evita que fique flutuando.'],
    ['O laboratório manda parar quando distância <= 20 cm. O que acontece em exatamente 20 cm?', ['Acelera','Segue em frente','Para os motores','Só para em 19 cm'],2,'O operador <= inclui o próprio limite de 20 cm.'],
    ['Por que usar um driver em vez de ligar um motor diretamente ao pino?', ['O driver aciona a carga com alimentação adequada','O pino sempre fornece corrente ilimitada','O motor precisa receber código pela USB','O driver é um sensor'],0,'O pino de controle não foi feito para fornecer a corrente exigida por um motor.']
  ]},
  {title:'Folha 4 — Motores e percepção', level:'Médio', description:'Conecte o controle dos motores à leitura e à organização do programa.', questions:[
    ['O que uma ponte H permite controlar em um motor DC?', ['A cor do LED','O texto do LCD','A resistência da bateria','O sentido de rotação'],3,'A ponte H permite inverter a polaridade aplicada ao motor e mudar seu sentido.'],
    ['No Uno R3, analogWrite(pinoPWM, 128) representa aproximadamente:', ['128 V contínuos','50% de tempo ligado','Uma leitura analógica de 128','Motor obrigatoriamente parado'],1,'128 é aproximadamente metade de 255: o ciclo ativo fica próximo de 50%.'],
    ['map(leitura, 0, 1023, 0, 255) é útil para:', ['Transformar um sensor em bateria','Compilar o programa','Converter a faixa da leitura para a faixa PWM','Inverter fisicamente os fios'],2,'map converte valores entre faixas; aqui, a faixa de entrada analógica para PWM.'],
    ['Antes de interpretar os sensores de linha, o que é mais adequado?', ['Calibrar sobre as superfícies clara e escura','Presumir que preto sempre produz 0','Ignorar a iluminação','Testar só com os motores no máximo'],0,'A calibração ajuda a distinguir superfícies nas condições reais de uso.'],
    ['Por que criar uma função virar(velocidade)?', ['Para impedir qualquer repetição do loop','Para trocar o motor por um sensor','Para dispensar a alimentação','Para reutilizar o movimento com diferentes velocidades'],3,'Uma função com parâmetro organiza a ação e permite variar seu valor de entrada.']
  ]},
  {title:'Folha 5 — Missão: seguir a linha', level:'Difícil', description:'Analise o comportamento do robô. Use a convenção da trilha: esquerdo = base + correção; direito = base − correção; correção = Kp × erro.', questions:[
    ['Com base = 100, Kp = 2 e erro = +10, quais são os comandos esquerdo e direito?', ['100 e 100','120 e 80','80 e 120','200 e 0'],1,'Correção = 2 × 10 = 20; esquerdo = 120 e direito = 80.'],
    ['O robô oscila muito após um aumento de Kp. Qual é o próximo teste mais controlado?', ['Aumentar todos os ganhos de uma vez','Remover os sensores','Reduzir Kp e comparar na mesma pista','Trocar a bateria sem observar o erro'],2,'Mudar um parâmetro por vez e comparar em condições semelhantes ajuda a avaliar o efeito.'],
    ['Qual é a diferença entre as partes P e D do controle?', ['P considera o erro atual; D, sua variação','P mede a bateria; D acende o LED','P acumula todo o erro; D define a chegada','Ambas ignoram os sensores'],0,'A parte proporcional usa o erro atual; a derivativa considera como o erro varia.'],
    ['O cálculo gera PWM esquerdo = 280 e direito = −20. Com comando PWM de 0 a 255 e direção separada, o que fazer?', ['Enviar os valores sem tratamento','Considerar −20 uma marcha a ré automática','Trocar a leitura para volts','Limitar o PWM à faixa e tratar a direção separadamente'],3,'O programa deve respeitar a faixa da interface. O sinal não controla a direção por si só nesse caso.'],
    ['Para distinguir linha perdida de chegada, qual abordagem é mais robusta?', ['Parar sempre que um único sensor mudar','Definir estados e condições verificadas para cada situação','Ignorar sensores depois da partida','Usar apenas um delay fixo'],1,'Estados e condições testadas permitem comportamentos diferentes para seguir, recuperar e encerrar.']
  ]}
];
const quizForm = document.querySelector('#quiz-form');
const savedAnswers = new Map();
let currentSheet = 0;
let quizFinished = false;
const questionKey = (sheet, index) => `q${sheet * 5 + index + 1}`;
function updateQuizCount() {
  document.querySelector('#quiz-count').textContent = `${savedAnswers.size} de 25 respondidas`;
  document.querySelector('#quiz-progress').value = savedAnswers.size;
}
function renderQuiz(focus = false) {
  const sheet = quizSheets[currentSheet];
  document.querySelector('#step-title').textContent = sheet.title;
  document.querySelector('#step-description').textContent = sheet.description;
  document.querySelector('#quiz-steps').innerHTML = quizSheets.map((s,i) => `<li ${i === currentSheet ? 'aria-current="step"' : ''} class="${i < currentSheet ? 'visited' : ''}"><span>${i+1}</span>${s.level}</li>`).join('');
  document.querySelector('#quiz-questions').innerHTML = sheet.questions.map((q,i) => {
    const key = questionKey(currentSheet,i);
    return `<fieldset id="field-${key}"><legend>${currentSheet*5+i+1}. ${q[0]}</legend>${q[1].map((option,j)=>`<label class="quiz-option"><input type="radio" name="${key}" value="${j}" ${savedAnswers.get(key)===j?'checked':''} ${quizFinished?'disabled':''}><span>${option}</span></label>`).join('')}${quizFinished?`<p class="feedback ${savedAnswers.get(key)===q[2]?'correct':'incorrect'}">${savedAnswers.get(key)===q[2]?'Correto!':'Revisar.'} Resposta: ${q[1][q[2]]}. ${q[3]}</p>`:''}</fieldset>`;
  }).join('');
  document.querySelector('#quiz-back').disabled = currentSheet === 0;
  document.querySelector('#quiz-next').textContent = currentSheet < 4 ? 'Próxima folha →' : 'Concluir e conferir';
  document.querySelector('#quiz-next').hidden = quizFinished && currentSheet === 4;
  document.querySelector('#quiz-reset').hidden = !quizFinished;
  document.querySelector('#quiz-error').textContent = '';
  updateQuizCount();
  if(focus) document.querySelector('#step-title').focus();
}
quizForm.addEventListener('change', event => {
  if(event.target.matches('input[type=radio]')) {
    savedAnswers.set(event.target.name,Number(event.target.value));
    event.target.closest('fieldset').classList.remove('unanswered');
    document.querySelector('#quiz-error').textContent = '';
    updateQuizCount();
  }
});
quizForm.addEventListener('submit', event => {
  event.preventDefault();
  if(!quizFinished) {
    const missing = quizSheets[currentSheet].questions.map((_,i)=>questionKey(currentSheet,i)).filter(key=>!savedAnswers.has(key));
    if(missing.length) {
      missing.forEach(key=>document.querySelector(`#field-${key}`).classList.add('unanswered'));
      document.querySelector('#quiz-error').textContent = `Responda ${missing.length === 1?'a questão indicada':'as '+missing.length+' questões indicadas'} antes de continuar.`;
      document.querySelector(`#field-${missing[0]} input`).focus();
      return;
    }
  }
  if(currentSheet < 4) { currentSheet++; renderQuiz(true); return; }
  if(quizFinished) return;
  quizFinished = true;
  const scores = quizSheets.map((sheet,s)=>sheet.questions.reduce((sum,q,i)=>sum+Number(savedAnswers.get(questionKey(s,i))===q[2]),0));
  renderQuiz();
  document.querySelector('#quiz-result').innerHTML = `<h3>Missão concluída: ${scores.reduce((a,b)=>a+b,0)} de 25 acertos</h3><p>${scores.map((score,i)=>`Folha ${i+1}: ${score}/5`).join(' · ')}</p><p>Use Anterior e Próxima folha para ler todas as explicações. Suas respostas ficam apenas nesta página; recarregar ou refazer limpa a revisão.</p>`;
  document.querySelector('#quiz-result').focus();
});
document.querySelector('#quiz-back').addEventListener('click',()=>{if(currentSheet>0){currentSheet--;renderQuiz(true);}});
document.querySelector('#quiz-reset').addEventListener('click',()=>{
  savedAnswers.clear(); currentSheet=0; quizFinished=false;
  document.querySelector('#quiz-result').textContent=''; renderQuiz(true);
});
renderQuiz();

