import { Test, TestingModule } from '@nestjs/testing';
import { DoublefaService } from './doublefa.service';

describe('DoublefaService', () => {
  let service: DoublefaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoublefaService],
    }).compile();

    service = module.get<DoublefaService>(DoublefaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
