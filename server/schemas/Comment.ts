import {
	Document,
	Schema,
	SchemaDefinition,
	SchemaOptions,
	SchemaTypeOpts
} from "mongoose";
import { IComment, ICommentClient } from "../../interfaces/basic";


export interface ICommentDocument extends IComment, Document {
	// 定義實例方法接口
	mapClientField: () => Promise<ICommentClient>
}

const createSchemaDefinition = (): SchemaDefinition => {
	const text: SchemaTypeOpts<any> = {
		type: String,
		required: true
	};

	const author: SchemaTypeOpts<any> = {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	};

	const belongToPost: SchemaTypeOpts<any> = {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Post"
	};

	return { text, author, belongToPost };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const CommentSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());

CommentSchema.methods.mapClientField = async function(): Promise<ICommentClient> {
	const comment = this;

	await comment
		.populate({ 
			path: "author", 
			select: "avatarUrl name" 
		})
		.execPopulate();

	const { _id, createdAt, updatedAt, text, author } = comment;
	const { avatarUrl, name } = author;

	return { _id, createdAt, updatedAt, text, avatarUrl, name };
}


export default CommentSchema;