import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Label } from './label.interface';
import { Model } from "mongoose";

@Injectable()
export class LabelsService
{
	constructor(@InjectModel("Label") private readonly Label: Model<Label>)
	{
	}

	async getAllLabels()
	{
		return(await this.Label.find());
	}

	async getAllActiveLabelsForUser(userId: number)
	{
		return(await this.Label.find({"userId": userId, "status": "active"}));
	}

	// To create a new label.
	async createLabel(title: string, userId: number)
	{
		const labelCount: number = await this.countLabels();
		const newLabelId: number = labelCount + 1;
		const newLabel =
		{
			labelId: newLabelId,
			userId: userId,
			title: title
		}

		return(await this.Label.create(newLabel));
	}

	// To count the total labels in the system
	async countLabels()
	{
		return(await this.Label.count({}));
	}

	async editLabel(labelId: number, userId: number, title: string)
	{
		return(await this.Label.findOneAndUpdate
		(
			{"labelId": labelId, "userId": userId, "status": "active"},
			{
				$set: {"title": title, updated: Date.now}
			},
			{new: true}
		));
	}
}
