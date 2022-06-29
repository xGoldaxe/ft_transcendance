import { WebsocketMiddleware } from './websocket.middleware';

describe('WebsocketMiddleware', () => {
  it('should be defined', () => {
    expect(new WebsocketMiddleware()).toBeDefined();
  });
});
