import { Router } from "express";

import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from "../controllers/post.controller.js";

const router = Router();

router.route("/")
    .post(createPost)
    .get(getPosts);

router.route("/:id")
    .get(getPostById)
    .patch(updatePost)
    .delete(deletePost);

export default router;
