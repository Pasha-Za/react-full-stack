import axios from 'axios';

const baseUrl = 'http://localhost:3005/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data
}

const create = async (content) => {
    const body = {
        content,
        votes: 0
    };

    const response = await axios.post(baseUrl, body);
    return response.data;
}

export default {
    getAll,
    create
};