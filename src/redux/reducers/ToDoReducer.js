import {ADD_TASK, DELETE_TASK, DONE_TASK, EDIT_TASK, UNDO_TASK, UPDATE_TASK} from "../types/ToDoListTypes";

const initialState = {
    taskList: [
        {id: 'Task 1', taskName: 'Task 1', status: true},
        {id: 'Task 2', taskName: 'Task 2', status: false},
        {id: 'Task 3', taskName: 'Task 3', status: true},
        {id: 'Task 4', taskName: 'Task 4', status: false}
    ],
    taskEdit: {}
}

const toDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK: {
            if (action.payload.taskName.trim() === '') {
                alert('Task name is required!!!')
                return {...state}
            }
            let index = state.taskList.findIndex(item => item.taskName === action.payload.taskName)
            if (index !== -1) {
                alert('Task name already exits!!')
                return {...state}
            }
            let newTask = {...action.payload, id: Date.now()}
            state.taskList = [...state.taskList, newTask]
            return {...state}
        }

        case DONE_TASK: {
            let newTaskList = [...state.taskList]
            let index = newTaskList.findIndex(item => item.id === action.payload)
            if (index !== -1) {
                newTaskList[index].status = true
            }
            return {...state, taskList: newTaskList}
        }

        case UNDO_TASK: {
            let newTaskList = [...state.taskList]
            let index = newTaskList.findIndex(item => item.id === action.payload)
            if (index !== -1) {
                newTaskList[index].status = false
            }
            return {...state, taskList: newTaskList}
        }

        case DELETE_TASK: {
            return {...state, taskList: state.taskList.filter(item => item.id !== action.payload)}
        }

        case EDIT_TASK: {
            return {...state, taskEdit: action.payload}
        }

        case UPDATE_TASK: {
            if (action.payload.trim() === '') {
                alert('Task name is required!!!')
                return {...state, taskEdit: {id: '-1', taskName: '', status: false}}
            }
            let isTaskExits = state.taskList.findIndex(item => item.taskName === action.payload)
            if (isTaskExits !== -1) {
                alert('Task name already exits!!')
                return {...state, taskEdit: {id: '-1', taskName: '', status: false}}
            }
            state.taskEdit = {...state.taskEdit, taskName: action.payload}
            let newTaskList = state.taskList
            let index = newTaskList.findIndex(item => item.id === state.taskEdit.id)
            if (index !== -1) {
                newTaskList[index].taskName = state.taskEdit.taskName
            }
            return {...state, taskList: newTaskList, taskEdit: {id: '-1', taskName: '', status: false}}
        }
        default:
            return {...state}
    }
}

export default toDoReducer;