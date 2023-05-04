// ==UserScript==
// @name         Save Selected Text as File
// @namespace    TDD-Drayton
// @version      1.0
// @description  Creates a text file from the most recently selected text on a site
// @match        https://*/*
// @match        http://*/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
  const saveSelectedTextToFile = (selectedText) => {
    const fileName = selectedText.substring(0, 30) || 'file';
    const fileCount = document.querySelectorAll(`a[download^="${fileName}"]`).length + 1;
    const finalFileName = fileCount > 1 ? `${fileName}-${fileCount}.txt` : `${fileName}.txt`;
    const blob = new Blob([selectedText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = finalFileName;
    a.href = url;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  function addToContextMenu() {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      const saveSelectedTextMenuItem = document.createElement('div');
      saveSelectedTextMenuItem.textContent = 'Save Selected Text as File';
      saveSelectedTextMenuItem.style.cssText = 'padding: 5px; cursor: pointer; background-color: #fff;';

      saveSelectedTextMenuItem.addEventListener('click', () => {
        saveSelectedTextToFile(selection);
      });

      const contextMenu = document.querySelector('.context-menu');
      if (contextMenu) {
        contextMenu.appendChild(saveSelectedTextMenuItem);
      }
    }
  }

  document.addEventListener('contextmenu', (event) => {
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.style.cssText = `
      position: absolute;
      background-color: #fff;
      border: 1px solid #d3d3d3;
      border-radius: 3px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
      z-index: 2147483647;
      max-width: 200px;
      padding: 5px;
    `;

    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.left = `${event.pageX}px`;
    document.body.appendChild(contextMenu);

    addToContextMenu();

    document.addEventListener('click', () => {
      document.body.removeChild(contextMenu);
    }, { once: true });
  });
})();