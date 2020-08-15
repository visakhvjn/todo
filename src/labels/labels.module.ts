import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelSchema } from './label.schema';
import { TasksModule } from 'src/tasks/tasks.module';
import { LabelResolver } from './label.resolver';

@Module
({
	imports:
	[
		MongooseModule.forFeature([{name: "Label", schema: LabelSchema}]),
		TasksModule
	],
	controllers: [],
	providers: [LabelsService, LabelResolver],
	exports: [LabelResolver]
})
export class LabelsModule {}
