/// <reference types='codeceptjs' />

type login = typeof import('../pageObjects/login.page');
type game = typeof import('../pageObjects/game.page');
type roles = typeof import('../pageObjects/roleSelection.page');
type username = typeof import('../test_data/usernames');
type chessPiece = typeof import('../test_data/chessPieces');
type chessTile = typeof import('../test_data/chessTiles');


type CustomHelper = import('../helpers/customSteps.helper');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    login: login;
    game: game;
    roles: roles;
    username: username;
    chessPiece: chessPiece;
    chessTile: chessTile;
  
  }
  interface Methods extends CustomHelper, Playwright { }
  interface I extends WithTranslation<Methods> { }
  namespace Translation {
    interface Actions { }
  }
}
