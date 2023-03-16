class CustomHelper extends Helper {
  // this is a custom steps helper to add custom functions to I object. i.e these functions you can use in your test: I.functionName();

  // Custom steps - use Playwright helper to access default I functions

  async fillInputField(locator: string, value: string | number | CodeceptJS.Secret) {
    const { Playwright } = this.helpers;
    locator = locator.replace('$', '[data-testid=') + '] input';

    await Playwright.waitForVisible(locator);
    await Playwright.fillField(locator, value);
  }

  async grabNumberFrom(string: string) {
    const { Playwright } = this.helpers;
    string = await Playwright.grabTextFrom(string);
    const regexp = /[0-9]+/;
    return Number(string.match(regexp)[0]);  
  }

}

export = CustomHelper;
