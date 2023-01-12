const { I } = inject();

const locator = {
  usernameInput: '#username-input',
  loginButton: '$login-btn',
};

export = {
  login: (username: string) => {

    I.see('Welcome! Let’s begin.');
    I.waitForVisible(locator.usernameInput);
    I.fillField(locator.usernameInput, username);
    I.click(locator.loginButton);
  },

};
