import anecdoteService from '../services/anecdotes';

export const addNewNote = (data) => {
  return async dispatch => {
    const newNote = await anecdoteService.create(data);
    dispatch({
      type: "ADD_NOTE",
      data: newNote
    })
    return newNote.content
  }
};
export const updateVote = (id) => {
  return {
    type: "VOTE_NOTE",
    id
  }
}
export const initNotes = () => {  
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_NOTE",
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {  
  if (action.type === 'ADD_NOTE') {    
    return [...state, {
      ...action.data
    }]
  } else if (action.type === 'VOTE_NOTE') {
    const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.id);
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    }
    const sortedArray = state.map(anecdote => anecdote.id === action.id ? updatedAnecdote : anecdote).sort((a, b) => b.votes - a.votes);
    
    return [...sortedArray]
  } else if (action.type === 'INIT_NOTE') {
    console.log(action);
    return [...state, ...action.data]
  }

  return state
}

export default anecdoteReducer