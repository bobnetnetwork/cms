export interface IModelService {
    findAll(callback: any): Promise<void>;

    create(data: any, callback: any): Promise<void>;

    update(data: any, callback: any): Promise<void>;
}