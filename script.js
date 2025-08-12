

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".container");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  containers.forEach(container => {
    observer.observe(container);
  });

  // Theme toggle logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");
  const rootElement = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      rootElement.setAttribute("data-theme", "dark");
      themeToggleBtn.textContent = "☀️";
    } else {
      rootElement.removeAttribute("data-theme");
      themeToggleBtn.textContent = "🌙";
    }
  }

  // Apply saved theme on load
  if (currentTheme) {
    applyTheme(currentTheme);
  }

  // Toggle theme on button click
  themeToggleBtn.addEventListener("click", () => {
    const isDark = rootElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      applyTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      applyTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  });

  // EmailJS form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();

      emailjs.sendForm('service_63jn48l', 'template_n6ol38s', this)
        .then(() => {
          alert("Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.");
          contactForm.reset();
        }, (error) => {
          alert("Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
          console.error("EmailJS Fehler:", error);
        });
    });
  }

  // Easter egg game logic
  const gameButton = document.getElementById("game-button");
  const gameModal = document.getElementById("game-modal");
  const closeGameBtn = document.getElementById("close-game");
  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-button");
  const feedback = document.getElementById("feedback");

  let secretNumber = Math.floor(Math.random() * 100) + 1;

  function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    feedback.textContent = "";
    guessInput.value = "";
  }

  gameButton.addEventListener("click", () => {
    gameModal.style.display = "flex";
    resetGame();
  });

  closeGameBtn.addEventListener("click", () => {
    gameModal.style.display = "none";
  });

  guessButton.addEventListener("click", () => {
    const guess = Number(guessInput.value);
    if (!guess || guess < 1 || guess > 100) {
      feedback.textContent = "Bitte gib eine Zahl zwischen 1 und 100 ein.";
      return;
    }
    if (guess === secretNumber) {
      feedback.textContent = "Glückwunsch! Du hast die Zahl erraten!";
    } else if (guess < secretNumber) {
      feedback.textContent = "Zu niedrig! Versuch es nochmal.";
    } else {
      feedback.textContent = "Zu hoch! Versuch es nochmal.";
    }
  });

  // Easter egg game 2 logic (Rock Paper Scissors)
  const game2Button = document.getElementById("game2-button");
  const game2Modal = document.getElementById("game2-modal");
  const closeGame2Btn = document.getElementById("close-game2");
  const rpsChoices = document.querySelectorAll(".rps-choice");
  const rpsResult = document.getElementById("rps-result");

  function getComputerChoice() {
    const choices = ["Schere", "Stein", "Papier"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      return "Unentschieden!";
    }
    if (
      (userChoice === "Schere" && computerChoice === "Papier") ||
      (userChoice === "Stein" && computerChoice === "Schere") ||
      (userChoice === "Papier" && computerChoice === "Stein")
    ) {
      return "Du hast gewonnen!";
    }
    return "Du hast verloren!";
  }

  game2Button.addEventListener("click", () => {
    game2Modal.style.display = "flex";
    rpsResult.textContent = "";
  });

  closeGame2Btn.addEventListener("click", () => {
    game2Modal.style.display = "none";
  });

  rpsChoices.forEach(button => {
    button.addEventListener("click", () => {
      const userChoice = button.getAttribute("data-choice");
      const computerChoice = getComputerChoice();
      const result = determineWinner(userChoice, computerChoice);
      rpsResult.textContent = `Du hast ${userChoice} gewählt. Computer hat ${computerChoice} gewählt. ${result}`;
    });
  });

  // Easter egg game 3 logic (Political Quiz)
  const game3Button = document.getElementById("game3-button");
  const game3Modal = document.getElementById("game3-modal");
  const closeGame3Btn = document.getElementById("close-game3");
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");
  const quizFeedback = document.getElementById("quiz-feedback");
  const nextQuestionBtn = document.getElementById("next-question");

  const quizData = [
    {
      question: "Wer ist der aktuelle Bundeskanzler von Deutschland?",
      options: ["Angela Merkel", "Olaf Scholz", "Friedrich Merz", "Annalena Baerbock"],
      answer: "Friedrich Merz"
    },
    {
      question: "Welche Partei ist traditionell konservativ?",
      options: ["SPD", "CDU", "Die Grünen", "FDP"],
      answer: "CDU"
    },
    {
      question: "Wann fand die deutsche Wiedervereinigung statt?",
      options: ["1989", "1990", "1991", "1992"],
      answer: "1990"
    }
  ];

  let currentQuestionIndex = 0;
  let answered = false;

  function loadQuestion(index) {
    answered = false;
    quizFeedback.textContent = "";
    nextQuestionBtn.style.display = "none";
    quizQuestion.textContent = quizData[index].question;
    quizOptions.innerHTML = "";
    quizData[index].options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.style.cssText = "margin:5px; padding:10px 20px; border-radius:12px; border:none; background:#9b59b6; color:#fff; font-weight:600; cursor:pointer;";
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        if (option === quizData[index].answer) {
          quizFeedback.textContent = "Richtig!";
          btn.style.backgroundColor = "#27ae60"; // green
        } else {
          quizFeedback.textContent = `Falsch! Die richtige Antwort ist: ${quizData[index].answer}`;
          btn.style.backgroundColor = "#c0392b"; // red
        }
        nextQuestionBtn.style.display = "inline-block";
      });
      quizOptions.appendChild(btn);
    });
  }

  game3Button.addEventListener("click", () => {
    game3Modal.style.display = "flex";
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);
  });

  closeGame3Btn.addEventListener("click", () => {
    game3Modal.style.display = "none";
  });

  nextQuestionBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      quizQuestion.textContent = "Quiz beendet! Danke fürs Spielen.";
      quizOptions.innerHTML = "";
      quizFeedback.textContent = "";
      nextQuestionBtn.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('mobile-nav-overlay');
  
  if (hamburger && nav && overlay) {
    function closeMenu() {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    
    function openMenu() {
      nav.classList.add('open');
      overlay.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    
    hamburger.addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    overlay.addEventListener('click', closeMenu);
    
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Schließe Menü bei Escape-Taste
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  }
  
  // Hamburger-Button Anzeige basierend auf Bildschirmgröße
  function toggleHamburgerDisplay() {
    const btn = document.getElementById('hamburger-menu');
    if (btn) {
      if (window.innerWidth <= 700) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
        // Schließe Menü wenn Bildschirm größer wird
        const nav = document.getElementById('main-nav');
        const overlay = document.getElementById('mobile-nav-overlay');
        if (nav && overlay) {
          nav.classList.remove('open');
          overlay.classList.remove('open');
        }
      }
    }
  }
  
  window.addEventListener('resize', toggleHamburgerDisplay);
  toggleHamburgerDisplay(); // Initial call
});
