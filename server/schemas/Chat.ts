import { 
    Document,
    Schema,
    SchemaDefinition,
    SchemaOptions,
    SchemaTypeOpts
} from "mongoose";
import { IChat } from "../../interfaces/basic";


export interface IChatDocument extends IChat, Document {
    // 定義實例方法接口
}

const createSchemaDefinition = (): SchemaDefinition => {
    const members: SchemaTypeOpts<any> = {
        type: Array
    };

    const messages: SchemaTypeOpts<any> = [
        {
            author: Schema.Types.ObjectId,
            content: String,
            createdAt: Date
        }
    ]

    return { members, messages };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const ChatSchema = new Schema(createSchemaDefinition(), createSchemaOptions());


export default ChatSchema;