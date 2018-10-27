import { Module } from '@nestjs/common';
import { KernelService } from './kernel.service';
import { KernelController } from './kernel.controller';

@Module({
  providers: [KernelService],
  controllers: [KernelController],
})
export class KernelModule {}
