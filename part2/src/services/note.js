import axios from 'axios';

const baseUrl = 'http://localhost:3005/notes';
let token = null;

const setToken = (newToken) => {
    token = `test ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const create = async newNoteObj => {
    const config = {
        headers: {
            Authorization: token
        },
    }
    const response = await axios.post(baseUrl, newNoteObj, config);
    return response.data;
}

const update = async (id, newNoteObj) => {
    const response = await axios.put(`${baseUrl}/${id}`, newNoteObj);
    return response.data;
}

export default {
    getAll,
    create,
    update,
    setToken
}