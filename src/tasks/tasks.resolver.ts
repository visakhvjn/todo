import { Query, Resolver, Mutation, Args } from "@nestjs/graphql";
import { TasksService } from "./tasks.service";
import { Task } from "./task.interface";

@Resolver()
export class TasksResolver
{
	constructor(private TaskService: TasksService){}

	@Query("tasks")
	async getAllTasks()
	{
		return await this.TaskService.getAllTasks();
	}

	@Query("task")
	async getTask(@Args("taskId") taskId: number): Promise<Task>
	{
		return(await this.TaskService.getTask(taskId));
	}

	@Mutation("createTask")
	async createTask(@Args("title") title: string, @Args("description") description: string, @Args("parentId") parentId: number, @Args("userId") userId: number, @Args("dueDate") dueDate: Date, @Args("labels") labels: [number], @Args("remarks") remarks: string)
	{
		return(await this.TaskService.createTask(title, description, userId, parentId, remarks, labels, dueDate));
	}

	@Mutation("removeTask")
	async removeTask(@Args("taskId") taskId: number)
	{
		return(await this.TaskService.removeTask(taskId));
	}

	@Mutation("editTask")
	async editTask(@Args("taskId") taskId: number, @Args("title") title: string, @Args("description") description: string, @Args("dueDate") dueDate: Date, @Args("remarks") remarks: string, @Args("labels") labels: [number])
	{
		return(await this.TaskService.editTask(taskId, title, description, dueDate, remarks, labels));
	}
}