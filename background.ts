// Helper functions to compute current quarter and month
function computeCurrentQuarter(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  return `${year}-Q${quarter}`;
}

function computeCurrentMonth(): string {
  const date = new Date();
  return date.toLocaleString('default', { month: 'long' });
}

// Find or create a bookmark folder path
async function findOrCreateFolder(pathParts: string[]): Promise<string> {
  let parentId = '1'; // Root bookmark folder ID
  let currentPath = '';

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    currentPath += (currentPath ? '/' : '') + part;
    
    // Search for existing folder
    const results = await chrome.bookmarks.search({ title: part });
    const existingFolder = results.find(
      (bookmark) => bookmark.parentId === parentId && !bookmark.url
    );

    if (existingFolder) {
      parentId = existingFolder.id;
    } else {
      // Only create new folders if they match current date
      const currentQuarter = computeCurrentQuarter();
      const currentMonth = computeCurrentMonth();
      
      // For the quarter folder (index 1)
      if (i === 1 && part !== currentQuarter) {
        throw new Error(`Cannot create folder for quarter ${part} - current quarter is ${currentQuarter}`);
      }
      
      // For the month folder (index 2)
      if (i === 2 && part !== currentMonth) {
        throw new Error(`Cannot create folder for month ${part} - current month is ${currentMonth}`);
      }

      // Create new folder at the top of its parent folder
      const newFolder = await chrome.bookmarks.create({
        parentId,
        title: part,
        index: 0
      });
      parentId = newFolder.id;
    }
  }

  return parentId;
}

// Archive the current tab
async function archiveCurrentTab() {
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url) return;

    // Compute folder path
    const quarter = computeCurrentQuarter();
    const month = computeCurrentMonth();
    const folderPath = ['(Archived)', quarter, month];
    
    // Find or create folder structure
    const parentId = await findOrCreateFolder(folderPath);
    
    // Create bookmark at the top of the folder
    await chrome.bookmarks.create({
      parentId,
      title: tab.title,
      url: tab.url,
      index: 0
    });

    // Show success notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Tab Archived',
      message: `Successfully archived "${tab.title}" to ${quarter}/${month}`
    });
  } catch (error) {
    console.error('Error archiving tab:', error);
    // Show error notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Archive Failed',
      message: error instanceof Error ? error.message : 'Failed to archive tab'
    });
  }
}

// Register context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'archive-tab',
    title: 'Archive to current quarter',
    contexts: ['page']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'archive-tab') {
    archiveCurrentTab();
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'archive-tab') {
    archiveCurrentTab();
  }
}); 