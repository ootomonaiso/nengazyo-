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
        
        // アニメネタ反応データベース 🎬
        this.animeResponses = {
            // 涼宮ハルヒの憂鬱
            'ハルヒ': { emoji: '🎀', message: 'ただの人間には興味ありません！宇宙人、未来人、超能力者、異世界人がいたら私のところに来なさい！', series: 'ハルヒ' },
            'haruhi': { emoji: '🎀', message: 'ただの人間には興味ありません！', series: 'ハルヒ' },
            'キョン': { emoji: '😑', message: 'やれやれ、全く...このコードにもバグはつきものだ', series: 'ハルヒ' },
            '長門': { emoji: '📚', message: '...情報統合思念体からのメッセージ：コンパイル完了', series: 'ハルヒ' },
            'みくる': { emoji: '🍵', message: 'ふぇぇ...これは禁則事項です！', series: 'ハルヒ' },
            '古泉': { emoji: '😊', message: '面白いですね。この状況、実に興味深い', series: 'ハルヒ' },
            'sos団': { emoji: '🏫', message: '世界を大いに盛り上げるための涼宮ハルヒの団！入団希望者募集中！', series: 'ハルヒ' },
            'エンドレスエイト': { emoji: '🔄', message: 'キョン君、宿題やった？（15532回目）', series: 'ハルヒ' },
            '消失': { emoji: '❄️', message: '12月18日...長門、待ってろ', series: 'ハルヒ' },
            'god knows': { emoji: '🎸', message: '♪ 渇いた心で駆け抜ける ごらん僕は走ってゆく ♪', series: 'ハルヒ' },
            
            // Key作品 - CLANNAD
            'clannad': { emoji: '🍡', message: 'CLANNADは人生...だんご大家族♪', series: 'Key' },
            'クラナド': { emoji: '🍡', message: 'この街は嫌いだ。忘れたい思い出が関わっている場所だから...でも', series: 'Key' },
            '渚': { emoji: '🌸', message: 'この学校のことが、大好きです！', series: 'Key' },
            '朋也': { emoji: '💤', message: '遅刻だ遅刻だ...まあいいか', series: 'Key' },
            '杏': { emoji: '📖', message: '辞書は凶器よ！', series: 'Key' },
            '智代': { emoji: '🥋', message: '64ヒット...', series: 'Key' },
            'ことみ': { emoji: '🎻', message: 'ともだちになってくれますか？', series: 'Key' },
            '風子': { emoji: '⭐', message: 'ヒトデです！ヒトデをあげます！', series: 'Key' },
            'だんご': { emoji: '🍡', message: 'だんご だんご だんご だんご だんご大家族♪', series: 'Key' },
            
            // Key作品 - AIR
            'air': { emoji: '🪶', message: '1000の夏を越えて...ゴール', series: 'Key' },
            '観鈴': { emoji: '🦕', message: 'にはは！がお！', series: 'Key' },
            'がお': { emoji: '🦖', message: 'がおがお！観鈴ちん最高！', series: 'Key' },
            '国崎': { emoji: '🎭', message: '人形劇で稼ぐぜ...', series: 'Key' },
            
            // Key作品 - Kanon
            'kanon': { emoji: '🦊', message: 'うぐぅ...あゆの出番です！', series: 'Key' },
            'うぐぅ': { emoji: '🦊', message: 'うぐぅ！たいやき泥棒じゃないもん！', series: 'Key' },
            'あゆ': { emoji: '🦊', message: 'ボクの名前はあゆ！月宮あゆ！', series: 'Key' },
            '祐一': { emoji: '😏', message: '7年前の約束...思い出せない', series: 'Key' },
            'たいやき': { emoji: '🐟', message: 'たいやき...奢ってくれるの？', series: 'Key' },
            '舞': { emoji: '⚔️', message: '...魔物は、私が倒す', series: 'Key' },
            '佐祐理': { emoji: '😊', message: 'あははーっ♪', series: 'Key' },
            
            // Key作品 - リトルバスターズ
            'リトバス': { emoji: '⚾', message: 'ミッションスタートだ！リトルバスターズ、最高の仲間たち！', series: 'Key' },
            'リトルバスターズ': { emoji: '⚾', message: '僕らはいつだってリトルバスターズさ！', series: 'Key' },
            '理樹': { emoji: '🌟', message: 'この世界の秘密...', series: 'Key' },
            '恭介': { emoji: '😎', message: 'ミッション！世界の秘密を解き明かせ！', series: 'Key' },
            '鈴': { emoji: '🐱', message: 'にゃー！猫が一番！', series: 'Key' },
            'クド': { emoji: '🚀', message: 'わふー！私、頑張りますー！', series: 'Key' },
            'わふー': { emoji: '🐕', message: 'わふー！クドリャフカ、報告しますっ！', series: 'Key' },
            '筋肉': { emoji: '💪', message: '筋肉いぇいいぇーい！筋肉いぇいいぇーい！', series: 'Key' },
            
            // Key作品 - Rewrite
            'rewrite': { emoji: '🌍', message: 'この星の記憶...書き換える', series: 'Key' },
            '小鳥': { emoji: '🦜', message: 'ドルイドの力...', series: 'Key' },
            '篝': { emoji: '🔥', message: '...地球を救う鍵', series: 'Key' },
            
            // Key作品 - Angel Beats!
            'angel beats': { emoji: '👼', message: 'God is dead. 神はいない！SSS、戦線開始！', series: 'Key' },
            'エンジェルビーツ': { emoji: '👼', message: '死んでたまるか戦線！', series: 'Key' },
            'ゆり': { emoji: '🔫', message: '神への反逆、ここに始まる！', series: 'Key' },
            '音無': { emoji: '💭', message: 'ここは死後の世界...？', series: 'Key' },
            '天使': { emoji: '👼', message: 'ハンドソニック...', series: 'Key' },
            'かなで': { emoji: '🍜', message: 'マーボー豆腐...美味しい', series: 'Key' },
            '岩沢': { emoji: '🎸', message: '♪ My Soul, Your Beats! ♪', series: 'Key' },
            'ガルデモ': { emoji: '🎤', message: 'Girls Dead Monster、ライブ開始！', series: 'Key' },
            'tkt': { emoji: '😭', message: 'TK「Get chance and luck!」', series: 'Key' },
            
            // その他の名作アニメ
            'シュタゲ': { emoji: '🔬', message: 'エル・プサイ・コングルゥ...世界線変動率0.048596%', series: 'シュタゲ' },
            'シュタインズゲート': { emoji: '⏰', message: 'これが、シュタインズ・ゲートの選択だ！', series: 'シュタゲ' },
            '助手': { emoji: '🧪', message: 'クリスティーナ！', series: 'シュタゲ' },
            'オカリン': { emoji: '📱', message: '俺だ...機関の陰謀だ！', series: 'シュタゲ' },
            'まゆり': { emoji: '⭐', message: 'トゥットゥルー♪まゆしぃです！', series: 'シュタゲ' },
            'だる': { emoji: '💻', message: 'リア充爆発しろ！...でもスパハカだから許す', series: 'シュタゲ' },
            'トゥットゥルー': { emoji: '🌟', message: 'トゥットゥルー♪', series: 'シュタゲ' },
            
            // まどマギ
            'まどか': { emoji: '🎀', message: '私、魔法少女になる！', series: 'まどマギ' },
            'まどマギ': { emoji: '💫', message: '希望を祈る気持ちが、呪いに変わる', series: 'まどマギ' },
            'ほむら': { emoji: '⏱️', message: '何度でも...何度でも繰り返す', series: 'まどマギ' },
            'マミ': { emoji: '🎗️', message: 'ティロ・フィナーレ！...首が', series: 'まどマギ' },
            'さやか': { emoji: '💙', message: 'あたしって、ほんとバカ', series: 'まどマギ' },
            'キュゥべえ': { emoji: '🐱', message: '僕と契約して、魔法少女になってよ！', series: 'まどマギ' },
            'qb': { emoji: '🐱', message: 'わけがわからないよ', series: 'まどマギ' },
            
            // エヴァ
            'エヴァ': { emoji: '🤖', message: '逃げちゃダメだ逃げちゃダメだ逃げちゃダメだ...', series: 'エヴァ' },
            'シンジ': { emoji: '🎻', message: '僕はエヴァに乗らなくてはいけないんだ...', series: 'エヴァ' },
            'アスカ': { emoji: '🔴', message: 'あんたバカァ!?', series: 'エヴァ' },
            'レイ': { emoji: '🔵', message: '...私が死んでも、代わりはいるもの', series: 'エヴァ' },
            '人類補完計画': { emoji: '🌍', message: 'おめでとう...おめでとう...', series: 'エヴァ' },
            
            // コードギアス
            'ギアス': { emoji: '👁️', message: '撃っていいのは、撃たれる覚悟のある奴だけだ！', series: 'ギアス' },
            'ルルーシュ': { emoji: '♟️', message: '全力で！ゼロ・レクイエム発動！', series: 'ギアス' },
            'スザク': { emoji: '🦿', message: '生きろ！', series: 'ギアス' },
            
            // Fate
            'fate': { emoji: '⚔️', message: '問おう、貴方が私のマスターか', series: 'Fate' },
            'セイバー': { emoji: '🗡️', message: 'エクスカリバー！', series: 'Fate' },
            '士郎': { emoji: '🔧', message: '体は剣で出来ている', series: 'Fate' },
            'アーチャー': { emoji: '🏹', message: '理想を抱いて溺死しろ', series: 'Fate' },
            '凛': { emoji: '💎', message: 'ガンド！', series: 'Fate' },
            
            // 進撃の巨人
            '進撃': { emoji: '⚔️', message: '駆逐してやる...この世から...一匹残らず！', series: '進撃' },
            'エレン': { emoji: '💪', message: '戦え...戦え...', series: '進撃' },
            'ミカサ': { emoji: '🧣', message: 'エレン...', series: '進撃' },
            'リヴァイ': { emoji: '🧹', message: '汚ねぇな...', series: '進撃' },
            
            // ソードアートオンライン
            'sao': { emoji: '⚔️', message: 'リンクスタート！', series: 'SAO' },
            'キリト': { emoji: '🗡️', message: 'スターバーストストリーム！', series: 'SAO' },
            'アスナ': { emoji: '⚡', message: '閃光！', series: 'SAO' },
            
            // 鬼滅の刃
            '鬼滅': { emoji: '🔥', message: 'ヒノカミ神楽！円舞！', series: '鬼滅' },
            '炭治郎': { emoji: '💧', message: '全集中・水の呼吸...', series: '鬼滅' },
            '禰豆子': { emoji: '🎋', message: 'んー！んんー！', series: '鬼滅' },
            '善逸': { emoji: '⚡', message: '怖いよぉぉぉ！でも...霹靂一閃！', series: '鬼滅' },
            '煉獄': { emoji: '🔥', message: '心を燃やせ！', series: '鬼滅' }
        };
        
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

        // Setup anime terminal input 🎬
        this.setupAnimeTerminal();

        console.log('%c🐴 Happy New Year 2026! 🐴', 'font-size: 24px; color: #ffd700; font-weight: bold;');
        console.log('%c午年おめでとうございます！', 'font-size: 16px; color: #39d353;');
        console.log('%c↑↑↓↓←→←→BA で隠しモード発動！', 'font-size: 12px; color: #8b949e;');
        console.log('%c🎬 アニメネタを入力すると...？', 'font-size: 12px; color: #ff6b9d;');
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

    // 🎬 アニメネタ入力機能
    setupAnimeTerminal() {
        const terminalBody = document.querySelector('.terminal-body');
        
        // インタラクティブ入力エリアを作成
        const inputArea = document.createElement('div');
        inputArea.className = 'anime-input-area';
        inputArea.innerHTML = `
            <div class="command-line anime-command">
                <span class="prompt">$</span>
                <span class="command-prefix">echo "</span>
                <input type="text" id="animeInput" class="anime-input" placeholder="アニメネタを入力..." autocomplete="off">
                <span class="command-suffix">" | anime-detector</span>
            </div>
            <div class="anime-hint">💡 もっと優しくしてください…</div>
        `;
        terminalBody.appendChild(inputArea);
        
        const input = document.getElementById('animeInput');
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                this.processAnimeInput(input.value.trim());
                input.value = '';
            }
        });
        
        // フォーカス時にスクロール
        input.addEventListener('focus', () => {
            setTimeout(() => {
                inputArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        });
    }

    processAnimeInput(text) {
        const terminalBody = document.querySelector('.terminal-body');
        const inputArea = document.querySelector('.anime-input-area');
        
        // 入力されたコマンドを表示
        const cmdDiv = document.createElement('div');
        cmdDiv.className = 'command-line';
        cmdDiv.innerHTML = `
            <span class="prompt">$</span>
            <span class="command">echo "${text}" | anime-detector</span>
        `;
        terminalBody.insertBefore(cmdDiv, inputArea);
        
        // マッチするアニメネタを探す
        const lowerText = text.toLowerCase();
        let matched = null;
        
        for (const [keyword, response] of Object.entries(this.animeResponses)) {
            if (lowerText.includes(keyword.toLowerCase())) {
                matched = response;
                break;
            }
        }
        
        // 出力を作成
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output anime-output';
        
        if (matched) {
            this.playAnimeSound(matched.series);
            this.createAnimeEffect(matched.series);
            
            outputDiv.innerHTML = `
                <div class="code-block anime-response" style="border-left-color: ${this.getSeriesColor(matched.series)};">
                    <code>
<span class="comment">// 🎬 ANIME DETECTED! [${matched.series}]</span>
<span class="keyword">const</span> <span class="variable">response</span> = {
    <span class="property">detected</span>: <span class="string">"${matched.series}"</span>,
    <span class="property">reaction</span>: <span class="string">"${matched.emoji} ${matched.message}"</span>,
    <span class="property">otakuLevel</span>: <span class="number">${Math.floor(Math.random() * 9000 + 1000)}</span>,
    <span class="property">status</span>: <span class="string">"🎉 同志発見！！！"</span>
};

<span class="output-text anime-celebration">>>> ${matched.emoji} ${matched.message}</span>
<span class="output-text anime-celebration">>>> 🎊 今年も良きアニメライフを！ 🎊</span>
                    </code>
                </div>
            `;
        } else {
            outputDiv.innerHTML = `
                <div class="code-block" style="border-left-color: #8b949e;">
                    <code>
<span class="comment">// 🔍 Analyzing input...</span>
<span class="keyword">const</span> <span class="variable">result</span> = {
    <span class="property">input</span>: <span class="string">"${text}"</span>,
    <span class="property">status</span>: <span class="string">"未検出"</span>,
    <span class="property">hint</span>: <span class="string">"うぐぅ…これ、10分仕事…"</span>
};

<span class="output-text">>>> もっとこう…手心をというか…</span>
<span class="output-text">>>> 💡 ヒント: うぐぅ など</span>
                    </code>
                </div>
            `;
        }
        
        terminalBody.insertBefore(outputDiv, inputArea);
        outputDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    getSeriesColor(series) {
        const colors = {
            'ハルヒ': '#ffcc00',
            'Key': '#ff6b9d',
            'シュタゲ': '#00ff88',
            'まどマギ': '#ff69b4',
            'エヴァ': '#9400d3',
            'Fate': '#ffd700',
        };
        return colors[series] || '#58a6ff';
    }

    playAnimeSound(series) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // シリーズごとに異なるメロディ
            let notes = [523.25, 659.25, 783.99]; // デフォルト
            
            if (series === 'ハルヒ') {
                notes = [659.25, 783.99, 987.77, 1174.66]; // 高めのテンション
            } else if (series === 'Key') {
                notes = [392.00, 493.88, 587.33, 698.46]; // しっとり系
            } else if (series === 'シュタゲ') {
                notes = [440.00, 554.37, 659.25, 880.00]; // SF風
            }
            
            notes.forEach((freq, i) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = series === 'Key' ? 'sine' : 'square';
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.12);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.12 + 0.25);
                
                oscillator.start(audioContext.currentTime + i * 0.12);
                oscillator.stop(audioContext.currentTime + i * 0.12 + 0.25);
            });
        } catch (e) {
            // Audio not supported
        }
    }

    createAnimeEffect(series) {
        // シリーズに応じたエフェクト
        const emojis = {
            'ハルヒ': ['🎀', '🎸', '📚', '🍵', '😊', 'SOS'],
            'Key': ['🍡', '⭐', '🦊', '🐱', '🎻', '💧', '🪶', '👼'],
            'シュタゲ': ['🔬', '⏰', '📱', '🧪', '⭐', '💻'],
            'まどマギ': ['🎀', '💫', '⏱️', '🎗️', '💙', '🐱'],
            'エヴァ': ['🤖', '🎻', '🔴', '🔵', '🌍'],
            'ギアス': ['👁️', '♟️', '🦿'],
            'Fate': ['⚔️', '🗡️', '🏹', '💎'],
            '進撃': ['⚔️', '💪', '🧣', '🧹'],
            'SAO': ['⚔️', '🗡️', '⚡'],
            '鬼滅': ['🔥', '💧', '⚡', '🎋']
        };
        
        const seriesEmojis = emojis[series] || ['🎬', '✨', '🌟'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'anime-particle';
                particle.textContent = seriesEmojis[Math.floor(Math.random() * seriesEmojis.length)];
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.animationDuration = (2 + Math.random() * 2) + 's';
                particle.style.fontSize = (20 + Math.random() * 20) + 'px';
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 4000);
            }, i * 50);
        }
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
