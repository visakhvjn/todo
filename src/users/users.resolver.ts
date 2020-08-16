import { Query, Resolver, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { Task } from "src/tasks/task.interface";
import { TasksService } from "src/tasks/tasks.service";
import { Category } from "src/categories/category.interface";
import { CategoriesService } from "src/categories/categories.service";

@Resolver("User")
export class UsersResolver
{
	constructor(private UserService: UsersService, private TaskService: TasksService, private CategoryService: CategoriesService){}

	@Query("users")
	async getAllUsers()
	{
		return await this.UserService.getAllUsers();
	}

	@Query("user")
	async getUser(@Args("userId") userId: number): Promise<User>
	{
		return(await this.UserService.getUser(userId));
	}

	@ResolveField("tasks")
	async getTasksForUser(@Parent() user: User): Promise<Task[]>
	{
		return(await this.TaskService.getTasksForUser(user.userId));
	}

	@ResolveField("categories")
	async getCategoriesForUser(@Parent() user: User): Promise<Category[]>
	{
		return(await this.CategoryService.getUserCategories(user.userId));
	}

	@Mutation("createUser")
	async createMessage(@Args("name") name: string, @Args("email") email: string, @Args("picture") picture: string, @Args("googleId") googleId: string)
	{
		console.log("Trying to create a user");
		console.log(name + ":" + email + ":" + picture + ":" + googleId);
		return(await this.UserService.createUser(name, email, picture, googleId));
	}
}