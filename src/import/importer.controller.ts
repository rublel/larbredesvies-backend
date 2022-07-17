import { Controller, Get } from '@nestjs/common';
import { ImporterService } from './importer.service';

@Controller('import')
export class ImporterController {
  constructor(private readonly importerService: ImporterService) {}

  @Get()
  getImporter() {
    return this.importerService.import();
  }
}
