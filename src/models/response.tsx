import { Deserializable } from "./deserializable";

export class Response<T> implements Deserializable {
  status: number | undefined;
  message: string | undefined;
  error_code: string | undefined;
  data: T | undefined;
  paging: any;
  range: any;
  metadata: any;
  deserialize(input: any): any {
    Object.assign(this, input);
    return this;
  }
}
