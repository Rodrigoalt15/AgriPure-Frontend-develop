import httpCommon from "@/core/services/http-common";

class PlantsApiService {
  findByName(name) {
    return httpCommon.get(`/plant/name/${name}`);
  }

  getAll() {
    return httpCommon.get("/plant");
  }

  getById(id) {
    return httpCommon.get(`/plant/${id}`);
  }

  create(plantData) {
    return httpCommon.post("/plant", plantData);
  }

  update(id, plantData) {
    return httpCommon.put(`/plant/${id}`, plantData);
  }

  delete(id) {
    return httpCommon.delete(`/plant/${id}`);
  }
}

export { PlantsApiService };
