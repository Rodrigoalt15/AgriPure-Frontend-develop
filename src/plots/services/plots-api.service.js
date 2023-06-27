import httpCommon from "@/core/services/http-common";

export class PlotsApiService {
  getAll() {
    return httpCommon.get("/plots");
  }
  getById(id) {
    return httpCommon.get(`/plots/${id}`);
  }
  findByName(name) {
    return httpCommon.get(`/plots?name=${name}`);
  }
  create(data) {
    return httpCommon.post('/plots', data);
  }
  update(id, data) {
    return httpCommon.put(`/plots/${id}`, data);
  }
  delete(id) {
    return httpCommon.delete(`/plots/${id}`);
  }
}
