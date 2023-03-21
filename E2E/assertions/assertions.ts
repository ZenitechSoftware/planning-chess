const { I, game } = inject();

export = {

  async checkIfTheLinkWasCopied(currentUrl: string) {
    I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
      await browserContext.grantPermissions(['clipboard-read']);
      const clipboardText = await page.evaluate("navigator.clipboard.readText()");
      I.assertEqual(currentUrl, clipboardText);
    });
  },

  checkSkippedBadgeColors: async (username:string, backgroundColor: string, fontColor: string) => {
    const bgColor = await I.grabCssPropertyFrom(game.locator.playersList.skippedBadge(username), 'background-color');
    I.assertEqual(backgroundColor, bgColor);
    const color = await I.grabCssPropertyFrom(game.locator.playersList.skippedBadge(username), 'color');
    I.assertEqual(fontColor, color); 
  },

  checkIndividualVoteColors: async (username: string, backgroundColor: string, fontColor: string) => {
    const bgColor = await I.grabCssPropertyFrom(game.locator.playersList.voterScoreIcon(username), 'background-color');
    I.assertEqual(backgroundColor, bgColor);
    const color = await I.grabCssPropertyFrom(game.locator.playersList.voterScoreIcon(username), 'color');
    I.assertEqual(fontColor, color);
  },
  
  async checkIfTheProfileImageIsUploaded(user: string, avatarImage: string) {
    const avatarImageInTheHeader = await I.grabAttributeFrom(game.locator.header.avatarProfilePictureHeader, 'src');
    I.assertEqual(avatarImageInTheHeader, avatarImage);
    const avatarImageInPlayersList = await I.grabAttributeFrom(game.locator.playersList.avatarImageInThePlayersList(user), 'src');
    I.assertEqual(avatarImageInPlayersList, avatarImage);
  },

  async checkIfUrlDidNotChange(previousGameRoomUrl: string) {
    const currentRoomUrl = await I.grabCurrentUrl();
    I.assertEqual(previousGameRoomUrl, currentRoomUrl);
  },
};

