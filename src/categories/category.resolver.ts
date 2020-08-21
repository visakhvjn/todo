import { Query, Resolver, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { Category } from "./category.interface";
import { CategoriesService } from "./categories.service";
import { TasksService } from "src/tasks/tasks.service";
import { Task } from "src/tasks/task.interface";

@Resolver("Category")
export class CategoriesResolver
{
	constructor(private CategoryService: CategoriesService, private TaskService: TasksService){}

	@Query("categories")
	async getAllCategories()
	{
		return await this.CategoryService.getAllCategories();
	}

	@Query("category")
	async getCategory(@Args("categoryId") categoryId: number): Promise<Category>
	{
		return(await this.CategoryService.getCategory(categoryId));
	}

	@ResolveField("tasks")
	async getTasksForCategory(@Parent() category: Category): Promise<Task[]>
	{
		return(await this.TaskService.getTasksForCategory(category.categoryId));
	}

	@ResolveField("count")
	async getTaskCountForCategory(@Parent() category: Category): Promise<number>
	{
		return(await this.TaskService.getTaskCountForCategory(category.categoryId));
	}

	@Mutation("createCategory")
	async createCategory(@Args("name") name: string, @Args("type") type: string, @Args("userId") userId: number): Promise<Category>
	{
		return(await this.CategoryService.createCategory(name, type, userId));
	}

	@Mutation("removeCategory")
	async removeCategory(@Args("userId") userId: number, @Args("categoryId") categoryId: number)
	{
		await this.TaskService.removeAllTasksForCategory(userId, categoryId);
		return(await this.CategoryService.removeCategory(userId, categoryId));
	}

	@Mutation("renameCategory")
	async renameCategory(@Args("categoryId") categoryId: number, @Args("name") name: string, @Args("userId") userId: number)
	{
		await this.CategoryService.renameCategory(userId, categoryId, name);
	}
}