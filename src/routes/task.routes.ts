import { Router } from 'express';
import {
    getTasks,
    getCount,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/task.controller';

const tasksRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Task:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto generated id of task
 *              name:
 *                  type: string
 *                  description: the name of the task
 *              description:
 *                  type: string
 *                  description: the description of the task
 *          required: 
 *              - name
 *              - description
 *          example:
 *              id: P2BsYn1WJDIvpmtqxO6LT
 *              name: My first tasks
 *              description: I have to do something
 *      TaskNotFound:
 *          type: object
 *          properties:
 *              msg:
 *                  type: string
 *                  description: A message for the not found task
 *          example:
 *              msg: Task was not found
 * 
 *  
 *  parameters:
 *      taskId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The Task ID
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks endpoint
 */


/**
 * @swagger
 * /tasks:
 *  get:
 *    summary: Return a Task list
 *    tags: [Tasks]
 *    responses:
 *      200:
 *        description: The list of tasks
 *        content:
 *          application/json:
 *              schema: 
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Task'
 *                  
 *          
 */
tasksRouter.get('/tasks', getTasks)

/**
 * @swagger
 * /tasks/count:
 *  get:
 *      summary: Return the length of the Task list
 *      tags: [Tasks]
 * 
 *      responses:
 *          200:
 *              description: The length of Task list
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          example: {"taskLength": 4}
 *                          
 *              
 */
tasksRouter.get('/tasks/count', getCount)

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      summary: Return a Task by its given id
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#components/parameters/taskId'
 *      
 *      responses:
 *          200:
 *              description: The task was found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: the task was not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 *      
 */
tasksRouter.get('/tasks/:id', getTask)

/**
 * @swagger
 * /tasks:
 *  post:
 *      summary: Create a new Task
 *      tags: [Tasks]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          200:
 *              description: the task that was created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *                          
 *          500:
 *              description: Internal server error
 *              
 */
tasksRouter.post('/tasks', createTask)

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *      summary: Update a Task
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/taskId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task' 
 *      responses:
 *          200:
 *              description: The task that was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: Task was not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 * 
 */
tasksRouter.put('/tasks/:id', updateTask)

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *      summary: Delete a Task by its given id and return it
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#components/parameters/taskId'
 *      
 *      responses:
 *          200:
 *              description: The task that was found and deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: the task was not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 *      
 */
tasksRouter.delete('/tasks/:id', deleteTask)


export default tasksRouter