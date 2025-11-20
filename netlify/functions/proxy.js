import fetch from 'node-fetch';

export async function handler(event) {
  try {
    // 前端通过 POST 传入内容
    const requestData = JSON.parse(event.body);

    // Gemini API 地址
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    // 调用 Gemini API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.VITE_API_KEY,  // 使用 Netlify 环境变量
      },
      body: JSON.stringify({
        prompt: {
          text: requestData.prompt
        },
        // 这里可以根据需求添加其他参数，比如 temperature、candidateCount 等
        temperature: 0.7,
        candidateCount: 1,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
