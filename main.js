// 全局变量
let stars = [];
let particles = [];
let starField;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initStarField();
    initAnimations();
    initParticles();
    initScrollEffects();
});

// 初始化星空背景
function initStarField() {
    const starFieldDiv = document.getElementById('star-field');
    
    // 创建p5.js画布
    const sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('star-field');
            
            // 创建星星
            for (let i = 0; i < 200; i++) {
                stars.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(1, 3),
                    brightness: p.random(0.3, 1),
                    twinkleSpeed: p.random(0.01, 0.03)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // 绘制星星
            stars.forEach((star, index) => {
                star.brightness += p.sin(p.frameCount * star.twinkleSpeed) * 0.1;
                star.brightness = p.constrain(star.brightness, 0.2, 1);
                
                p.fill(255, 215, 0, star.brightness * 255);
                p.noStroke();
                p.ellipse(star.x, star.y, star.size);
                
                // 为较亮的星星添加光晕
                if (star.brightness > 0.7) {
                    p.fill(255, 215, 0, star.brightness * 50);
                    p.ellipse(star.x, star.y, star.size * 3);
                }
            });
            
            // 绘制连接线（偶尔连接附近的星星）
            if (p.frameCount % 60 === 0) {
                for (let i = 0; i < stars.length; i++) {
                    for (let j = i + 1; j < stars.length; j++) {
                        const distance = p.dist(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
                        if (distance < 100 && p.random() < 0.1) {
                            p.stroke(255, 215, 0, 30);
                            p.strokeWeight(1);
                            p.line(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
                        }
                    }
                }
            }
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };
    
    starField = new p5(sketch);
}

// 初始化动画
function initAnimations() {
    // Hero标题动画
    anime({
        targets: '#hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 500
    });
    
    // Hero副标题动画
    anime({
        targets: '#hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 800
    });
    
    // Hero描述动画
    anime({
        targets: '#hero-description',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 1100
    });
    
    // Hero按钮动画
    anime({
        targets: '#hero-buttons',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 1400
    });
    
    // 功能卡片动画
    const cards = document.querySelectorAll('.mystical-card');
    cards.forEach((card, index) => {
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: 200 * index
        });
    });
}

// 初始化粒子效果
function initParticles() {
    document.addEventListener('click', function(e) {
        createParticle(e.clientX, e.clientY);
    });
    
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.1) {
            createParticle(e.clientX, e.clientY, true);
        }
    });
}

// 创建粒子
function createParticle(x, y, isSmall = false) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = isSmall ? Math.random() * 3 + 1 : Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + 'px';
 particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// 初始化滚动效果
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// 滚动到功能区域
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 运势计算相关功能
function calculateFortune(birthDate) {
    const date = new Date(birthDate);
    const today = new Date();
    
    // 基于生日和当前日期生成运势数据
    const seed = date.getTime() + today.getTime();
    const random = seededRandom(seed);
    
    const fortune = {
        love: Math.floor(random() * 40) + 60,
        career: Math.floor(random() * 40) + 60,
        wealth: Math.floor(random() * 40) + 60,
        health: Math.floor(random() * 40) + 60,
        luckyNumber: Math.floor(random() * 99) + 1,
        luckyColor: getLuckyColor(random()),
        advice: getRandomAdvice(random())
    };
    
    console.log('生成的运势数据:', fortune);
    return fortune;
}

// 种子随机数生成器
function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return function() {
        x = Math.sin(x) * 10000;
        return x - Math.floor(x);
    };
}

// 获取幸运颜色
function getLuckyColor(random) {
    const colors = [
        { name: '金色', color: '#FFD700' },
        { name: '紫色', color: '#8B00FF' },
        { name: '蓝色', color: '#4169E1' },
        { name: '红色', color: '#DC143C' },
        { name: '绿色', color: '#32CD32' },
        { name: '粉色', color: '#FF69B4' }
    ];
    return colors[Math.floor(random() * colors.length)];
}

