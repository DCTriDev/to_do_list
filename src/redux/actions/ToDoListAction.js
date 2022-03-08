import {ADD_TASK, DELETE_TASK, DONE_TASK, EDIT_TASK, UNDO_TASK, UPDATE_TASK} from "../types/ToDoListTypes";

export const addTaskAction = (task) => ({
    type: ADD_TASK, payload: task
})

export const doneTaskAction = (taskID) => ({
    type: DONE_TASK, payload: taskID
})

export const undoTaskAction = (taskID) => ({
    type: UNDO_TASK, payload: taskID
})

export const deleteTask = (taskID) => ({
    type: DELETE_TASK, payload: taskID
})

export const editTask = (task) => ({
    type: EDIT_TASK, payload: task
})

export const updateTask = (taskName) => ({
    type: UPDATE_TASK, payload: taskName
})