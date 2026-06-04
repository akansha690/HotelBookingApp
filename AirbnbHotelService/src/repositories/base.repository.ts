import { CreationAttributes, Model, ModelStatic, WhereOptions } from "sequelize";


abstract class BaseRepository<T extends Model> {
    protected model : ModelStatic<T>;
    constructor(model : ModelStatic<T> ){
        this.model = model
    }
    async create(data: CreationAttributes<T>) : Promise<T>{
        try {
            const record = await this.model.create(data);
            return record;
        } catch (error) {
            throw error;
        }
    }
    async findById(id:number): Promise<T | null>{
        try {
            const record = await this.model.findByPk(id);
            if(!record){
                return null;
            }
            return record; 
        } catch (error) {
            throw error;
        }
    }
    async findAll(): Promise<T[]>{
        try {
            const records = await this.model.findAll();
            if(!records){
                return [];
            }
            return records; 
        } catch (error) {
            throw error;
        }
    }
    async delete(whereData: WhereOptions<T>): Promise<void>{
        try {
            const record = await this.model.destroy({
                where: {
                    ...whereData
                }
            });
            if(!record){
                throw new Error("No record found to delete")
            }
            return; 
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, data: Partial<T>):Promise<T | null>{
        try {
            const record = await this.model.findByPk(id);
            if(!record){
                return null;
            }
            Object.assign(record, data);
            await record.save();
            return record;
        } catch (error) {
            throw error;
        }
    }

}

export default BaseRepository;