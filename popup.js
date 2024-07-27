/*document.addEventListener('DOMContentLoaded', function() {
    alert("De esta manera hemos desabilitado react por completo y usamos un popup estandard de extensión de chrome solo con html,css y javascript");
});*/
  
  document.querySelector('#extract-books').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { extractBooks: true });
    });
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "hello") {
      alert("Mensaje recibido desde el background");
      sendResponse({ farewell: "goodbye" });
    }
    if (request.bookTitle && request.summary) {
      let summaryData = request.summary;
  
      let summaryContainer = document.createElement('div');
      summaryContainer.style.border = '1px solid #ccc';
      summaryContainer.style.margin = '10px 0';
      summaryContainer.style.padding = '10px';
      summaryContainer.style.cursor = 'pointer';
  
      let titleElement = document.createElement('h2');
      titleElement.innerText = summaryData.Title;
      titleElement.style.margin = '0';
      titleElement.style.padding = '0';
      titleElement.addEventListener('click', () => {
        toggleSummaryDetails(summaryContainer);
      });
  
      let detailsElement = document.createElement('div');
      detailsElement.style.display = 'none';
  
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
  
      detailsElement.appendChild(introductionElement);
      detailsElement.appendChild(keyInsightsElement);
      detailsElement.appendChild(bookSummaryElement);
      detailsElement.appendChild(conclusionElement);
  
      summaryContainer.appendChild(titleElement);
      summaryContainer.appendChild(detailsElement);
  
      document.getElementById('summaries').appendChild(summaryContainer);
    }
  });
  
  function toggleSummaryDetails(summaryContainer) {
    let detailsElement = summaryContainer.querySelector('div');
    if (detailsElement.style.display === 'none') {
      detailsElement.style.display = 'block';
    } else {
      detailsElement.style.display = 'none';
    }
  }
  
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { favoriteColor: 'red', likesColor: true },
      (items) => {
        console.log(items.favoriteColor);
        document.querySelector(".login-container").style.backgroundColor = items.favoriteColor;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);