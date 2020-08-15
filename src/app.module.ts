import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { LabelsModule } from './labels/labels.module';

require('dotenv').config();

@Module
({
	imports:
	[
		GraphQLModule.forRoot
		({
			typePaths: ["./**/*.graphql"]
		}),
		MongooseModule.forRoot(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
		UsersModule,
		CategoriesModule,
		TasksModule,
		LabelsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
