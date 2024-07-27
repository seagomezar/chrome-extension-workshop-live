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
              "text": "Que es una extension de chrome"
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "text": "Una extensión de Chrome es un pequeño programa que se instala en tu navegador Chrome y añade nuevas funcionalidades o características a la experiencia de navegación. Son como pequeñas aplicaciones que mejoran tu uso de Chrome.\n\n**¿Qué hacen las extensiones de Chrome?**\n\n* **Mejora la productividad:** Bloqueador de anuncios, herramientas para tomar notas, administradores de contraseñas, etc.\n* **Personaliza tu experiencia:** Cambia el aspecto de la página, agrega nuevas opciones de menú, etc.\n* **Facilita tareas específicas:** Herramientas para redes sociales, traductores, gestores de descargas, etc.\n* **Aumenta la seguridad:**  Bloqueadores de malware, administradores de cookies, etc.\n\n**¿Cómo funcionan?**\n\nLas extensiones de Chrome se basan en tecnologías web como HTML, CSS y JavaScript, lo que permite a los desarrolladores crear interfaces y funcionalidades personalizadas. Se ejecutan en un entorno aislado dentro del navegador, lo que significa que no pueden acceder a tu información personal o afectar el funcionamiento general de tu sistema.\n\n**¿Dónde encontrar extensiones?**\n\nPuedes encontrar una gran variedad de extensiones en la Chrome Web Store: https://chrome.google.com/webstore/category/extensions\n\n**Ejemplos de extensiones populares:**\n\n* **Evernote Web Clipper:** Guarda páginas web, artículos y notas en Evernote.\n* **Grammarly:** Verifica la gramática y ortografía mientras escribes en línea.\n* **LastPass:** Administra y almacena tus contraseñas de forma segura.\n* **uBlock Origin:** Bloquea anuncios y rastreadores.\n* **Momentum:** Reemplaza la nueva pestaña con una hermosa imagen y una cita inspiradora.\n\n**En resumen, las extensiones de Chrome son herramientas útiles que pueden mejorar tu experiencia de navegación, añadir nuevas funcionalidades y personalizar tu navegador según tus necesidades.**\n"
            }
          ]
        },
        {
          "role": "user",
          "parts": [
            {
              "text": "INSERT_INPUT_HERE" // Reemplaza con el texto de entrada del usuario
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