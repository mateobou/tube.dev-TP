import { UserController } from '../user/app.controller';
import { AppService } from '../user/app.service';

/* test qui réussit si à la racine du site, est affiché 'Hello World!' */

describe('AppController', () => {
  let userController: UserController;
  let userService: UserService;


beforeEach(() => {
  userService = new UserService();
  userController = new UserController(userService);
});


  describe('root', () => {
    it('Devrait retourner "Hello World!" à la racine du site', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

});