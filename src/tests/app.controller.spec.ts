import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../user/auth/auth.module';
import { UserRepository } from '../user/user.repository';
import { JwtStrategy } from '../user/auth/local.strategy';
import { User } from '../user/schemas/user.schema';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../user/users.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://usertest:test@cluster0.m4mrrwq.mongodb.net/?retryWrites=true&w=majority',
        ),
        UsersModule,
        AuthModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});

describe('AuthModule', () => {
  let authModule: TestingModule;

  beforeEach(async () => {
    authModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(UserRepository)
      .useValue({
        findOne: jest.fn(),
      })
      .compile();
  });

  describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;
    let userRepository;
    beforeEach(async () => {
      userRepository = authModule.get<UserRepository>(UserRepository);
      jwtStrategy = authModule.get<JwtStrategy>(JwtStrategy);
    });

    describe('validate', () => {
      it('validates and returns the user based on JWT payload', async () => {
        const user = new User();
        user.userId = '1';
        user.email = 'test@example.com';

        userRepository.findOne.mockResolvedValue(user);

        const result = await jwtStrategy.validate({
          sub: user.userId,
          email: user.email,
        });
        expect(result).toEqual({ userId: user.userId, email: user.email });
      });

      it('throws an unauthorized exception if user cannot be found', async () => {
        userRepository.findOne.mockResolvedValue(null);
        await expect(
          jwtStrategy.validate({ sub: 1, email: 'test@example.com' }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
  });
});
