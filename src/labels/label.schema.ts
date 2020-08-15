import * as mongoose from "mongoose";

export const LabelSchema = new mongoose.Schema
({
	id: String,
	labelId: Number,
	userId: Number,
	title: String,
	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now},
	status: {type: String, enum:["active", "inactive", "deleted"], default: "active"}
});