import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.schema';
import { CategoriesResolver } from './category.resolver';
import { TasksModule } from 'src/tasks/tasks.module';

@Module
({
	imports:
	[
		MongooseModule.forFeature([{name: "Category", schema: CategorySchema}]),
		TasksModule
	],
	controllers: [],
	providers: [CategoriesService, CategoriesResolver],
	exports: [CategoriesResolver]
})
export class CategoriesModule {}
