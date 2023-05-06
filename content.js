// content.js

// Function to count words similar to "duck"
function countDuckWords(text) {
  const regex = /\bduck\b/gi; // Matches "duck" with any case
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// Function to count total words in the text
function countTotalWords(text) {
  return text.split(/\s+/).length;
}

// Function to calculate word counts
function calculateCounts() {
  const text = document.body.innerText.toLowerCase();
  const wordCount = countTotalWords(text);
  const duckCount = countDuckWords(text);
  return { wordCount, duckCount };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'getCounts') {
    const counts = calculateCounts();
    sendResponse(counts);
  }
});

// Send a message to the popup when the content script is injected
chrome.runtime.sendMessage({ type: 'contentScriptInjected' });
