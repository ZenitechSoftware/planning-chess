import assert = require("assert");
import gamePage = require("../pageObjects/game.page");
const { I } = inject();

export = {
    async checkIfTheLinkWasCopied () {
      let currentUrl = await I.grabCurrentUrl();
      I.waitForElement(gamePage.locator.buttons.copyLink);
      I.click(gamePage.locator.buttons.copyLink); 
      let clipboardLink= window.navigator.clipboard.read();
     
      // let clipboardLink = await navigator.clipboard.readText();
      //let clipboardLink= setTimeout(async()=> await window.navigator.clipboard.readText(), 3000);
      // let clipboardLink = window.Clipboard.toString();
   
      assert.strictEqual(currentUrl, clipboardLink);
  },
};
