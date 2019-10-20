import { Request, Response } from "express";
import Comment from "../models/Comment";
import { IReqThroughMiddleware, IComment, ICommentClient } from "../../interfaces/basic";
import { ICommentDocument } from "../schemas/Comment";


class CommentController {
	// 新增留言
	public async create(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
		const text = req.body.text;
		const postId = req.params.postId;
		const userId = req.user!._id;
		const comment = new Comment({
			text,
			author: userId,
			belongToPost: postId
		});

		try {
			await comment.save();
			const commentClient: ICommentClient = await comment.mapClientField();
			res.json({ comment: commentClient });
		} catch(e){
			res.status(500).json({ message: e.message });
		};
	};

	// 刪除留言
	public async delete(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
		const commentId = req.params.commentId;

		try {
			const result = await Comment.findByIdAndDelete(commentId);
			res.json({ result });
		} catch(e){
			res.status(500).json({ message: e.message });
		};
	};
};


export default new CommentController();