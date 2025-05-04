import axios from "axios";
import { RequestSignupDto } from "../types/auth.ts";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};
