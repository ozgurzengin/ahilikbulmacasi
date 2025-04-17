document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginScreen = document.querySelector('.login-screen');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const startButton = document.getElementById('startButton');
    const settingsBtn = document.getElementById('settingsBtn');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logoutButton');

    // Settings Modal Elements
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.querySelector('.close-settings');
    const musicVolumeSlider = document.getElementById('musicVolume');
    const sfxVolumeSlider = document.getElementById('sfxVolume');
    const highScoreDisplay = document.getElementById('highScoreDisplay');

    // Kullanıcı adını kontrol et ve göster
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        loginScreen.style.display = 'none';
        welcomeScreen.style.display = 'flex';
        welcomeMessage.textContent = `Hoş Geldiniz, ${savedUsername}`;
    } else {
        loginScreen.style.display = 'flex';
        welcomeScreen.style.display = 'none';
    }

    // Create countdown screen
    const countdownScreen = document.createElement('div');
    countdownScreen.classList.add('container', 'countdown-screen');
    countdownScreen.style.display = 'none';

    const backgroundAnimation = document.createElement('div');
    backgroundAnimation.classList.add('background-animation');

    const countdownBox = document.createElement('div');
    countdownBox.classList.add('countdown-box');

    const countdownNumber = document.createElement('div');
    countdownNumber.classList.add('countdown-number');

    countdownBox.appendChild(countdownNumber);
    countdownScreen.appendChild(backgroundAnimation);
    countdownScreen.appendChild(countdownBox);
    document.body.appendChild(countdownScreen);

    // Create quiz screen
    const quizScreen = document.createElement('div');
    quizScreen.classList.add('container', 'quiz-screen');
    quizScreen.style.display = 'none';

    const quizBox = document.createElement('div');
    quizBox.classList.add('quiz-box');

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    quizBox.appendChild(questionElement);
    quizBox.appendChild(optionsContainer);
    quizScreen.appendChild(backgroundAnimation.cloneNode(true));
    quizScreen.appendChild(quizBox);
    document.body.appendChild(quizScreen);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();

        if (username) {
            localStorage.setItem('username', username);
            loginScreen.style.display = 'none';
            welcomeScreen.style.display = 'flex';
            welcomeMessage.textContent = `Hoş Geldiniz, ${username}`;
        }
    });

    // Çıkış yap butonu
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        settingsModal.style.display = 'none';
        welcomeScreen.style.display = 'none';
        loginScreen.style.display = 'flex';
        welcomeMessage.textContent = 'Hoş Geldiniz';
    });

    // Quiz Questions (30 soru)
    let questions = [
        {
            question: "Ahilik teşkilatı hangi alanda faaliyet göstermiştir?",
            options: ["Savaş", "Ticaret ve zanaat", "Spor", "Tıp"],
            correctAnswer: "Ticaret ve zanaat"
        },
        {
            question: "Ahilikte en önemli erdemlerden biri nedir?",
            options: ["Zenginlik", "Kurnazlık", "Dürüstlük", "Hırs"],
            correctAnswer: "Dürüstlük"
        },
        {
            question: "Ahilik teşkilatının kurucusu kimdir?",
            options: ["Mevlana", "Hacı Bektaş Veli", "Ahi Evran", "Yunus Emre"],
            correctAnswer: "Ahi Evran"
        },
        {
            question: "Ahilikte ustalığa geçmeden önce hangi aşama vardır?",
            options: ["Patronluk", "Kalfalık", "Çıraklık", "İşsizlik"],
            correctAnswer: "Çıraklık"
        },
        {
            question: "Ahilik hangi dönemde ortaya çıkmıştır?",
            options: ["Osmanlı", "Selçuklu", "Cumhuriyet", "Roma"],
            correctAnswer: "Selçuklu"
        },
        {
            question: "Ahilikte iş ahlakı neyle sağlanır?",
            options: ["Rekabetle", "Polisle", "Ahlak kurallarıyla", "Parayla"],
            correctAnswer: "Ahlak kurallarıyla"
        },
        {
            question: "Ahi Evran’ın asıl mesleği neydi?",
            options: ["Doktor", "Deri ustası", "Savaşçı", "Kuyumcu"],
            correctAnswer: "Deri ustası"
        },
        {
            question: "Ahiler hangi gün toplanırdı?",
            options: ["Pazartesi", "Cuma", "Çarşamba", "Her gün"],
            correctAnswer: "Çarşamba"
        },
        {
            question: "Ahilikte işyeri açmak için ne gerekir?",
            options: ["Para", "Aile izni", "Ustalık belgesi", "Miras"],
            correctAnswer: "Ustalık belgesi"
        },
        {
            question: "Aşağıdakilerden hangisi Ahilik ilkelerindendir?",
            options: ["Kendi çıkarını düşün", "Alırken kazıkla", "Komşuya zarar verme", "Rakibi küçümse"],
            correctAnswer: "Komşuya zarar verme"
        },
        {
            question: "Ahilikte “pabucu dama atılmak” ne demektir?",
            options: ["Ayakkabı satışı", "Esnafın işini bırakması", "Hile yapan esnafın teşhir edilmesi", "Yeni dükkân açılması"],
            correctAnswer: "Hile yapan esnafın teşhir edilmesi"
        },
        {
            question: "Ahilik hangi şehirde daha çok gelişmiştir?",
            options: ["Bursa", "Konya", "Kırşehir", "Antalya"],
            correctAnswer: "Kırşehir"
        },
        {
            question: "Ahiliğe yeni katılan biri ilk olarak ne olur?",
            options: ["Patron", "Usta", "Kalfa", "Çırak"],
            correctAnswer: "Çırak"
        },
        {
            question: "Ahilik teşkilatında “sehpa” neyi ifade eder?",
            options: ["Oturak", "Ceza yeri", "Üretim tezgâhı", "Toplantı masası"],
            correctAnswer: "Üretim tezgâhı"
        },
        {
            question: "Ahilikte esnaf denetimini kim yapar?",
            options: ["Belediye", "Polis", "Ahi babası", "Vergi memuru"],
            correctAnswer: "Ahi babası"
        },
        {
            question: "Ahilik teşkilatı neyi teşvik ederdi?",
            options: ["Tembellik", "Yardımlaşma", "Rekabet", "Kopya çekme"],
            correctAnswer: "Yardımlaşma"
        },
        {
            question: "Ahilikte 'elini, kapını, sofranı açık tut' neyi ifade eder?",
            options: ["Hırsızlık", "Cömertlik", "Gösteriş", "Kibir"],
            correctAnswer: "Cömertlik"
        },
        {
            question: "Ahilik sisteminde işini iyi yapana ne verilir?",
            options: ["Ceza", "Sürgün", "Ödül ve unvan", "İzin"],
            correctAnswer: "Ödül ve unvan"
        },
        {
            question: "Ahilik teşkilatı günümüzde neye benzer?",
            options: ["Spor kulübü", "Sendika ve meslek odası", "Hastane", "Okul"],
            correctAnswer: "Sendika ve meslek odası"
        },
        {
            question: "Aşağıdakilerden hangisi Ahilik’le uyuşmaz?",
            options: ["Saygı", "Hile", "Emek", "Sabır"],
            correctAnswer: "Hile"
        },
        {
            question: "Ahilikte kadınlar hangi isimle anılırdı?",
            options: ["Bacıyan-ı Rum", "Hanımefendi", "Ahi kadın", "Sultanlar"],
            correctAnswer: "Bacıyan-ı Rum"
        },
        {
            question: "Ahiliğin temel amacı nedir?",
            options: ["Para kazanmak", "Ticarette düzen sağlamak", "Savaş çıkarmak", "Rakip yok etmek"],
            correctAnswer: "Ticarette düzen sağlamak"
        },
        {
            question: "Ahilik ilkelerine göre müşteri nasıl karşılanmalıdır?",
            options: ["Güler yüzle", "Umursamazca", "Sinirli", "Küstahça"],
            correctAnswer: "Güler yüzle"
        },
        {
            question: "Ahilik sisteminde usta ne zaman olunur?",
            options: ["Çıraklıktan hemen sonra", "Kalfalıktan sonra sınavla", "Rastgele", "Para verince"],
            correctAnswer: "Kalfalıktan sonra sınavla"
        },
        {
            question: "Ahilik sisteminde en üst makam kimdir?",
            options: ["Çırak", "Kalfa", "Ahi Baba", "Öğrenci"],
            correctAnswer: "Ahi Baba"
        },
        {
            question: "Ahilik anlayışına göre komşunun malı…",
            options: ["Rakip sayılır", "Çalınabilir", "Korunmalıdır", "Kıskanılır"],
            correctAnswer: "Korunmalıdır"
        },
        {
            question: "Ahilikte lonca nedir?",
            options: ["Düğün salonu", "Meslek birliği", "Askeri birlik", "Okul"],
            correctAnswer: "Meslek birliği"
        },
        {
            question: "Ahilik neyi reddeder?",
            options: ["Dayanışma", "Adalet", "Haksız kazanç", "Bilgi paylaşımı"],
            correctAnswer: "Haksız kazanç"
        },
        {
            question: "Ahilikte çırak ne yapar?",
            options: ["Dinlenir", "İşe yardım eder, öğrenir", "Patronluk taslar", "Denetim yapar"],
            correctAnswer: "İşe yardım eder, öğrenir"
        },
        {
            question: "Ahilik haftası hangi ayda kutlanır?",
            options: ["Ocak", "Mayıs", "Eylül", "Kasım"],
            correctAnswer: "Eylül"
        }
    ];

    // Soruları ve şıkları karıştırmak için Fisher-Yates algoritması
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    let currentQuestionIndex = 0;
    let score = 0;
    let questionTimer;

    startButton.addEventListener('click', () => {
        questions = shuffleArray([...questions]);
        currentQuestionIndex = 0;
        score = 0;

        welcomeScreen.style.display = 'none';
        countdownScreen.style.display = 'flex';
        startCountdown();
    });

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        const timerBar = document.createElement('div');
        timerBar.classList.add('question-timer');
        timerBar.style.width = '100%';
        timerBar.style.height = '5px';
        timerBar.style.background = '#03e9f4';
        timerBar.style.marginBottom = '10px';
        quizBox.insertBefore(timerBar, questionElement);

        // Şıkları karıştır
        const shuffledOptions = shuffleArray([...currentQuestion.options]);
        optionsContainer.innerHTML = '';
        shuffledOptions.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.classList.add('option-btn');
            optionButton.addEventListener('click', () => checkAnswer(option, optionButton));
            optionsContainer.appendChild(optionButton);
        });

        let timeLeft = 5;
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerBar.style.width = `${(timeLeft / 5) * 100}%`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                moveToNextQuestion(false);
            }
        }, 1000);

        questionTimer = timerInterval;
    }

    function moveToNextQuestion(answered) {
        if (questionTimer) {
            clearInterval(questionTimer);
        }

        const existingTimerBar = quizBox.querySelector('.question-timer');
        if (existingTimerBar) {
            existingTimerBar.remove();
        }

        const existingErrorMessage = quizBox.querySelector('div[style*="color: red"]');
        if (existingErrorMessage) {
            existingErrorMessage.remove();
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    function checkAnswer(selectedOption, selectedButton) {
        if (questionTimer) {
            clearInterval(questionTimer);
        }

        const currentQuestion = questions[currentQuestionIndex];
        const buttons = document.querySelectorAll('.option-btn');

        buttons.forEach(btn => btn.disabled = true);

        const existingTimerBar = quizBox.querySelector('.question-timer');
        if (existingTimerBar) {
            existingTimerBar.remove();
        }

        if (selectedOption === currentQuestion.correctAnswer) {
            selectedButton.classList.add('correct-answer');
            score += 10; // Her doğru cevap 10 puan
        } else {
            selectedButton.classList.add('incorrect-answer');

            buttons.forEach(btn => {
                if (btn.textContent === currentQuestion.correctAnswer) {
                    btn.classList.add('correct-answer');
                }
            });

            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Yanlış Cevap! Doğru Cevabı Seçiniz.';
            errorMessage.style.color = 'red';
            errorMessage.style.marginTop = '20px';
            errorMessage.style.textAlign = 'center';
            quizBox.appendChild(errorMessage);
        }

        setTimeout(() => {
            moveToNextQuestion(true);
        }, 1500);
    }

    // Ünvan belirleme fonksiyonu
    function getTitle(score) {
        if (score <= 50) return 'Yiğit';
        else if (score <= 100) return 'Çırak';
        else if (score <= 150) return 'Yamak';
        else if (score <= 200) return 'Kalfa';
        else if (score <= 250) return 'Usta';
        else if (score <= 300) return 'Ahi';
        else return 'Şeyh';
    }

    function endQuiz() {
        quizScreen.style.display = 'none';
        updateHighScore(score);

        const returnToMenuButton = document.createElement('button');
        returnToMenuButton.textContent = 'Ana Menüye Dön';
        returnToMenuButton.classList.add('return-to-menu-btn');

        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('results-container');
        resultsContainer.innerHTML = `
            <h2>Quiz Sonucu</h2>
            <p>Puanınız: ${score}/${questions.length * 10}</p>
        `;
        resultsContainer.appendChild(returnToMenuButton);

        // Ünvanı ekle
        const titleElement = document.createElement('div');
        titleElement.textContent = `Ünvanınız: ${getTitle(score)}`;
        titleElement.classList.add('title-display');
        resultsContainer.appendChild(titleElement);

        document.body.appendChild(resultsContainer);

        resultsContainer.style.position = 'fixed';
        resultsContainer.style.top = '50%';
        resultsContainer.style.left = '50%';
        resultsContainer.style.transform = 'translate(-50%, -50%)';
        resultsContainer.style.background = 'rgba(255, 255, 255, 0.1)';
        resultsContainer.style.padding = '40px';
        resultsContainer.style.borderRadius = '10px';
        resultsContainer.style.textAlign = 'center';
        resultsContainer.style.zIndex = '1000';
        resultsContainer.style.color = '#fff';

        returnToMenuButton.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;

            resultsContainer.style.display = 'none';

            welcomeScreen.style.display = 'flex';
        });
    }

    function startCountdown() {
        let count = 3;
        countdownNumber.textContent = count;

        const countdownInterval = setInterval(() => {
            count--;

            if (count > 0) {
                countdownNumber.textContent = count;
            } else {
                clearInterval(countdownInterval);
                countdownScreen.style.display = 'none';
                quizScreen.style.display = 'flex';
                displayQuestion();
            }
        }, 1000);
    }

    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    musicVolumeSlider.addEventListener('input', (e) => {
        console.log('Müzik Ses Düzeyi:', e.target.value);
    });

    sfxVolumeSlider.addEventListener('input', (e) => {
        console.log('Efekt Ses Düzeyi:', e.target.value);
    });

    function updateHighScore(newScore) {
        const currentHighScore = localStorage.getItem('highScore') || 0;
        if (newScore > currentHighScore) {
            localStorage.setItem('highScore', newScore);
            highScoreDisplay.textContent = `En Yüksek Rekor: ${newScore}`;
        }
    }

    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
        highScoreDisplay.textContent = `En Yüksek Rekor: ${savedHighScore}`;
    }
});