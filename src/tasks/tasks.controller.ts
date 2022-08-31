// import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
// import { title } from 'process';
// import { brotliDecompressSync } from 'zlib';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
// import { TaskStatus } from './task-status.enum';
// import { TasksService } from './tasks.service';

// @Controller('tasks')
// export class TasksController {
//   constructor(private tasksService: TasksService) {}

//   // @Get()
//   // getAllTasks(): Task[] {
//   //   return this.tasksService.getAllTasks();
//   // }
//   @Get()
//   getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
//     if (Object.keys(filterDto).length){
//       return this.tasksService.getTasksWithFilters(filterDto);

//     }else{
//       return this.tasksService.getAllTasks();
//     }
//   }

//   @Get('/:id')
//   getTaskById(@Param('id') id: string): Task{
//     return this.tasksService.getTaskById(id);

//   }

//   // @Post()
//   // createTask(@Body() body){
//   //   console.log('body',body);

//   // }

//   @Post()
//   createTask(@Body()
//     // @Body('title') title: string,
//     // @Body('description') description: string,
//     createTaskDto: CreateTaskDto): Task {
//     return this.tasksService.createTask(createTaskDto);
    
//   }
//   @Delete('/:id')
//   deleteTask(@Param('id') id: string):void{
//     return this.tasksService.deleteTask(id);
//   }
// @Patch('/:id/status')
// updateTaskStatus(
//   @Param('id') id:string,
//   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
// ):Task{
//   const { status } = updateTaskStatusDto;
//   return this.tasksService.updateTaskStatus(id,status);
// }

// }




import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';



import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

    @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskstatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskstatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}