import { Test, TestingModule } from '@nestjs/testing';
import { DoublefaController } from './doublefa.controller';

describe('DoublefaController', () => {
  let controller: DoublefaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoublefaController],
    }).compile();

    controller = module.get<DoublefaController>(DoublefaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
