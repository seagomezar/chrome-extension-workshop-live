document.getElementById('save')
    .addEventListener('click', save_options);

function save_options() {
    const API_KEY = document.getElementById("key").value;

    chrome.storage.sync.set({API_KEY: API_KEY}, function() {
        alert("API KEY guardado");
    });

}