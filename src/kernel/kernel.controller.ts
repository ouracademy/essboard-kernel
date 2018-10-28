import { Controller, Get, Param } from '@nestjs/common';
import { KernelService } from './kernel.service';

@Controller('kernel')
export class KernelController {
  constructor(private readonly service: KernelService) {}

  @Get()
  public async getAlphas() {
    return await this.service.getAlphas();
  }

  @Get('alphas/:id')
  public async getStates(@Param('id') alphaId: string) {
    return await this.service.getStates(alphaId);
  }
}
