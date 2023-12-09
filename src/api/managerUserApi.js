import clientAxios from "./clientAxios";

const managerUserApi = {
  getAll: () => clientAxios.get('user/getAll'),
  get: (id) => clientAxios.get(`user/get/${id}`, id),
  create: (data) => clientAxios.post('user/create', data),
  update: (id, data) => clientAxios.put(`user/update/${id}`, data),
  delete: (id) => clientAxios.delete(`user/delete/${id}`, id),
};

export default managerUserApi;