import { RequestModel } from '@/models/RequestModel';
import { Storage } from '../lib/Storage/Storage';
import { LocalStorage } from '../lib/Storage/StorageManager';

export class StorageService {

    private requests: RequestModel[] = [];

    constructor(private storage: Storage<RequestModel[]>) {
        this.storage = new LocalStorage<RequestModel[]>();
        this.requests = this.storage.getItem("requests") ?? [];
    }

    public saveRequests(request: RequestModel): void {
        this.requests.push(request);
        this.storage.setItem("requests", this.requests);
    }

    public getRequests(): RequestModel[] {
        return [... this.requests];
    }

    public deleteRequest(request: RequestModel): void {
        // Encuentra el índice de la request a eliminar usando el id
        const index = this.requests.findIndex(req => req.id === request.id);

        // Si se encuentra la request, elimínala de la lista
        if (index !== -1) {
            this.requests.splice(index, 1);
            this.storage.setItem("requests", this.requests); // Actualiza el almacenamiento
        }
    }

}