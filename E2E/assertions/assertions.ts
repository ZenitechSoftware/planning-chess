const { I, game } = inject();

export = {
  async checkIfTheLinkWasCopied (currentUrl: string) {
    I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
      await browserContext.grantPermissions(['clipboard-read']);
      const clipboardText = await page.evaluate("navigator.clipboard.readText()");
      I.assertEqual(currentUrl, clipboardText);
    });
  },

  async checkIfTheProfileImageIsUploaded( user: string, avatarImage: string) {
    const avatarImageInTheHeader = await I.grabAttributeFrom(game.locator.header.avatarProfilePictureHeader, 'src');
    I.assertEqual(avatarImageInTheHeader, avatarImage);
    const avatarImageInPlayersList = await I.grabAttributeFrom(game.locator.playersList.avatarImageInThePlayersList(user), 'src');
    I.assertEqual(avatarImageInPlayersList, avatarImage); 
  }
};
