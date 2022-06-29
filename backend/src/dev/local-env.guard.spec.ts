import { LocalEnvGuard } from './local-env.guard';

describe('LocalEnvGuard', () => {
  it('should be defined', () => {
    expect(new LocalEnvGuard()).toBeDefined();
  });
});
