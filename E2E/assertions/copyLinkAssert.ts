import assert = require("assert");
import gamePage = require("../pageObjects/game.page");
const { I } = inject();

export = {
    async checkIfTheLinkWasCopied (currentUrl) {
      I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
        await browserContext.grantPermissions(['clipboard-read']);
        const clipboardText = await page.evaluate("navigator.clipboard.readText()");
        assert.strictEqual(currentUrl, clipboardText);  
      });
  },
};
