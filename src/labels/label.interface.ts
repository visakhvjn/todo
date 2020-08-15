import { Document } from "mongoose";

export interface Label extends Document
{
	labelId: number,
	title: string,
	userId: number
}