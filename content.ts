// Listen for keyboard shortcuts
document.addEventListener('keydown', (event) => {
  // Check for Ctrl+Shift+A (archive to current quarter)
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
    event.preventDefault();
    chrome.runtime.sendMessage({ action: 'archive-tab' });
  }
  
  // Check for Ctrl+Shift+W (open workstream menu)
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'w') {
    event.preventDefault();
    chrome.runtime.sendMessage({ action: 'open-workstream-menu' });
  }
}); 