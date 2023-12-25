// DECLARAÇÃO VARIAVEIS
const question = document.querySelector('#question');
const answerBox = document.querySelector("#answer-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// PERGUNTAS
const questions = [
  {
    "question": "PHP foi desenvolvido para qual finalidade?",
    "answer": [
      {
        "answer": "Back-end",
        "correct": true
      },
      {
        "answer": "Front-end",
        "correct": false
      },
      {
        "answer": "Sistemas Operacionais",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar Javacsript é?",
    "answer": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#var",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor correto de ID no CSS?",
    "answer": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "*",
        "correct": false
      },
    ]
  },
  {
    "question": "Como realizar comentarios no HTML?",
    "answer": [
      {
        "answer": "//",
        "correct": false
      },
      {
        "answer": "/* */",
        "correct": false
      },
      {
        "answer": "<<!-- -->>>",
        "correct": true
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
  {
    "question": "Por qual simbolo conhecido se declara uma Arrow Function?",
    "answer": [
      {
        "answer": "==",
        "correct": false
      },
      {
        "answer": "++",
        "correct": false
      },
      {
        "answer": "!=",
        "correct": false
      },
      {
        "answer": "=>",
        "correct": true
      },
    ]
  },
]

// substituição do Quizz para Primeira Pegunta
function init() {
  //Criar Primeira Pegunta
  createQuestion(0)

}

//Cria Pergunta
function createQuestion(i) {
  // Limpar questão anterior
  const oldButtons = answerBox.querySelectorAll("button")
  oldButtons.forEach(function (btn) {
    btn.remove();
  })
  // Alterar Texto da Pergunta
  const questionText = question.querySelector("#question-text")
  const questionNumber = question.querySelector("#question-number")

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  //insere as alternativas
  questions[i].answer.forEach(function (answer, i) {
    // Cria Template Botão Quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true)
    const lettersBtn = answerTemplate.querySelector('.btn-letter')
    const answerText = answerTemplate.querySelector('.question-answer')

    lettersBtn.textContent = letters[i]
    answerText.textContent = answer["answer"]

    answerTemplate.setAttribute("correct-answer", answer["correct"])

    //Remover Hide e Template class
    answerTemplate.classList.remove("hide")
    answerTemplate.classList.remove("answer-template")

    //Inserir a Alternativa na Tela
    answerBox.appendChild(answerTemplate);

    //Inserir evento clique botão
    answerTemplate.addEventListener("click", function () {
      checkAnswer(this);
    })
  })
  //Incrementar Numero Questão
  actualQuestion++
}

//Verificando Resposta Usuario
function checkAnswer(btn) {
  //Seleciona Botões
  const buttons = answerBox.querySelectorAll('button');
  //Verifica reposta correta, Adiciona Classes Botões
  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer")
      //Checa Pergunta Acertada
      if (btn == button) {
        //Incremento Pontos
        points++
      }
    } else {
      button.classList.add("wrong-answer")
    }
  })

  //Exibir Proxima Pergunta
  nextQuestion();
}

//Exibe Proxima Pergunta Quizz
function nextQuestion() {
  //Time Usuario Conferir Resposta
  setTimeout(function () {
    //Verifica Perguntas Existentes
    if (actualQuestion >= questions.length) {
      //Mensagem Sucesso
      showSuccessMessage();
      return;
    }
    createQuestion(actualQuestion);
  }, 1500);
}

//Exibe Tela Final
function showSuccessMessage() {

  hideOrShowQuizz()
  //Trocar dados Tela Sucesso

  //Calcular Score
  const score = ((points / questions.length) * 100).toFixed(2)
  const displayScore = document.querySelector('#display-score span')
  displayScore.textContent = score.toString()

  //Alterar numero Perguntas Corretas
  const correctAnswers = document.querySelector('#correct-answer')
  correctAnswers.textContent = points

  //Alterar Total Perguntas
  const totalQuestions = document.querySelector("#questions-qty")
  totalQuestions.textContent = questions.length
}

// Mostra ou Esconde
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

//Reiniciar Quizz
const RestartBtn = document.querySelector("#restart")
RestartBtn.addEventListener("click", function () {
  //Altera os dados e Zerar o Jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init()
})

// Inicialização do Quizz
init()