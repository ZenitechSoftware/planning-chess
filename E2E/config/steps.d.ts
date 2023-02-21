/// <reference types='codeceptjs' />

type login = typeof import('../pageObjects/login.page');
type game = typeof import('../pageObjects/game.page');
type roles = typeof import('../pageObjects/roleSelection.page');
type copyLinkAssert = typeof import('../assertions/copyLinkAssert');


type CustomHelper = import('../helpers/customSteps.helper');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    login: login;
    game: game;
    roles: roles;
  
    copyLinkAssert: copyLinkAssert;
  }
  interface Methods extends CustomHelper, Playwright { }
  interface I extends WithTranslation<Methods> { }
  namespace Translation {
    interface Actions { }
  }
}
