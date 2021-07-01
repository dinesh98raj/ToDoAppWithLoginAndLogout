import axios from "axios";

const BaseURL = "http://localhost:8080/api/";


export const getAuthenticationToken = (Usercredentials) => {
    return axios.post(BaseURL+"authenticate",Usercredentials);
}

export const getListOfTask = (token) => {
    console.log(token);
    return axios.create({headers:{'Authorization':`Bearer ${token}`}})
    .get(BaseURL+"gettasks");
}

export const createTask = (token, newTask) => {
    return axios.create({headers:{'Authorization':`Bearer ${token}`}})
    .post(BaseURL+"addtask", newTask);
}

export const editTask = (token, id, editedTask) => {
    return axios.create({headers:{'Authorization':`Bearer ${token}`}})
    .put(BaseURL+"editTask/"+id, editedTask);
}

export const deleteTask = (token, id) => {
    return axios.create({headers:{'Authorization':`Bearer ${token}`}})
    .delete(BaseURL+"deletetask/"+id);
}

export const updateStatus = (token, id) => {
    return axios.create({headers:{'Authorization':`Bearer ${token}`}})
    .put(BaseURL+"updateStatus/"+id);
}