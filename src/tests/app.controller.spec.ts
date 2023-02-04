import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';



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
