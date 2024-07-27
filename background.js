chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ url: 'https://sebastian-gomez.com' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const API_KEY = "YOUR_API_KEY"; // Reemplaza con tu clave API real

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY;
    
    const data = {
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": `Write an Summary in spanish with an Introduction, Key Insights, Books Summary and Conclusion about the book “${request.bookTitle}” by "${request.author}" the article should be separated by headings and well explained with examples. Take your time. The result should be a json structure with "Title as string, Introduction as string, Key Insights as array, Book Summary as string, conclusión as string".`
            }
          ]
        }
      ],
      "generationConfig": {
        "temperature": 1,
        "topK": 64,
        "topP": 0.95,
        "maxOutputTokens": 8192,
        "responseMimeType": "text/plain"
      },
      "safetySettings": [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Muestra la respuesta de la API en la consola
    })
    .catch(error => {
      console.error('Error: ', error);
    });
});

// https://aistudio.google.com/app/apikey