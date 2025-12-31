/**
 * 🐴 New Year 2026 - Interactive Terminal Animation
 * エンジニア & オタク向け年賀状
 */

class NewYearTerminal {
    constructor() {
        this.currentStep = 0;
        this.steps = [
            { cmdId: 'cmd2', outputId: 'output2', delay: 2000 },
            { cmdId: 'cmd3', outputId: 'output3', delay: 2500 },
            { cmdId: 'cmd4', outputId: 'output4', delay: 2000 },
            { cmdId: 'cmd5', outputId: 'output5', delay: 2000 },
            { cmdId: 'cmd6', outputId: null, delay: 1500 }
        ];
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.konamiIndex = 0;
        this.konamiActivated = false;
        
        this.init();
    }

    init() {
        // Start animation sequence
        setTimeout(() => this.showNextStep(), 2000);
        
        // Floating elements are now pure CSS! 🎨
        
        // Setup Konami code listener
        this.setupKonamiCode();
        
        // Setup click listener for konami hint
        document.getElementById('konamiHint').addEventListener('click', () => {
            this.activateKonamiMode();
        });

        // Add click to skip functionality
        document.querySelector('.terminal').addEventListener('click', () => {
            if (this.currentStep < this.steps.length) {
                this.skipToEnd();
            }
        });

        console.log('%c🐴 Happy New Year 2026! 🐴', 'font-size: 24px; color: #ffd700; font-weight: bold;');
        console.log('%c午年おめでとうございます！', 'font-size: 16px; color: #39d353;');
        console.log('%c↑↑↓↓←→←→BA で隠しモード発動！', 'font-size: 12px; color: #8b949e;');
    }

    showNextStep() {
        if (this.currentStep >= this.steps.length) return;

        const step = this.steps[this.currentStep];
        
        // Show command
        const cmdElement = document.getElementById(step.cmdId);
        if (cmdElement) {
            cmdElement.classList.remove('hidden');
            cmdElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        // Show output after delay
        if (step.outputId) {
            setTimeout(() => {
                const outputElement = document.getElementById(step.outputId);
                if (outputElement) {
                    outputElement.classList.remove('hidden');
                    outputElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 800);
        }

        this.currentStep++;
        
        // Schedule next step
        setTimeout(() => this.showNextStep(), step.delay);
    }

    skipToEnd() {
        // Show all remaining steps immediately
        this.steps.forEach(step => {
            const cmdElement = document.getElementById(step.cmdId);
            const outputElement = document.getElementById(step.outputId);
            
            if (cmdElement) cmdElement.classList.remove('hidden');
            if (outputElement) outputElement.classList.remove('hidden');
        });
        
        this.currentStep = this.steps.length;
        
        // Scroll to bottom
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (this.konamiActivated) return;
            
            if (e.code === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateKonamiMode();
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activateKonamiMode() {
        if (this.konamiActivated) return;
        this.konamiActivated = true;

        // Add rainbow effect
        document.body.classList.add('konami-mode');
        
        // Play sound effect (if available)
        this.playKonamiSound();
        
        // Add running horse
        this.createRunningHorse();
        
        // Create confetti
        this.createConfetti();
        
        // Show secret message
        this.showSecretMessage();
        
        console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'font-size: 32px; color: #ff4757; font-weight: bold; text-shadow: 2px 2px #ffd700;');
    }

    playKonamiSound() {
        // Create a simple beep using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            
            notes.forEach((freq, i) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
                
                oscillator.start(audioContext.currentTime + i * 0.15);
                oscillator.stop(audioContext.currentTime + i * 0.15 + 0.3);
            });
        } catch (e) {
            // Audio not supported
        }
    }

    createRunningHorse() {
        const horse = document.createElement('div');
        horse.className = 'running-horse';
        horse.textContent = '🏇';
        document.body.appendChild(horse);
    }

    createConfetti() {
        const colors = ['#ff4757', '#ffd700', '#39d353', '#58a6ff', '#bc8cff', '#ffa657'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    }

    showSecretMessage() {
        const terminalBody = document.querySelector('.terminal-body');
        
        const secretDiv = document.createElement('div');
        secretDiv.className = 'output';
        secretDiv.innerHTML = `
            <div class="code-block" style="border-left-color: #ff4757;">
                <code>
<span class="comment">// 🎮 SECRET UNLOCKED! 🎮</span>
<span class="keyword">const</span> <span class="variable">secretMessage</span> = {
    <span class="property">type</span>: <span class="string">"Easter Egg"</span>,
    <span class="property">message</span>: <span class="string">"コナミコマンド発見おめでとう！🎊"</span>,
    <span class="property">bonus</span>: <span class="string">"今年も最高の年になりますように！"</span>,
    <span class="property">achievement</span>: <span class="string">"🏆 True Engineer Unlocked!"</span>
};

<span class="output-text">>>> Achievement: レトロゲーマー認定！</span>
                </code>
            </div>
        `;
        
        terminalBody.appendChild(secretDiv);
        secretDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Matrix-style background effect (subtle)
class MatrixBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -2; opacity: 0.03;';
        document.body.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.columns = [];
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン🐴';
        
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const columnCount = Math.floor(this.canvas.width / 20);
        this.columns = Array(columnCount).fill(0);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#39d353';
        this.ctx.font = '15px monospace';
        
        this.columns.forEach((y, i) => {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * 20;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.columns[i] = 0;
            } else {
                this.columns[i] = y + 20;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new NewYearTerminal();
    new MatrixBackground();
});

// Service Worker for offline support (optional - for PWA)
if ('serviceWorker' in navigator) {
    // Could add service worker registration here for PWA support
}
