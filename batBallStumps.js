    // Add click effect to buttons
        function addClickEffect(button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        }

        // Show reset animation
        function showResetAnimation() {
            const resultDisplay = document.getElementById('result');
            resultDisplay.style.animation = 'none';
            setTimeout(() => {
                resultDisplay.style.animation = 'resultPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';    //animation for result display using animation shorthand
            }, 10);
        }

        
        let storedScore = localStorage.getItem('score');
        let score;
        resetScore(storedScore);

        function resetScore(storedScore){
            if(storedScore !== undefined && storedScore !== null) {
                score = JSON.parse(storedScore);
            } else {
                score = {
                    win: 0,
                    lost: 0,
                    tie: 0
                };
            }
            score.displayScore = function(){
                return `🏆 Won: ${this.win} | 💔 Lost: ${this.lost} | 🤝 Tie: ${this.tie}`;
            };
            showResult();
        } 

        function generateComputerChoice(){
            let randomNumber = Math.random() * 3;
            if (randomNumber > 0 && randomNumber <= 1) {
                return 'Bat';
            } else if (randomNumber > 1 && randomNumber <= 2) {
                return 'Ball';
            } else {
                return 'Stump';
            }
        }

        function getResult(userMove, computerMove){
            if(userMove === 'Bat'){
               if (computerMove === 'Bat') {
                    score.tie++;
                    return '🤝 It\'s a tie!';
                } else if (computerMove === 'Ball') {
                    score.win++;
                    return '🎉 You win!';
                } else if( computerMove === 'Stump') {
                    score.lost++;
                    return '😢 You lose!';
                } 
            }
            else if(userMove === 'Ball'){
                if (computerMove === 'Bat') {
                    score.lost++;
                    return '😢 You lose!';
                } else if (computerMove === 'Ball') {
                    score.tie++;
                    return '🤝 It\'s a tie!';
                } else if( computerMove === 'Stump') {
                    score.win++;
                    return '🎉 You win!';
                } 
            }
            else if(userMove === 'Stump'){
                if (computerMove === 'Bat') {
                    score.win++;
                    return '🎉 You win!';
                } else if (computerMove === 'Ball') {
                    score.lost++;
                    return '😢 You lose!';
                } else if( computerMove === 'Stump') {
                    score.tie++;
                    return '🤝 It\'s a tie!';
                } 
            }
        }

        function showResult(userMove, computerMove, resultMsg) {
            localStorage.setItem('score', JSON.stringify(score));

            const emojiMap = {
                'Bat': '🏏',
                'Ball': '⚾',
                'Stump': '🏛️'
            };

            document.querySelector('#user-move').innerText = userMove ? 
                `${emojiMap[userMove]} You chose: ${userMove}` : '';
            document.querySelector('#computer-move').innerText = computerMove ? 
                `🤖 Computer chose: ${computerMove} ${emojiMap[computerMove]}`: '';
            document.querySelector('#result-message').innerText = resultMsg || '';
            document.querySelector('#score-display').innerText = score.displayScore();

            // Add result animation
            if (resultMsg) {
                const resultDisplay = document.getElementById('result');
                resultDisplay.style.animation = 'none';
                setTimeout(() => {
                    resultDisplay.style.animation = 'resultPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                }, 10);
            }
        }
