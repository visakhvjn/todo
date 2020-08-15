import { Query, Resolver, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { LabelsService } from "./labels.service";
import { Label } from "./label.interface";
import { TasksService } from "src/tasks/tasks.service";
import { Task } from "src/tasks/task.interface";

@Resolver("Label")
export class LabelResolver
{
	constructor(private LabelService: LabelsService, private TaskService: TasksService){}

	@Query("labels")
	async getAllLabels(): Promise<Label[]>
	{
		return(await this.LabelService.getAllLabels());
	}

	@Query("userLabels")
	async getLabelsForUser(@Args("userId") userId: number): Promise<Label[]>
	{
		return(await this.LabelService.getAllActiveLabelsForUser(userId));
	}

	@ResolveField("tasks")
	async getUserTasksForLabel(@Parent() label: Label): Promise<Task[]>
	{
		return(await this.TaskService.getAllUserTasksForLabel(label.labelId, label.userId));
	}

	@Mutation("editLabel")
	editLabel(@Args("labelId") labelId: number, @Args("userId") userId: number, @Args("title") title: string): Promise<Label>
	{
		return(this.LabelService.editLabel(labelId, userId, title));
	}
}