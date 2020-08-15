import { Document } from "mongoose";

export interface Task extends Document
{
	taskId: number,
	userId: number,
	title: string,
	description: string,
	parentId: number,
	remarks: string,
	labels: [number]
}