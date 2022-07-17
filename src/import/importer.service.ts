import { readdirSync } from 'fs';
import path from 'path';

export class ImporterService {
  constructor(
    //list of files into deposit folder
    private readonly files: string[],
  ) {}

  public import() {
    //listing all files into deposit folder
    const files = __dirname + '/deposit/customers.csv';
    const filesList = readdirSync(files);
    console.log(filesList);
    return filesList;
  }
}
