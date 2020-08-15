import { Document } from "mongoose";

export interface Category extends Document
{
	categoryId: number,
	name: string,
	type: string,
	userId: number
}