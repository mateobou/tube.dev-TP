import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { getModelToken } from '@nestjs/mongoose';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/schemas/user.schema';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        // inject User model as a provider with the useValue property
        {
          provide: getModelToken(User.name),
          useValue: User,
        },
        UserRepository,
      ],
    })
      // override the AuthGuard with an empty object
      .overrideGuard(AuthGuard)
      .useValue({})
      .compile();

    // get instances of AppService and AppController from the testing module
    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // test that the returned value from getHello() is "Hello World!"
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('login', () => {
    it('should return req.user', async () => {
      // create a request object with a user property set to "user"
      const req = { user: 'user' };
      // call the login() method on the AppController instance
      const result = await appController.login(req as any);
      // test that the result of the login() method is equal to "user"
      expect(result).toBe('user');
    });
  });
});
