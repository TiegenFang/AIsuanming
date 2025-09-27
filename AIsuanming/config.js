// DeepSeek API 配置文件
const DEEPSEEK_CONFIG = {
    // API 基础配置
    baseURL: 'https://api.deepseek.com',
    model: 'deepseek-chat',
    
    // API 密钥 (请替换为您的实际密钥)
    apiKey: 'sk-a2735f25c9ed497fb62d8d66564b1313', // 您的DeepSeek API密钥
    
    // 请求配置
    timeout: 30000, // 30秒超时
    maxRetries: 3, // 最大重试次数
    
    // 模型参数
    temperature: 0.7, // 创造性程度 (0-1)
    maxTokens: 2000, // 最大生成token数
    topP: 0.9, // 核采样参数
    
    // 占卜专用提示词模板
    prompts: {
        fortune: `你是一位专业的占卜师，请根据用户提供的信息，生成一份神秘而富有洞察力的运势分析。请用中文回答，语言要神秘而富有诗意。`,
        
        tarot: `你是一位资深的塔罗牌占卜师，请根据抽到的塔罗牌，为用户提供专业的牌意解读和人生指引。请用中文回答，语言要神秘而富有智慧。`,
        
        astrology: `你是一位专业的占星师，请根据用户的星座信息，分析当前的星象影响和运势走向。请用中文回答，语言要神秘而富有洞察力。`
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DEEPSEEK_CONFIG;
} else {
    window.DEEPSEEK_CONFIG = DEEPSEEK_CONFIG;
}
