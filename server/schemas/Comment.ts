import {
	Document,
	Schema,
	SchemaDefinition,
	SchemaOptions,
	SchemaTypeOpts
} from "mongoose";
import { IComment } from "../../interfaces/basic";


export interface ICommentDocument extends IComment, Document {
	// 定義實例方法接口
}

const createSchemaDefinition = (): SchemaDefinition => {
	const text: SchemaTypeOpts<any> = {
		type: String,
		required: true
	};

	const author: SchemaTypeOpts<any> = {
		type: String,
		required: true,
		ref: "User"
	};

	const belongToPost: SchemaTypeOpts<any> = {
		type: String,
		required: true,
		ref: "Post"
	};

	return { text, author, belongToPost };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const CommentSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());


export default CommentSchema;