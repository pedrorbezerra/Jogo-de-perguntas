var quiz = [{
  "question": "Qual era a profissão do Walter no início da série?",
  "choices": ["Médico", "Professor", "Garimpeiro", "Farmacêutico"],
  "correct": "Professor"
}, {
  "question": "Como Walter e Jesse se conheceram?",
  "choices": ["Walter era vizinho de Jesse", "Jesse entregava jornais para Walter", "Participavam do mesmo clube do livro", "Jesse foi aluno de Walter"],
  "correct": "Jesse foi aluno de Walter"
}, {
  "question": "Quem era o dono do restaurante Los Pollos Hermanos?",
  "choices": ["Gus Fring", "Hank", "Jesse", "Saul Goodman"],
  "correct": "Gus Fring"
}, {
  "question": "Qual doença Walter descobriu que tinha, e com quantos anos?",
  "choices": ["Pneumonia, 45 anos", "Câncer, 50 anos", "Frieira, 57 anos", "Rinite, 15 anos"],
  "correct": "Câncer, 50 anos"
}, {
  "question": "Qual acidente marcou a vida dos moradores de Albuquerque?",
  "choices": ["Dois carros bateram", "Uma montanha russa emperrou", "Dois aviões colidiram", "Um cachorro foi atropelado"],
  "correct": "Dois aviões colidiram"
}];

question[0] = "<img src='img/completo.gif'></img>";


var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");


var currentQuestion = 0,
  score = 0,
  askingQuestion = true;

function $(id) { 
  return document.getElementById(id);
}

function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";

  
  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

  
  questionContainer.textContent = "Pergunta " + (currentQuestion + 1) + ": " +
    quiz[currentQuestion].question;

  
  choicesContainer.innerHTML = choicesHtml;

  
  if (currentQuestion === 0) {
    scoreContainer.textContent = "Pontuação: 0 resposta(s) certa(s) das " +
      quiz.length + " tentativas. Se esforce!";
    submitBtn.textContent = "Verificar Resposta";
  }
}

function checkAnswer() {
  if (askingQuestion) {
    submitBtn.textContent = "Próxima Pergunta";
    askingQuestion = false;

    
    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        userpick = radios[i].value;
      }

      
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }

    scoreContainer.textContent = "Pontuação: " + score + " resposta(s) certa(s) das " +
      quiz.length + " tentativas. Se esforce!";
  } else { 
    askingQuestion = true;
    submitBtn.textContent = "Verificar Resposta";
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  content.innerHTML = "<h2>Você completou o teste e provou que é fera quando o assunto é Breaking Bad!!!</h2>" +
    "<img src='img/completo.gif'>";
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);