// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
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