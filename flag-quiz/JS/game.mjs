export class FlagQuiz {
  constructor() {
    this.images = {
      cameroon: "../images/Map_of_Cameroon.jpeg",
      albania: "../images/Map_of_Albania.jpeg",
      japan: "../images/Map_of_Japan.jpeg",
      denmark: "../images/Map_of_Denmark.jpg",
      gabon: "../images/Map_of_Gabon.jpeg",
      madagascar: "../images/Map_of_Madagascar.jpeg",
      mali: "../images/Map_of_Mali.jpeg",
      "côte d'ivoire": "../images/Map_of_CoteDIvoire.jpeg",
      argentina: "../images/Map_of_Argentina.jpeg",
      ghana: "../images/Map_of_Ghana.jpeg",
      norway: "../images/Map_of_Norway.jpeg",
      italy: "../images/Map_of_Italy.jpeg",
      portugal: "../images/Map_of_Portugal.jpeg",
      qatar: "../images/Map_of_Qatar.jpeg",
      "united kingdom": "../images/Map_of_UK.jpeg",
      ireland: "../images/Map_of_ireland.jpeg",
      netherlands: "../images/Map_of_Netherlands.jpg",
      scotland: "../images/Map_of_Scotland.jpg",
      "united states of america": "../images/Map_of_USA.jpeg",
      "south korea": "../images/Map_of_southKorea.jpeg",
      switzerland: "../images/Map_of_Switzerland.jpeg",
      angola: "../images/Map_of_Angola.jpeg",
      somalia: "../images/Map_of_Somalia.jpeg",
      poland: "../images/Map_of_poland.webp",
      romania: "../images/Map_of_romania.jpg",
      russia: "../images/Map_of_russia.jpg",
      france: "../images/Map_of_France.jpeg",
      honduras: "../images/Map_of_Honduras.jpeg",
      india: "../images/Map_of_India.jpeg",
      greece: "../images/Map_of_Greece.jpeg",
      mexico: "../images/Map_of_mexico.jpeg",
      "papua new guinea" : "../images/Map_of_PapuaNewGuinea.jpeg",
      togo: "../images/Map_of_Togo.jpeg",
      austria: "../images/Map_of_Austria.jpeg",
      canada: "../images/Map_of_canada.jpeg",
    };

    this.questions = [
      {
        q: "What is the oldest flag in the world?",
        a: [
          { img: "cameroon", correct: false },
          { img: "albania", correct: false },
          { img: "denmark", correct: true },
          { img: "gabon", correct: false },
        ],
      },
      {
        q: "What country is the fourth biggest island in the world?",
        a: [
          { img: "gabon", correct: false },
          { img: "madagascar", correct: true },
          { img: "cameroon", correct: false },
          { img: "mali", correct: false },
        ],
      },
      {
        q: "The Irish flag is often confused with which other country?",

        a: [
          { img: "côte d'ivoire", correct: true },
          { img: "japan", correct: false },
          { img: "argentina", correct: false },
          { img: "ghana", correct: false },
        ],
      },
      {
        q: "Whose flag is known as ‘Il Tricolore' ",

        a: [
          { img: "norway", correct: false },
          { img: "italy", correct: true },
          { img: "portugal", correct: false },
          { img: "qatar", correct: false },
        ],
      },
      {
        q: "Supposedly home to a “monster,” Loch Ness is one of many inland seas—or “lochs”—in which country?",

        a: [
          { img: "united kingdom", correct: false },
          { img: "ireland", correct: false },
          { img: "netherlands", correct: false },
          { img: "scotland", correct: true },
        ],
      },
      {
        q: "In which country are the world’s 10th coldest cities located?",

        a: [
          { img: "united states of america", correct: false },
          { img: "south korea", correct: false },
          { img: "russia", correct: true },
          { img: "switzerland", correct: false },
        ],
      },
      {
        q: "Which country is the second largest lusophone (portuguese speaking)?",

        a: [
          { img: "angola", correct: true },
          { img: "côte d'ivoire", correct: false },
          { img: "somalia", correct: false },
          { img: "portugal", correct: false },
        ],
      },
      {
        q: "If you turned the Indonesian flag upside down which European country's flag would you get?",

        a: [
          { img: "poland", correct: true },
          { img: "romania", correct: false },
          { img: "russia", correct: false },
          { img: "italy", correct: false },
        ],
      },
      {
        q: "There was a period of 15 years when the flag of which country was just a white flag?",

        a: [
          { img: "norway", correct: false },
          { img: "france", correct: true },
          { img: "austria", correct: false },
          { img: "honduras", correct: false },
        ],
      },

      {
        q: "Only two countries in the world have a squared flag. Which one?",

        a: [
          { img: "mexico", correct: false },
          { img: "papua new guinea", correct: false },
          { img: "togo", correct: false },
          { img: "switzerland", correct: true },
        ],
      },

      {
        q: "The largest flag ever made, according to Guinness World Records ?",

        a: [
          { img: "united states of america", correct: false },
          { img: "romania", correct: true },
          { img: "greece", correct: false },
          { img: "india", correct: false },
        ],
      },

      {
        q: "Which country is known to be called 'Land of The Rising Sun' ",

        a: [
          { img: "japan", correct: true },
          { img: "south korea", correct: false },
          { img: "canada", correct: false },
          { img: "somalia", correct: false },
        ],
      },
    ];

    this.initDOMElements();
    this.questionNumber = 0;
    this.score = 0;
    this.timerInterval = null;

    this.startBtn.addEventListener("click", () => this.startQuiz());
    this.nextBtn.addEventListener("click", () => this.displayNextQuestion());
  }

  //call DOM elements
  initDOMElements() {
    this.quizContainer = document.querySelector(".quiz-container");
    this.questionElement = this.quizContainer.querySelector(".question");
    this.optionsElement = this.quizContainer.querySelector(".options");
    this.nextBtn = this.quizContainer.querySelector(".next-btn");
    this.quizResult = document.querySelector(".quiz-result");
    this.startBtnContainer = document.querySelector(".start-btn-container");
    this.startBtn = this.startBtnContainer.querySelector(".start-btn");
    this.timerDisplay = this.quizContainer.querySelector(".timer");
  }

  //randomize options positions
  shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  resetLocalStorage() {
    for (let i = 0; i < this.questions.length; i++) {
      localStorage.removeItem(`userAnswer_${i}`);
    }
  }

  //initilaize funtions
  startQuiz() {
    this.questionNumber = 0;
    this.score = 0;
    this.resetLocalStorage();
    this.startBtnContainer.style.display = "none";
    this.quizContainer.style.display = "block";
    this.loadQuestion();
  }

  //load questions with timer
  loadQuestion() {
    this.clearTimer();
    const currentQuestion = this.questions[this.questionNumber];
    this.questionElement.textContent = currentQuestion.q;
    this.optionsElement.innerHTML = "";

    const shuffledAnswers = this.shuffleArray(currentQuestion.a);
    shuffledAnswers.forEach((option) => this.createOptionElement(option));

    this.setupTimer();
  }

  //option element
  createOptionElement(option) {
    const imgSrc = this.images[option.img];
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.innerHTML = `
            <img src="${imgSrc}" alt="${option.img}" class="option-image" />
            <span>${
              option.img.charAt(0).toUpperCase() + option.img.slice(1)
            }</span>
        `;

    optionElement.addEventListener("click", () =>
      this.checkAnswer(option, optionElement)
    );
    this.optionsElement.appendChild(optionElement);
  }

  //check answers and clear the timer
  checkAnswer(selectedOption, button) {
    const isCorrect = selectedOption.correct;
    localStorage.setItem(
      `userAnswer_${this.questionNumber}`,
      selectedOption.img
    );

    button.classList.add(isCorrect ? "correct" : "incorrect");
    if (isCorrect) this.score++;

    this.disableOptions();
    this.clearTimer();
  }
  //disable options after answered
  disableOptions() {
    const allOptions = this.optionsElement.querySelectorAll(".option");
    allOptions.forEach((o) => o.classList.add("disabled"));
  }

  //set timer
  setupTimer() {
    let secondsLeft = 10;
    this.timerDisplay.textContent = `Time Left: ${secondsLeft} seconds`;

    this.timerInterval = setInterval(() => {
      secondsLeft--;
      this.timerDisplay.textContent = `Time Left: ${secondsLeft} seconds`;

      if (secondsLeft <= 3) {
        this.timerDisplay.classList.add("danger");
      }

      if (secondsLeft <= 0) {
        clearInterval(this.timerInterval);
        this.displayNextQuestion();
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.timerInterval);
  }

  //display next question
  displayNextQuestion() {
    if (this.questionNumber >= this.questions.length - 1) {
      this.displayQuizResult();
      return;
    }

    this.questionNumber++;
    this.loadQuestion();
  }

  // Display user result
  displayQuizResult() {
    this.clearTimer();
    this.quizResult.style.display = "flex";
    this.quizContainer.style.display = "none";
    this.quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${this.score} out of ${this.questions.length}.`;
    this.quizResult.appendChild(resultHeading);

    // Get the logged-in user from sessionStorage
    let userLogin = JSON.parse(sessionStorage.getItem("users"));

    if (userLogin) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find and update the user's score in localStorage if the new score is higher
      for (let user of users) {
        if (user.username === userLogin.username) {
          if (this.score > user.topScore) {
            user.topScore = this.score;
            localStorage.setItem("users", JSON.stringify(users));

            // Update sessionStorage with the latest topScore for the logged-in user
            user.topScore = this.score;
            sessionStorage.setItem("users", JSON.stringify(user));
          }

          break;
        }
      }
    }

    // Display each question result
    for (let i = 0; i < this.questions.length; i++) {
      this.addResultItem(i);
    }

    this.addRetakeButton();
  }

  //result page display
  addResultItem(index) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${index}`);
    const correctAnswer = this.questions[index].a.find(
      (option) => option.correct
    ).img;
    const answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `
            <div class="question">Question ${index + 1}: ${
      this.questions[index].q
    }</div>
            <div class="user-answer">Your answer: ${
              userAnswer || "Not Answered"
            }</div>
            <div class="correct-answer">Correct answer: ${correctAnswer}</div>
        `;
    this.quizResult.appendChild(resultItem);
  }

  //retake quiz button and function
  addRetakeButton() {
    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.textContent = "Retake Quiz";
    retakeBtn.addEventListener("click", () => this.retakeQuiz());
    this.quizResult.appendChild(retakeBtn);
  }
  //retake quiz initializer
  retakeQuiz() {
    this.questionNumber = 0;
    this.score = 0;
    this.resetLocalStorage();
    this.quizResult.style.display = "none";
    this.quizContainer.style.display = "block";
    this.startQuiz();
  }
}

// Initialize the quiz
const quiz = new FlagQuiz();
