Debug_Mode = false;

Debug_Mode ? console.log("[🟢] bg.js is running...") : null;

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Read Loud ",
    contexts: ["selection"],
    id: "readLoudContextMenu"
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "readLoudContextMenu") {
    // Filter out unwanted characters
    const filteredText = filterText(info.selectionText);

    Debug_Mode ? console.log("Before:", info.selectionText) : null ;

    // Read the filtered text
    const utterance = new SpeechSynthesisUtterance(filteredText);

    Debug_Mode ? console.log("After:", filteredText) : null ;

    window.speechSynthesis.speak(utterance);
  }
});

function filterText(text) {
  // Define the characters you want to filter out
  const unwantedChars = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;

  // Remove unwanted characters from the text
  const filteredText = text.replace(unwantedChars,'');

  return filteredText;
}

