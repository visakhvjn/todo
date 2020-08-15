import { Document } from "mongoose";

export interface User extends Document
{
	userId: number,
	name: string,
	email: string,
	picture: string,
	googleId: string
}