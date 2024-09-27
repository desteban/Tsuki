import { HttpMethods } from "../Types/HttpMethods";

export interface RequestModel {
    methodType: HttpMethods;
    url: string;
    body: string;
    hearders: Header[];
}

export interface Header {
    key: string;
    value: string;
}