// popup.js

// Function to send a message to the content script to count the words
function countWords() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getCounts' }, function (response) {
      const { wordCount, duckCount } = response;
      const wordCountText = `Word Count: ${wordCount}`;
      const duckCountText = `Duck Count: ${duckCount}`;
      document.getElementById('word-count').textContent = wordCountText;
      document.getElementById('duck-count').textContent = duckCountText;
    });
  });
}

// Listen for the popup to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Inject the content script into the active tab
  chrome.tabs.executeScript({ file: 'content.js' }, function () {
    // Count the words once the content script is injected
    countWords();
  });
});
