import "reflect-metadata";
import { JsonProperty } from "../decorators/json-property";

export class CustomerModel {
  @JsonProperty("user_id")
  id: number;
  email: string;
  @JsonProperty("first_name")
  firstName: string;
  @JsonProperty("last_name")
  lastName: string;
  country: string;
  @JsonProperty("create_time")
  createdDate: number;
  constructor() {
    this.id = 0;
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.country = '';
    this.createdDate = 0;
  }
}
