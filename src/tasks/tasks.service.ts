import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Task } from './task.interface';

@Injectable()
export class TasksService
{
	constructor(@InjectModel("Task") private readonly Task: Model<Task>)
	{
	}

	// Gets all the tasks. Used for the admin panel.
	async getAllTasks()
	{
		const tasks = await this.Task.find({});

		return(tasks);
	}

	// Fetch details of a single task.
	async getTask(taskId: number): Promise<Task>
	{
		const task = await this.Task.findOne({"taskId": taskId});

		return(task);
	}

	// Create a new task
	async createTask(title: string, description: string, categoryId: number, userId: number, parentId: number, remarks: string, labels: [number], dueDate: Date): Promise<Task>
	{
		const totalTaskCount: number = await this.Task.count({});
		const nextTaskId: number = totalTaskCount + 1;

		const newTask =
		{
			taskId: nextTaskId,
			categoryId: categoryId,
			userId: userId,
			title: title,
			description: description,
			parentId: parentId,
			remarks: remarks,
			labels: labels,
			dueDate: dueDate
		}

		return(await this.Task.create(newTask));
	}

	async getTasksForUser(userId: number)
	{
		return(await this.Task.find({userId: userId}));
	}

	async getTasksForCategory(categoryId: number)
	{
		return(await this.Task.find({categoryId: categoryId}));
	}

	async getTaskCountForCategory(categoryId: number)
	{
		return(await this.Task.count({categoryId: categoryId}));
	}

	async removeTask(taskId: number)
	{
		return(await this.Task.updateOne
		(
			{
				"taskId": taskId,
				"status": "active"
			},
			{
				$set:
				{
					"status": "inactive",
					"updated": Date.now
				}
			}
		));
	}

	async removeAllTasksForCategory(userId: number, categoryId: number)
	{
		return(await this.Task.updateMany
		(
			{"categoryId": categoryId, "userId": userId},
			{
				$set:
				{
					"status": "deleted",
					"updated": new Date()
				}
			}
		));
	}

	async editTask(taskId: number, title: string, description: string, dueDate: Date, remarks: string, labels: [number])
	{
		return(await this.Task.findOneAndUpdate
		(
			{"taskId": taskId, "status": "active"},
			{
				$set:
				{
					title: title,
					description: description,
					dueDate: dueDate,
					remarks: remarks,
					labels: labels,
					updated: Date.now
				}
			},
			{new: true}
		));
	}

	async getAllUserTasksForLabel(labelId: number, userId: number)
	{
		return(await this.Task.find({"userId": userId, labels: {$in:[labelId]}}));
	}
}
