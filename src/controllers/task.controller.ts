import { Handler } from 'express';
import { nanoid } from 'nanoid';

import { getConnection } from '../db';

export const getTasks: Handler = ((req, res) => {
    const tasks = getConnection().get('tasks').value()
    res.json(tasks)
})

export const getTask: Handler = ((req, res) => {
    const { id } = req.params
    try {
        const taskFound = getConnection().get('tasks').find({ id }).value()
        if (!taskFound) return res.status(404).json({ msg: 'Task was not founded' })
        res.json(taskFound)
    } catch (error) {
        res.status(500).json(error)
    }
})

export const getCount: Handler = ((req, res) => {
    try {
        const taskLength = getConnection().get('tasks').value().length
        res.json({ taskLength })
    } catch (error) {

    }
})

export const createTask: Handler = ((req, res) => {
    const { name, description } = req.body
    const newTask = { name, description, id: nanoid() }
    try {
        getConnection().get('tasks').push(newTask).write()
    } catch (error) {
        res.status(500).json(error)
    }
    res.json(newTask)
})

export const updateTask: Handler = ((req, res) => {
    const { id } = req.params

    try {
        const taskFound = getConnection().get('tasks').find({ id }).value()
        if (!taskFound) return res.status(404).json({ msg: 'Task was not found' })

        const updatedTask = getConnection().get('tasks').find({ id }).assign(req.body).write()
        res.json(updatedTask)
    } catch (error) {
        res.status(500).json(error)
    }
})

export const deleteTask: Handler = ((req, res) => {

    try {
        const { id } = req.params
        const taskFounded = getConnection().get('tasks').find({ id }).value()
        if (!taskFounded) return res.status(404).json({ msg: 'Task was not founded' })

        const deletedTask = getConnection().get('tasks').remove({ id }).write()[0]
        res.json(deletedTask)

    } catch (error) {
        res.status(500).json(error)
    }
})