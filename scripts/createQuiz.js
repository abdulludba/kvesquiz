const p = console.log;
import { isUserSignedIn } from './db.js'

const createQuizBtn = document.querySelector('.createQuizBtn')
const templateContainer = document.querySelector('.quiz-template-container')
const selectTemplate = document.querySelector('.select-quiz-template')
const cancelQuizCreate = selectTemplate.querySelector('.cancelBtn')
const cancelQuestionCreate = templateContainer.querySelector('.cancelBtn')
const uploadQuiz = selectTemplate.querySelector('.uploadBtn')
const addQuestion = templateContainer.querySelector('.uploadBtn')
const loading = document.querySelector('.loading')


  .isUserSignedIn(loading)
  .then((result) => {
    if (result.signedIn) {
      cancelQuizCreate.addEventListener('click', () => {
        window.location.href = `components/Dashboard.html?uid=${result.uid}`
      })


      addQuestion.addEventListener('click', () => {
        
        const questContainer = document.querySelector('.question-container')
        const question = questContainer.querySelector('.question').value
        const opts = document.querySelectorAll('.opt')
        const answer = document.querySelector('.answer').innerHTML
          const optData = {}
                
        opts.forEach((opt, i) => {
          optData[`opt${i}`] = opt.innerHTML
        })
        const qdata = storeQuizData(question, optData, answer)
        p(qdata)

      })

    }
  })




function storeQuizData(question, opts, answer) {
  return {
    question: question,
    options: opts,
    answer: answer
  }
}




createQuizBtn.addEventListener('click', () => {
  p('euyy')
  const questionList = document.querySelector('.question-list')
  const quizType = document.querySelector('#quizType').value.trim()
  const questionNum = questionList.childElementCount


  const tof = createTOF(questionNum)

  templateContainer.append(tof)

  templateContainer.classList.remove('hide')
  selectTemplate.classList.add('hide')
})


const createTOF = (quizNum) => {
  const quizContainer = document.createElement('div')

  quizContainer.className = 'TOF question-container'

  quizContainer.innerHTML = `
      <div class="quiz-info">
        
        <div class="quiz-num-container">
          <span class="curr-quiz-num">${quizNum}</span>
          <span>/</span>
          <div class="total-num">${quizNum}</div>
        </div>
      </div>
      <div class="question-data-container">
        <input type="text" class="question" placeholder="Type Something here..." autofocus>
      </div>
      <div class="answer-container">
        <div class="true opt">T</div>
        <div class="false opt">F</div>
      </div>
  `

  const answers = quizContainer.querySelectorAll('.opt')

  answers.forEach(answer => {
    answer.addEventListener('click', (e) => {
      answers.forEach(btn => {
        btn.classList.remove('answer')
      })
      e.target.classList.add('answer')
    })
  })
  return quizContainer
}