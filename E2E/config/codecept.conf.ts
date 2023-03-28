require("ts-node/register");
const pages = require("./include.ts");
require("dotenv").config({ path: ".env" });

exports.config = {
  tests: "../tests/*.test.ts",
  output: "../screenshots",
  name: "Planning Chess",
  include: pages,
  helpers: {
    CustomHelper: {
      require: "../helpers/customSteps.helper.ts",
    },
    ChaiWrapper: {
      require: "codeceptjs-chai",
    },
    Playwright: {
      url: process.env.BASE_URL,
      browser: "chromium",
      show: process.env.HEADLESS === "yes" ? false : true,
      restart: false,
      waitForTimeout: 10000,
      locale: "en-GB",
      windowSize: "1920x1080",
    },
  },
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
    customLocator: {
      enabled: true,
      attribute: "data-testid",
    },
  },
  multiple: {
    basic: {
      browsers: ["chromium", "firefox", "webkit"],
    },
  },
};
