import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import '../App.css';

export default combineReducers({
    todos,
    visibilityFilter
})