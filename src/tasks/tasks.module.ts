import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.schema';
import { TasksService } from "./tasks.service";
import { TasksResolver } from "./tasks.resolver";

@Module
({
	imports:
	[
		MongooseModule.forFeature([{name: "Task", schema: TaskSchema}]),
	],
	controllers: [],
	providers: [TasksService, TasksResolver],
	exports: [TasksResolver, TasksService]
})
export class TasksModule {}
