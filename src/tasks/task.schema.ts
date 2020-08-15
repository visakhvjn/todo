import * as mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema
({
	id: String,
	taskId: Number,
	userId: Number,
	position: Number,
	title: String,
	description: String,
	parentId: {type: Number, default: 0},
	dueDate: {type: Date, default: Date.now},
	remarks: String,
	labels: {type: [Number], default: []},
	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now},
	status: {type: String, enum:["active", "inactive", "deleted"], default: "active"},
	isCompleted: {type: Boolean, default: false}
});