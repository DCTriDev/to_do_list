import React, {Component} from 'react';
import background from '../assets/img/background.jpg';
import {connect} from "react-redux";
import {addTaskAction, deleteTask, doneTaskAction, editTask, undoTaskAction, updateTask} from "../redux/actions/ToDoListAction";

class ToDoList extends Component {
    state = {
        taskName: '',
        status: false,
        disabled: true
    }

    handleAddTask = () => {
        let newState = {...this.state}
        this.setState({taskName: ''}, () => {
            this.props.dispatch(addTaskAction(newState))
        })
    }

    handleEditTask = (item) => {
        this.setState({
            disabled: false
        }, () => {
            this.props.dispatch(editTask(item))
        })
    }

    handleDeleteTask = (id) => {
        this.props.dispatch(deleteTask(id))
    }

    handleDoneTask = (id) => {
        this.props.dispatch(doneTaskAction(id))
    }

    handleUndoTask = (id) => {
        this.props.dispatch(undoTaskAction(id))
    }

    handleUpdateTask = () => {
        let {taskName}= this.state
        this.setState({
            disabled: true,
            taskName: ''
        }, () => {
            this.props.dispatch(updateTask(taskName))
        })
    }

    renderTaskToDo = () => {
        return this.props.taskList.filter(item => !item.status).map((item, key) => {
            return (
                <tr key={key}>
                    <td className='d-flex align-items-baseline'>
                        {/*Done button*/}
                        <button className="btn btn-light rounded-circle mr-2 hover-status"
                                onClick={() => {
                                    this.handleDoneTask(item.id)
                                }}>
                            <i className="fa fa-circle not-hover text-light"/>
                            <i className="fa fa-check on-hover text-success"/>
                        </button>
                        <span className=''>{item.taskName}</span>
                        {/*Edit button*/}
                        <button className="btn btn-warning rounded-pill ml-auto mr-2"
                                onClick={() => {
                                    this.handleEditTask(item)
                                }}>
                            <i className="fa fa-edit mr-2"/>Edit
                        </button>
                        {/*Delete button*/}
                        <button className="btn btn-danger rounded-pill"
                                onClick={() => {
                                    this.handleDeleteTask(item.id)
                                }}>
                            <i className="fa fa-trash mr-2"/>Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTaskComplete = () => {
        return this.props.taskList.filter(item => item.status).map((item, key) => {
            return (
                <tr key={key}>
                    <td className='d-flex align-items-baseline'>
                        {/*Undo button*/}
                        <button className="btn btn-light text-success rounded-circle mr-2 hover-status"
                                onClick={() => {
                                    this.handleUndoTask(item.id)
                                }}>
                            <i className="fa fa-check not-hover"/>
                            <i className="fa fa-undo on-hover"/>
                        </button>
                        <span className=''>{item.taskName}</span>
                        {/*Delete button*/}
                        <button className="btn btn-danger rounded-pill ml-auto mr-2"
                                onClick={() => {
                                    this.handleDeleteTask(item.id)
                                }}>
                            <i className="fa fa-delete mr-2"/>Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (<div className='py-3' style={{
            background: `url("${background}") no-repeat`,
            backgroundSize: "cover",
            minWidth: '100vw',
            minHeight: '100vh'
        }}>
            <div className="w-50 border border-info rounded mx-auto p-4">
                <h1 className='text-primary font-weight-bold display-4 mb-5 text-center'>To Do List</h1>
                <div className="d-flex align-content-center justify-content-center mb-3">
                    <input value={this.state.taskName} type="text" className="form-control mr-2 rounded-pill"
                           placeholder="Enter your task"
                           onChange={(event) => {
                               this.setState({
                                   taskName: event.target.value
                               })
                           }}/>
                    {/*Add button*/}
                    {(!this.state.disabled) ? (
                        <button disabled className="btn btn-success rounded-pill mr-2" >
                            <i className="fa fa-plus mr-2"/>Add
                        </button>) : (
                        <button className="btn btn-success rounded-pill mr-2" onClick={() => {
                            this.handleAddTask()
                        }}><i className="fa fa-plus mr-2"/>Add
                        </button>
                    )}
                    {/*Update button*/}
                    {this.state.disabled ? (
                        <button disabled className="btn btn-primary rounded-pill">
                            <i className="fa fa-sync mr-2"/>Update
                        </button>) : (
                        <button className="btn btn-primary rounded-pill"
                                onClick={() => {
                                    this.handleUpdateTask()
                                }}>
                            <i className="fa fa-sync mr-2"/>Update
                        </button>)}
                </div>
                <h2 className='text-danger ml-5'>Task To Do</h2>
                {/*Render task to do*/}
                <table className='table'>
                    <tbody>
                        {this.renderTaskToDo()}
                    </tbody>
                </table>
                <h2 className='text-success ml-5'>Task Complete</h2>
                {/*Render task complete*/}
                <table className='table'>
                    <tbody>
                        {this.renderTaskComplete()}
                    </tbody>
                </table>
            </div>
        </div>);
    }

    //Re-render while change taskName input value
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.taskEdit.taskName !== this.props.taskEdit.taskName) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        taskList: rootReducer.toDoReducer.taskList,
        taskEdit: rootReducer.toDoReducer.taskEdit
    }
}

export default connect(mapStateToProps)(ToDoList);