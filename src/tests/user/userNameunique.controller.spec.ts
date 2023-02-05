import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../user/user.controller';
import { UserService } from '../../user/user.service';

/* test unitaire qiui véridié que le nom d'utilisateur enregistré dans la base de données est unique */

    describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    controllers: [UserController],
    providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    });


    describe('validateUsername', () => {
    it('Erreur si le username existe déjà', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1, username: 'existingUsername' });


    try {
        await controller.validateUsername('existingUsername');
        fail('Une erreur est attendue');
    } catch (error) {
        expect(error.message).toBe('Username existe déjà');
    }
    });

    it('Devrait retourner usernames\'il est bien unique', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(null);

    const result = await controller.validateUsername('newUsername');
    expect(result).toBe('newUsername');
    });


    });
});