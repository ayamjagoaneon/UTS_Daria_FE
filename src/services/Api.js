import axios from "axios";

export const getAllProyek = () => {
    return axios.get('http://localhost:3001/proyek')
    .then(response => response)
}

export const postProyek = async (a) => {
    try {
      const response = await axios.post('http://localhost:3001/proyek/create', a);
      return response;
    } catch (error) {
      throw error;
    }
  };

export const updateProyek = async (data, id) => {
    return await axios.put(`http://localhost:3001/proyek/update/` + id, data)
    .then(res => res.data)
}

export const deleteProyek = async (id) => {
    return await axios.delete(`http://localhost:3001/proyek/delete/${id}`)
    .then(res => res.data)
}