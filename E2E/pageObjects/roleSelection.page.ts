const { I } = inject();

const locator = {
  buttons: {
    voter: '$Voter selection box',
    spectator: '$Spectator selection box',
  },
};
export = {
  locator: locator,
  spectatorLogin: () => {
    I.seeElement(locator.buttons.voter);
    I.seeElement(locator.buttons.spectator);
    I.click(locator.buttons.spectator);
  },
  voterLogin: () => {
    I.seeElement(locator.buttons.voter);
    I.seeElement(locator.buttons.spectator);
    I.click(locator.buttons.voter);
  },
};
