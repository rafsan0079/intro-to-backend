import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

// create a post

const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: "Title, content and author are required" });
        }

        if (!mongoose.isValidObjectId(author)) {
            return res.status(400).json({ message: "Invalid author id" });
        }

        const user = await User.findById(author);
        if (!user) {
            return res.status(404).json({ message: "Author not found" });
        }

        const post = await Post.create({ title, content, author });

        res.status(201).json({
            message: "Post created",
            post
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// get all posts (newest first)

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: posts.length,
            posts
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// get one post by id

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const post = await Post.findById(id).populate("author", "username email");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ post });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// update title and/or content

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        if (!title && !content) {
            return res.status(400).json({ message: "Nothing to update" });
        }

        const updates = {};
        if (title) updates.title = title;
        if (content) updates.content = content;

        const post = await Post.findByIdAndUpdate(id, updates, {
            returnDocument: "after",
            runValidators: true
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post updated",
            post
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// delete a post

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};
