import { HttpMethods } from "../Types/HttpMethods";

export interface Requests {
    requests: RequestModel[];
}

export interface RequestModel {
    id: number,
    methodType: HttpMethods;
    url: string;
    body: string;
    hearders: Header[];
    isSave: boolean;
}

export interface Header {
    key: string;
    value: string;
}