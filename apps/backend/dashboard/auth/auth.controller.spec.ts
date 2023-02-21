import {AuthService} from './auth.service';
import {Test, TestingModule} from '@nestjs/testing';

describe('AuthController', () => {
  let authService: AuthService;
  let module: TestingModule;

  const mockTestArr = [1, 2, 3];

  const mockAuthService = {
    test: () => mockTestArr,
  };

  const AuthServiceProvider = {
    provide: AuthService,
    useValue: mockAuthService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AuthService, AuthServiceProvider],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('test', () => {
    it('should get test mock function result', async () => {
      expect(await authService.test()).toEqual(mockTestArr);
    });
  });
});
