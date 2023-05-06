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

// Function to send the word counts to the popup
function sendWordCounts(tabId, wordCount, duckCount) {
  chrome.runtime.sendMessage(
    { type: 'wordCounts', wordCount, duckCount },
    { tabId: tabId }
  );
}

// Function to handle the context menu click event
function handleContextMenuClick(info, tab) {
  if (info.menuItemId === 'duckFinderContextMenu') {
    chrome.tabs.executeScript(tab.id, { file: 'content.js' });
  }
}

// Create the context menu item
chrome.contextMenus.create({
  id: 'duckFinderContextMenu',
  title: 'Find the Ducks',
  contexts: ['page'],
});

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'wordCounts') {
    const { wordCount, duckCount } = request;
    sendWordCounts(sender.tab.id, wordCount, duckCount);
  }
});
