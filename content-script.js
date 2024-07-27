function showSummaryPopup(title, summary) {
    const summaryData = summary;
  
    // Crear la ventana flotante
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.right = '10px';
    popup.style.bottom = '10px';
    popup.style.width = '400px';
    popup.style.maxHeight = '500px';
    popup.style.overflowY = 'auto';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.padding = '15px';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = 1000;
  
    let titleElement = document.createElement('h2');
    titleElement.innerText = summaryData.Title;
  
    let introductionElement = document.createElement('p');
    introductionElement.innerHTML = `<strong>Introduction:</strong> ${summaryData.Introduction}`;
  
    let keyInsightsElement = document.createElement('div');
    keyInsightsElement.innerHTML = `<strong>Key Insights:</strong>`;
    summaryData["Key Insights"].forEach(insight => {
      let insightElement = document.createElement('p');
      insightElement.innerHTML = insight;
      keyInsightsElement.appendChild(insightElement);
    });
  
    let bookSummaryElement = document.createElement('p');
    bookSummaryElement.innerHTML = `<strong>Book Summary:</strong> ${summaryData["Book Summary"]}`;
  
    let conclusionElement = document.createElement('p');
    conclusionElement.innerHTML = `<strong>Conclusion:</strong> ${summaryData.Conclusion}`;
  
    let closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.display = 'block';
    closeButton.style.margin = '10px auto';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  
    popup.appendChild(titleElement);
    popup.appendChild(introductionElement);
    popup.appendChild(keyInsightsElement);
    popup.appendChild(bookSummaryElement);
    popup.appendChild(conclusionElement);
    popup.appendChild(closeButton);
  
    document.body.appendChild(popup);
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.extractBooks) {
      for (let i = 1; i <= 18; i++) {
        let selector = `body > app-root > div > app-home > div.sidebar-listado-libros.mt-2.mt-md-3.pt-md-3 > div > div > div:nth-child(2) > div.row.mx-0 > div > div > div.owl-stage-outer > div > div:nth-child(${i}) > div > div > div:nth-child(2) > a`;
        let authorSelector = `body > app-root > div > app-home > div.sidebar-listado-libros.mt-2.mt-md-3.pt-md-3 > div > div > div:nth-child(2) > div.row.mx-0 > div > div > div.owl-stage-outer > div > div:nth-child(${i}) > div > div > div.col-12.text--gray.text--xl.mb-2.px-0`;
        
        let element = document.querySelector(selector);
        let authorElement = document.querySelector(authorSelector);
        
        if (element && authorElement) {
          let bookTitle = element.innerText;
          let bookAuthor = authorElement.innerText;
          
            chrome.runtime.sendMessage({ bookTitle: bookTitle, author: bookAuthor }).then(response => {
            
            if (response.summary) {
              // Añadir el ícono junto al título
              let icon = document.createElement('img');
              icon.src = chrome.runtime.getURL('icon.png'); // Asegúrate de tener un icono en tu extensión
              icon.style.cursor = 'pointer';
              icon.style.marginLeft = '10px';
              icon.style.width = '30px';
              icon.addEventListener('click', () => {
                showSummaryPopup(bookTitle, response.summary);
              });
              element.parentNode.insertBefore(icon, element.nextSibling);
              
              chrome.runtime.sendMessage({ bookTitle: bookTitle, summary: response.summary });
            }
          }).catch(error=> {
            console.error('Error fetching summary:', error);
          })
      }
  }
}});
  
  function showSummaryPopup(title, summary) {
    const summaryData = summary;
  
    // Crear la ventana flotante
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.right = '10px';
    popup.style.bottom = '10px';
    popup.style.width = '400px';
    popup.style.maxHeight = '500px';
    popup.style.overflowY = 'auto';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.padding = '15px';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = 1000;
  
    let titleElement = document.createElement('h2');
    titleElement.innerText = summaryData.Title;
  
    let introductionElement = document.createElement('p');
    introductionElement.innerHTML = `<strong>Introduction:</strong> ${summaryData.Introduction}`;
  
    let keyInsightsElement = document.createElement('div');
    keyInsightsElement.innerHTML = `<strong>Key Insights:</strong>`;
    summaryData["Key Insights"].forEach(insight => {
      let insightElement = document.createElement('p');
      insightElement.innerHTML = insight;
      keyInsightsElement.appendChild(insightElement);
    });
  
    let bookSummaryElement = document.createElement('p');
    bookSummaryElement.innerHTML = `<strong>Book Summary:</strong> ${summaryData["Book Summary"]}`;
  
    let conclusionElement = document.createElement('p');
    conclusionElement.innerHTML = `<strong>Conclusion:</strong> ${summaryData.Conclusion}`;
  
    let closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.display = 'block';
    closeButton.style.margin = '10px auto';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  
    popup.appendChild(titleElement);
    popup.appendChild(introductionElement);
    popup.appendChild(keyInsightsElement);
    popup.appendChild(bookSummaryElement);
    popup.appendChild(conclusionElement);
    popup.appendChild(closeButton);
  
    document.body.appendChild(popup);
  }
  