import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersResolver } from "./users.resolver";
import { TasksModule } from 'src/tasks/tasks.module';

@Module
({
	imports:
	[
		MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
		TasksModule
	],
	controllers: [UsersController],
	providers: [UsersService, UsersResolver],
	exports: [UsersResolver]
})
export class UsersModule {}
