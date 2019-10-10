import express from "express";
import AuthorsController from "../controllers/Authors";


const router = express.Router();

// 讀取全部部落格作者資料
router.get("/", AuthorsController.fetchAll)

// 讀取單一部落格作者資料
router.get("/:userId", AuthorsController.fetch);


export default router;