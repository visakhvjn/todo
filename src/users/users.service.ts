import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from "./user.interface";

@Injectable()
export class UsersService
{
	constructor(@InjectModel("User") private readonly User: Model<User>)
	{
	}

	// Gets all the users. Used for the admin panel.
	async getAllUsers()
	{
		const users = await this.User.find({});

		return(users);
	}

	// Fetch details of a single user.
	async getUser(userId: number): Promise<User>
	{
		const user = await this.User.findOne({"userId": userId});

		return(user);
	}

	// Create a new user
	async createUser(name: string, email: string, picture: string, googleId: string): Promise<User>
	{
		if (this.userExists(email, googleId))
		{
			return(null);
		}

		const totalUserCount: number = await this.User.count({});
		const nextUserId: number = totalUserCount + 1;

		const newUser =
		{
			userId: nextUserId,
			name: name,
			email: email,
			picture: picture,
			googleId: googleId
		}

		return(await this.User.create(newUser));
	}

	async userExists(email: string, googleId: string): Promise<boolean>
	{
		const user = await this.User.findOne({$or:[{"email": email},{"googleId": googleId}], "status": "active"});

		return(user? true: false);
	}
}
