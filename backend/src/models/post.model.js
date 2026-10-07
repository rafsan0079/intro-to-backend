import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema);
