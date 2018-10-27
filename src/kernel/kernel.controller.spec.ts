import { Test, TestingModule } from '@nestjs/testing';
import { KernelController } from './kernel.controller';

describe('Kernel Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [KernelController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: KernelController = module.get<KernelController>(KernelController);
    expect(controller).toBeDefined();
  });
});