// 获取随机建议
function getRandomAdvice(random) {
    const advices = [
        "今日宜保持积极心态，好运自然来",
        "注意身边的小细节，机会藏在其中",
        "保持冷静思考，不要被情绪左右",
        "多与朋友交流，会有意外收获",
        "专注于自己的目标，不要分心",
        "保持开放的心态，接受新的可能",
        "今日适合学习新技能，提升自己",
        "注意身体健康，适当休息很重要"
    ];
    return advices[Math.floor(random() * advices.length)];
}

// 塔罗牌数据
const tarotCards = [
    { name: '愚者', meaning: '新的开始，冒险精神', image: '🃏', reverse: '鲁莽，缺乏计划' },
    { name: '魔术师', meaning: '创造力，意志力', image: '🎭', reverse: '技能不足，欺骗' },
    { name: '女祭司', meaning: '直觉，内在智慧', image: '👸', reverse: '忽视直觉，缺乏内省' },
    { name: '皇后', meaning: '丰饶，母性', image: '👑', reverse: '过度依赖，缺乏创造力' },
    { name: '皇帝', meaning: '权威，稳定', image: '🏛️', reverse: '专制，缺乏灵活性' },
    { name: '教皇', meaning: '传统，精神指导', image: '⛪', reverse: '固执，拒绝新观念' },
    { name: '恋人', meaning: '爱情，选择', image: '💕', reverse: '关系问题，错误选择' },
    { name: '战车', meaning: '胜利，意志力', image: '🚗', reverse: '缺乏控制，失败' },
    { name: '力量', meaning: '内在力量，勇气', image: '🦁', reverse: '软弱，缺乏自控' },
    { name: '隐士', meaning: '内省，寻求真理', image: '🏮', reverse: '孤立，拒绝帮助' },
    { name: '命运之轮', meaning: '变化，命运', image: '🎡', reverse: '厄运，缺乏控制' },
    { name: '正义', meaning: '公正，平衡', image: '⚖️', reverse: '不公，偏见' },
    { name: '倒吊人', meaning: '牺牲，新视角', image: '🙃', reverse: '无谓牺牲，拖延' },
    { name: '死神', meaning: '转变，结束', image: '💀', reverse: '抗拒改变，停滞' },
    { name: '节制', meaning: '平衡，耐心', image: '🌊', reverse: '极端，缺乏耐心' },
    { name: '恶魔', meaning: '诱惑，束缚', image: '👿', reverse: '解脱，自由' },
    { name: '高塔', meaning: '突然变化，启示', image: '🏰', reverse: '避免灾难，内在变化' },
    { name: '星星', meaning: '希望，灵感', image: '⭐', reverse: '失望，缺乏信心' },
    { name: '月亮', meaning: '幻想，直觉', image: '🌙', reverse: '恐惧，欺骗' },
    { name: '太阳', meaning: '成功，快乐', image: '☀️', reverse: '过度乐观，缺乏深度' },
    { name: '审判', meaning: '重生，觉醒', image: '📯', reverse: '严厉判断，拒绝改变' },
    { name: '世界', meaning: '完成，成就', image: '🌍', reverse: '未完成，缺乏成就感' }
];

// 抽取塔罗牌
function drawTarotCards(count = 3) {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(card => ({
        ...card,
        isReversed: Math.random() < 0.3 // 30%概率逆位
    }));
}

// 星座数据
const zodiacSigns = [
    { name: '白羊座', symbol: '♈', dates: '3.21-4.19', element: '火', planet: '火星' },
    { name: '金牛座', symbol: '♉', dates: '4.20-5.20', element: '土', planet: '金星' },
    { name: '双子座', symbol: '♊', dates: '5.21-6.21', element: '风', planet: '水星' },
    { name: '巨蟹座', symbol: '♋', dates: '6.22-7.22', element: '水', planet: '月亮' },
    { name: '狮子座', symbol: '♌', dates: '7.23-8.22', element: '火', planet: '太阳' },
    { name: '处女座', symbol: '♍', dates: '8.23-9.22', element: '土', planet: '水星' },
    { name: '天秤座', symbol: '♎', dates: '9.23-10.23', element: '风', planet: '金星' },
    { name: '天蝎座', symbol: '♏', dates: '10.24-11.22', element: '水', planet: '冥王星' },
    { name: '射手座', symbol: '♐', dates: '11.23-12.21', element: '火', planet: '木星' },
    { name: '摩羯座', symbol: '♑', dates: '12.22-1.19', element: '土', planet: '土星' },
    { name: '水瓶座', symbol: '♒', dates: '1.20-2.18', element: '风', planet: '天王星' },
    { name: '双鱼座', symbol: '♓', dates: '2.19-3.20', element: '水', planet: '海王星' }
];

