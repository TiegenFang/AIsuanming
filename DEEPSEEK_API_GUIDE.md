# DeepSeek API 集成指南

## 📖 概述

本指南将帮助您在神秘AI项目中集成和使用DeepSeek API，为占卜功能提供AI增强体验。

## 🚀 快速开始

### 1. 获取API密钥

1. 访问 [DeepSeek平台](https://platform.deepseek.com/)
2. 注册账户并登录
3. 在API管理页面创建新的API密钥
4. 复制您的API密钥

### 2. 配置API密钥

有两种方式配置API密钥：

#### 方式1: 通过设置页面（推荐）
1. 打开 `settings.html` 页面
2. 在"DeepSeek API密钥"输入框中粘贴您的密钥
3. 调整其他参数（可选）
4. 点击"保存设置"
5. 点击"测试连接"验证配置

#### 方式2: 通过代码设置
```javascript
// 在浏览器控制台中执行
window.mysticalAI.setDeepSeekAPIKey('your-api-key-here');
```

## 🔧 功能特性

### AI增强的运势计算
```javascript
// 基础用法
const result = await window.mysticalAI.calculateFortuneWithAI('1990-01-01', '请分析我的今日运势');
console.log(result.aiAnalysis); // AI深度分析
```

### AI增强的塔罗牌解读
```javascript
// 抽牌并获取AI解读
const cards = window.mysticalAI.drawTarotCards(3);
const result = await window.mysticalAI.interpretTarotWithAI(cards, '请解读这些牌的含义');
console.log(result.aiInterpretation); // AI专业解读
```

### AI增强的星象分析
```javascript
// 获取AI星象分析
const result = await window.mysticalAI.analyzeAstrologyWithAI('1990-01-01');
console.log(result.aiAnalysis); // AI星象洞察
```

## 📁 文件结构

```
项目根目录/
├── config.js              # DeepSeek API配置文件
├── main.js                # 主要功能文件（包含API调用函数）
├── settings.html          # API设置页面
├── api-example.html       # 使用示例页面
└── DEEPSEEK_API_GUIDE.md  # 本指南文件
```

## ⚙️ 配置选项

在 `config.js` 中可以调整以下参数：

- **model**: 使用的模型（deepseek-chat 或 deepseek-reasoner）
- **temperature**: 创造性程度（0-1，推荐0.7）
- **maxTokens**: 最大生成token数（推荐2000）
- **timeout**: 请求超时时间（毫秒）
- **maxRetries**: 最大重试次数

## 🛠️ 高级用法

### 自定义提示词
```javascript
// 直接调用API并自定义提示词
const customPrompt = "你是一位神秘的占卜师，请用诗意的语言为我解读运势";
const response = await window.mysticalAI.callDeepSeekAPI(customPrompt, 'fortune');
```

### 错误处理
```javascript
try {
    const result = await window.mysticalAI.calculateFortuneWithAI(birthDate, question);
    // 处理成功结果
} catch (error) {
    if (error.message.includes('API密钥')) {
        // 提示用户设置API密钥
        alert('请先设置DeepSeek API密钥');
    } else {
        // 其他错误处理
        console.error('API调用失败:', error);
    }
}
```

## 🔍 故障排除

### 常见问题

1. **"请先设置DeepSeek API密钥"错误**
   - 解决：访问设置页面配置API密钥

2. **"API请求失败"错误**
   - 检查网络连接
   - 验证API密钥是否正确
   - 检查DeepSeek账户余额

3. **请求超时**
   - 增加timeout设置
   - 检查网络状况
   - 减少max_tokens参数

### 调试技巧

1. 打开浏览器开发者工具
2. 查看Console标签页的错误信息
3. 使用"测试连接"功能验证API配置
4. 检查Network标签页的API请求状态

## 💡 最佳实践

### 性能优化
- 使用适当的temperature值（0.7-0.9）
- 设置合理的max_tokens限制
- 实现请求缓存机制
- 添加加载状态提示

### 用户体验
- 提供清晰的错误提示
- 实现优雅的降级处理
- 添加重试机制
- 保持界面响应性

### 安全建议
- 不要在代码中硬编码API密钥
- 使用环境变量或配置文件
- 定期轮换API密钥
- 监控API使用情况

## 📞 技术支持

如果您在使用过程中遇到问题：

1. 查看浏览器控制台的错误信息
2. 参考 `api-example.html` 中的示例代码
3. 检查DeepSeek官方文档
4. 确认网络连接和API密钥有效性

## 🔄 更新日志

- **v1.0.0**: 初始版本，支持基础API调用
- **v1.1.0**: 添加AI增强功能
- **v1.2.0**: 添加设置页面和错误处理
- **v1.3.0**: 优化性能和用户体验

---

**注意**: 本指南基于当前版本的DeepSeek API。如果API有更新，请参考官方文档进行调整。

