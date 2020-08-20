import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Category } from './category.interface';

@Injectable()
export class CategoriesService
{
	constructor(@InjectModel("Category") private readonly Category: Model<Category>)
	{
	}

	// Gets all the categories. Used for the admin panel.
	async getAllCategories()
	{
		const categories = await this.Category.find({});

		return(categories);
	}

	// Get details of a single category.
	async getCategory(categoryId: number)
	{
		const category = await this.Category.findOne({categoryId: categoryId});

		return(category);
	}

	// Get categories for a user.
	async getUserCategories(userId: number)
	{
		return(await this.Category.find({userId: userId, "status": "active"}));
	}

	// Create a new category.
	async createCategory(name: string, type: string, userId: number)
	{
		const totalCategoryCount: number = await this.Category.countDocuments({});
		const nextCategoryId: number = totalCategoryCount + 1;

		const newCategory =
		{
			categoryId: nextCategoryId,
			name: name,
			type: type,
			userId: userId
		}

		console.log(newCategory);

		return(await this.Category.create(newCategory));
	}

	// Remove a category and all of it's tasks.
	async removeCategory(userId: number, categoryId: number)
	{
		return(await this.Category.updateOne
		(
			{"categoryId": categoryId, "status": "active", "userId": userId},
			{
				$set:
				{
					"status": "deleted",
					"updated": Date.now
				}
			}
		));
	}

	// Rename a category and all of it's tasks.
	async renameCategory(userId: number, categoryId: number, name: string)
	{
		return(await this.Category.updateOne
		(
			{"categoryId": categoryId, "status": "active", "userId": userId},
			{
				$set:
				{
					"name": name,
					"updated": Date.now
				}
			}
		));
	}
}
