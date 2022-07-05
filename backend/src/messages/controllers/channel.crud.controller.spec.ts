import { Test, TestingModule } from '@nestjs/testing';
import { ChannelCrudController } from './channel.crud.controller';

describe('MessagesController', () => {
  let controller: ChannelCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelCrudController],
    }).compile();

    controller = module.get<ChannelCrudController>(ChannelCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
