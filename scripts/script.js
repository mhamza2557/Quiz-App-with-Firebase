function getFireBaseDatabase(key, count) {
    var abc
    firebase.database().ref('WebApp/MCQs/Question' + count + '/' + key + count).once('value', function(data) {
        abc = data.val()
        document.querySelector("#questions > h2").innerText = abc
    })
}

function getFireBaseDatabase1(key, count) {
    var abc
    for (let i = 1; i <= 4; i++) {
        firebase.database().ref('WebApp/MCQs/Question' + count + '/' + key + i).once('value', function(data) {
            abc = data.val()
            document.querySelector("#questions > ul > li:nth-child(" + i + ")").innerText = abc
        })
    }
}

var answer;

function getFireBaseDatabaseAns(key, count) {
    firebase.database().ref('WebApp/MCQs/Question' + count + '/' + key).once('value', function(data) {
        answer = data.val()
    })
}


window.onload = function() {
    showQuestion(1)
}

function submitForm(e) {
    e.preventDefault()
    let username = document.forms['welcome_form']['username'].value
    sessionStorage.setItem('username', username);
    location.href = 'quiz.html'
}

var question_count = 1
var points = 0
var eachPoint = 10

setInterval(function autoincrement() {
    getFireBaseDatabaseAns('Answer', question_count)
}, 500)


function nextQuestion() {

    let user_answer = document.querySelector('li.option.active').innerHTML

    var totalPoints = 4 * eachPoint
    sessionStorage.setItem('totalPoints', totalPoints)

    if (user_answer == answer) {
        points += 10
        sessionStorage.setItem('points', points)

    }

    if (question_count === 4) {
        sessionStorage.setItem('time', `${minutes} minutes and ${seconds} seconds`)
        clearInterval(quiz_timer)
        location.href = 'final.html'
        return
    }

    question_count++
    showQuestion(question_count)
}

function showQuestion(count) {
    let question = document.getElementById('questions')
    question.innerHTML = `
                    <h2>Q${question_count}. ${getFireBaseDatabase('Q', count)} </h2>
                    <ul class="option_group">
                        <li class="option">${getFireBaseDatabase1('C', count)}</li>
                        <li class="option">${getFireBaseDatabase1('C', count)}</li>
                        <li class="option">${getFireBaseDatabase1('C', count)}</li>
                        <li class="option">${getFireBaseDatabase1('C', count)}</li>
                    </ul>`

    toggleActive()

}

function toggleActive() {
    let options = document.querySelectorAll('li.option')
    for (let i = 0; i < options.length; i++) {
        options[i].onclick = function() {
            for (let j = 0; j < options.length; j++) {
                if (options[j].classList.contains('active')) {
                    options[j].classList.remove('active')
                }
            }

            options[i].classList.add('active')
        }
    }
}