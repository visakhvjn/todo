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

	// Create a new category.
	async createCategory(name: string, type: string, userId: number)
	{
		const totalCategoryCount: number = await this.Category.count({});
		const nextCategoryId: number = totalCategoryCount + 1;

		const newCategory =
		{
			categoryId: nextCategoryId,
			name: name,
			type: type,
			userId: userId
		}

		return(await this.Category.create(newCategory));
	}

	// Remove a category and all of it's tasks.
	async removeCategory(categoryId: number)
	{
		return(await this.Category.updateOne
		(
			{"categoryId": categoryId, "status": "active"},
			{
				$set:
				{
					"status": "deleted",
					"updated": Date.now
				}
			}
		));
	}

	// Edit a category.
	async editCategory(categoryId: number, name: string)
	{
		return(await this.Category.findOneAndUpdate({"categoryId": categoryId}, {$set:{"name": name, "updated": Date.now}}, {new: true}));
	}
}
