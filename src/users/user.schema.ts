import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema
({
	id: String,
	userId: Number,
	name: String,
	email: String,
	picture: String,
	googleId: String,
	followers: {type: [Number], default: []},
	following: {type: [Number], default: []},
	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now},
	status: {type: String, enum:["active", "inactive", "deleted"], default: "active"}
});