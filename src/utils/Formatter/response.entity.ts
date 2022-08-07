export class Response<T> {
  public records?: T[] | T;
  public exist?: boolean;
  public error?: string;
}
