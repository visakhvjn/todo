import * as mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema
({
	id: String,
	categoryId: Number,
	order: Number,
	position: Number,
	userId: Number,
	type: {type: String, enum: ["public", "private"], default: "private"},
	members: [Number],
	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now},
	status: {type: String, enum:["active", "inactive", "deleted"], default: "active"}
});