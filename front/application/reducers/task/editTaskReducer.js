import Task from 'application/entities/Task'
import apiService from 'application/services/apiService'

export const EDIT_TASK = 'EDIT_TASK'

const dependencies = { apiService }

const match = (action) => action.type === EDIT_TASK

const execute = ({ tasks }, { task: taskEdited }, injection) => {
  const tasksEntities = tasks.map((task) => task.id === taskEdited.id ? new Task(taskEdited) : task)
  return { tasks: [ ...tasksEntities ] }
}

export const editTask = (id, title, description, injection) => (dispatch) => {
  const { apiService } = Object.assign({}, dependencies, injection)
  return apiService('PUT', `task/update/${id}/${title}/${description}`)
    .then(() => dispatch({ type: EDIT_TASK, task: { id, title, description } }))
}

export default {
  match,
  execute
}
