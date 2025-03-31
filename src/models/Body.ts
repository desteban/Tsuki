import { FormEncoded } from "./FormEncoded";

export type Body = {
        form: FormData;
        formEncoded: FormEncoded[];
        json: string | undefined | null;
}