// 根据生日获取星座
function getZodiacSign(birthDate) {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0];
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1];
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return zodiacSigns[2];
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return zodiacSigns[3];
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4];
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5];
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return zodiacSigns[6];
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return zodiacSigns[7];
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return zodiacSigns[8];
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9];
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10];
    return zodiacSigns[11];
}

// 生成星座运势
function generateZodiacFortune(zodiacSign) {
    const random = seededRandom(zodiacSign.name.length);
    
    return {
        love: Math.floor(random() * 40) + 60,
        career: Math.floor(random() * 40) + 60,
        wealth: Math.floor(random() * 40) + 60,
        health: Math.floor(random() * 40) + 60,
        description: getZodiacDescription(zodiacSign, random),
        advice: getZodiacAdvice(zodiacSign, random)
    };
}

// 获取星座描述
function getZodiacDescription(sign, random) {
    const descriptions = {
        '白羊座': '今日充满活力，适合开创新项目',
        '金牛座': '财运不错，适合投资理财',
        '双子座': '沟通运佳，适合社交活动',
        '巨蟹座': '家庭和睦，情感丰富的一天',
        '狮子座': '表现欲强，适合展示才华',
        '处女座': '工作细致，适合处理复杂任务',
        '天秤座': '人际关系和谐，适合合作',
        '天蝎座': '直觉敏锐，适合深度思考',
        '射手座': '冒险精神旺盛，适合旅行',
        '摩羯座': '事业心强，适合规划未来',
        '水瓶座': '创新思维活跃，适合学习',
        '双鱼座': '想象力丰富，适合艺术创作'
    };
    return descriptions[sign.name] || '今日运势平稳，保持积极心态';
}

// 获取星座建议
function getZodiacAdvice(sign, random) {
    const advice = {
        '白羊座': '控制脾气，多听取他人意见',
        '金牛座': '不要过于固执，学会变通',
        '双子座': '专注一件事情，避免分心',
        '巨蟹座': '多表达自己，不要压抑情感',
        '狮子座': '适当收敛，多赞美他人',
        '处女座': '放松心态，不要过分追求完美',
        '天秤座': '学会做决定，不要犹豫不决',
        '天蝎座': '敞开心扉，多与他人交流',
        '射手座': '注意细节，避免粗心大意',
        '摩羯座': '适当休息，不要过度劳累',
        '水瓶座': '关注现实，不要过于理想化',
        '双鱼座': '增强自信，相信自己的能力'
    };
    return advice[sign.name] || '保持平衡，积极面对生活';
}

// 工具函数：显示加载动画
function showLoading(element) {
    element.innerHTML = `
        <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            <span class="ml-4 text-yellow-400">正在计算中...</span>
        </div>
    `;
}

// 工具函数：显示错误信息
function showError(element, message) {
    element.innerHTML = `
        <div class="text-center py-8">
            <div class="text-red-400 text-xl mb-4">❌ 出错了</div>
            <p class="text-gray-400">${message}</p>
        </div>
    `;
}

