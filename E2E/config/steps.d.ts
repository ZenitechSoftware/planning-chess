/// <reference types='codeceptjs' />

type login = typeof import('../pageObjects/login.page');
type game = typeof import('../pageObjects/game.page');
type username = typeof import('../test_data/usernames');


type CustomHelper = import('../helpers/customSteps.helper');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;

    login: login;
  
    game: game; 

    username: username;
  
  }
  interface Methods extends CustomHelper, Playwright { }
  interface I extends WithTranslation<Methods> { }
  namespace Translation {
    interface Actions { }
  }
}
