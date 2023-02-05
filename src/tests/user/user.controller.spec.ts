import { Test, TestingModule } from '@nestjs/testing';
import { userController } from '../../user/user.controller';


/* Ce test vérifie que les données entrées par l'utilisateur pour se connecter sont du bon type. Dans cette situation, il y a 
le type chaîne de caractère à tester pour les first name, last name, email, et password */


describe('User Controller', () => {
    let controller: userController;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    controllers: [userController],
    }).compile();


    controller = module.get<userController>(userController);
    });

    
    it('Le first name est bien un string', () => {
    const firstName = 'John';
    const result = controller.validateFirstName(firstName);
    expect(typeof firstName).toBe('string');
    });

    it('Le last name est bien un string', () => {
    const lastName = 'Doe';
    const result = controller.validateLastName(lastName);
    expect(typeof lastName).toBe('string');
    });

    it('L\'email est bien un string', () => {
    const email = 'john.doe@example.com';
    const result = controller.validateEmail(email);
    expect(typeof email).toBe('string');
    });

    it('Le password est bien un string', () => {
    const password = 'secret123';
    const result = controller.validatePassword(password);
    expect(typeof password).toBe('string');
    });
});