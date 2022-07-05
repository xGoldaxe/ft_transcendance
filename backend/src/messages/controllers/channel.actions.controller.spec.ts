import { Test, TestingModule } from '@nestjs/testing';
import { ChannelActionController } from './channel.actions.controller';

describe('MessagesController', () => {
  let controller: ChannelActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelActionController],
    }).compile();

    controller = module.get<ChannelActionController>(ChannelActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
