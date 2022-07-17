import { Module } from '@nestjs/common';
import { ImporterController } from './importer.controller';
import { ImporterService } from './importer.service';

@Module({
  imports: [],
  controllers: [ImporterController],
  providers: [ImporterService],
  exports: [ImporterService],
})
export class ImportModule {}
