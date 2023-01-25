import mongoose from "mongoose";
export declare class Data {
    static Users: {
        new (): {};
        _userModel: mongoose.Model<{
            id?: string;
        }, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            id?: string;
        }>>;
        get(id: string): Promise<mongoose.Document<unknown, any, {
            id?: string;
        }> & {
            id?: string;
        } & {
            _id: mongoose.Types.ObjectId;
        }>;
        update(id: string, data: any): Promise<mongoose.Document<unknown, any, {
            id?: string;
        }> & {
            id?: string;
        } & {
            _id: mongoose.Types.ObjectId;
        }>;
        set(id: string, data: any): Promise<mongoose.Document<unknown, any, {
            id?: string;
        }> & {
            id?: string;
        } & {
            _id: mongoose.Types.ObjectId;
        }>;
    };
}
