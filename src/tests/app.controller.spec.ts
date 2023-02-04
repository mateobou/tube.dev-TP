import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

/* test qui réussit si à la racine du site, est affiché 'Hello World!' */

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;


beforeEach(() => {
  appService = new AppService();
  appController = new AppController(appService);
});


  describe('root', () => {
    it('Devrait retourner "Hello World!" à la racine du site', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

});
