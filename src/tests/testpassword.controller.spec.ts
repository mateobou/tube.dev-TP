import { Test, TestingModule } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { AuthModule } from '../user/auth.module';

/* Ce test vérifie que le mot de passe entré par l'utilisateur est bien haché et stocké dans la base de données correctement */



describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    imports: [AuthModule],
    providers: [UserService],
    }).compile();


    service = module.get<UserService>(UserService);

    });

    it('doit générer et vérifier le jeton JWT', async () => {
    const payload = { username: 'testuser' };
    const secret = 'secretkey';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, options);

    const decoded = jwt.verify(token, secret);
    expect(decoded).toEqual(payload);

    });
});