import { Controller, Get, Param } from '@nestjs/common';
import { KernelService } from './kernel.service';

@Controller('kernel')
export class KernelController {
  constructor(private readonly service: KernelService) {}

  @Get('alphas')
  public async getAlphas() {
    return await this.service.getAlphas();
  }

  @Get('alphas/:id')
  public async getAlpha(@Param('id') alphaId: string) {
    return await this.service.getAlpha(alphaId);
  }

  @Get('alphas/:id/states')
  public async getAlphaStates(@Param('id') alphaId: string) {
    return await this.service.getAlphaStates(alphaId);
  }

  @Get('states')
  public async getStates() {
    return await this.service.getStates();
  }

  @Get('states/:id/checkpoints')
  public async getCheckpoints(@Param('id') id: string) {
    return await this.service.getCheckpoints(id);
  }
}
