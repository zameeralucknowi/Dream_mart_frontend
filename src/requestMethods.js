import axios from "axios";

const BASE_URL = 'https://dream-mart-backend.onrender.com/api/';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzdhZWMzOTIyNDcxNjc2ZmI4NjBlZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNDg3NDM5OSwiZXhwIjoxNzI1MTMzNTk5fQ.a1oACQy5-uqN8XVib-igf9nlvFnZVo4tc6qed2yy7IY";

export const publicRequest = axios.create({
    baseURL : BASE_URL
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : { token : `Bearer ${TOKEN}`}
})