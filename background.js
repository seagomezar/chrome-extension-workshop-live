chrome.runtime.onInstalled.addListener(async function (details) {
    if (details.reason === 'install') {
      const url = chrome.i18n.getMessage('installedUrl') || 'https://www.sebastian-gomez.com/category/chrome-extensions';
      chrome.tabs.create(
        { url },
        function (tab) { }
      );
    }
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.bookTitle) {
      let apiKey = '';
      let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
      let requestBody = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Write an Summary in spanish with an Introduction, Key Insights, Books Summary and Conclusion about the book “${request.bookTitle}” by "${request.author}" the article should be separated by headings and well explained with examples. Take your time. The result should be a json structure with "Title as string, Introduction as string, Key Insights as array, Book Summary as string, conclusión as string".`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 1,
          topK: 64,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json'
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      };
  
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', JSON.parse(data.candidates[0].content.parts[0].text).Title);
        sendResponse({ summary: JSON.parse(data.candidates[0].content.parts[0].text) });
        // chrome.runtime.sendMessage();
      })
      .catch(error => console.error('Error:', error));
      return true;
    }
    
  });
  
  function sendMessageToPopup() {
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log(response);
    });
  }
  
  
  
  