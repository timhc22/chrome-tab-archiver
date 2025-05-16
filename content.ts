// Listen for keyboard shortcuts
document.addEventListener('keydown', (event) => {
  // Check for Ctrl+Shift+A (archive to current quarter)
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
    event.preventDefault();
    chrome.runtime.sendMessage({ action: 'archive-tab' });
  }
}); 