// DeepSeek API 调用函数
async function callDeepSeekAPI(prompt, type = 'fortune') {
    try {
        // 检查API密钥
        if (!DEEPSEEK_CONFIG.apiKey) {
            throw new Error('请先设置DeepSeek API密钥');
        }

        const response = await fetch(`${DEEPSEEK_CONFIG.baseURL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: DEEPSEEK_CONFIG.prompts[type] || DEEPSEEK_CONFIG.prompts.fortune
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: DEEPSEEK_CONFIG.temperature,
                max_tokens: DEEPSEEK_CONFIG.maxTokens,
                top_p: DEEPSEEK_CONFIG.topP
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API调用失败:', error);
        throw error;
    }
}

// AI增强的运势计算
async function calculateFortuneWithAI(birthDate, question = '') {
    const basicFortune = calculateFortune(birthDate);
    const zodiacSign = getZodiacSign(birthDate);
    
    try {
        const prompt = `用户生日: ${birthDate}
星座: ${zodiacSign.name} (${zodiacSign.symbol})
问题: ${question || '请分析今日运势'}
基础运势数据: 爱情${basicFortune.love}%, 事业${basicFortune.career}%, 财运${basicFortune.wealth}%, 健康${basicFortune.health}%`;

        const aiAnalysis = await callDeepSeekAPI(prompt, 'fortune');
        
        return {
            ...basicFortune,
            aiAnalysis,
            zodiacSign
        };
    } catch (error) {
        console.warn('AI分析失败，使用基础运势:', error);
        return {
            ...basicFortune,
            aiAnalysis: 'AI分析暂时不可用，请稍后再试',
            zodiacSign
        };
    }
}

// AI增强的塔罗牌解读
async function interpretTarotWithAI(cards, question = '') {
    try {
        const cardDescriptions = cards.map(card => 
            `${card.name} ${card.isReversed ? '(逆位)' : '(正位)'}: ${card.isReversed ? card.reverse : card.meaning}`
        ).join('\n');

        const prompt = `问题: ${question || '请为我解读塔罗牌'}
抽到的牌:
${cardDescriptions}

请提供详细的牌意解读和人生指引。`;

        const aiInterpretation = await callDeepSeekAPI(prompt, 'tarot');
        
        return {
            cards,
            aiInterpretation
        };
    } catch (error) {
        console.warn('AI解读失败，使用基础解读:', error);
        return {
            cards,
            aiInterpretation: 'AI解读暂时不可用，请稍后再试'
        };
    }
}

// AI增强的星象分析
async function analyzeAstrologyWithAI(birthDate, currentDate = new Date()) {
    const zodiacSign = getZodiacSign(birthDate);
    const basicFortune = generateZodiacFortune(zodiacSign);
    
    try {
        const prompt = `用户生日: ${birthDate}
星座: ${zodiacSign.name} (${zodiacSign.symbol})
当前日期: ${currentDate.toLocaleDateString()}
基础运势: 爱情${basicFortune.love}%, 事业${basicFortune.career}%, 财运${basicFortune.wealth}%, 健康${basicFortune.health}%

请分析当前星象对用户的影响。`;

        const aiAnalysis = await callDeepSeekAPI(prompt, 'astrology');
        
        return {
            ...basicFortune,
            zodiacSign,
            aiAnalysis
        };
    } catch (error) {
        console.warn('AI星象分析失败，使用基础分析:', error);
        return {
            ...basicFortune,
            zodiacSign,
            aiAnalysis: 'AI星象分析暂时不可用，请稍后再试'
        };
    }
}

// 设置API密钥
function setDeepSeekAPIKey(apiKey) {
    DEEPSEEK_CONFIG.apiKey = apiKey;
    localStorage.setItem('deepseek_api_key', apiKey);
    console.log('DeepSeek API密钥已设置');
}

// 获取存储的API密钥
function loadStoredAPIKey() {
    const storedKey = localStorage.getItem('deepseek_api_key');
    if (storedKey) {
        DEEPSEEK_CONFIG.apiKey = storedKey;
        console.log('已加载存储的DeepSeek API密钥');
    }
}

// 页面加载时自动加载API密钥
document.addEventListener('DOMContentLoaded', function() {
    loadStoredAPIKey();
});

// 导出函数供其他页面使用
window.mysticalAI = {
    calculateFortune,
    calculateFortuneWithAI,
    drawTarotCards,
    interpretTarotWithAI,
    getZodiacSign,
    generateZodiacFortune,
    analyzeAstrologyWithAI,
    callDeepSeekAPI,
    setDeepSeekAPIKey,
    showLoading,
    showError,
    createParticle
};