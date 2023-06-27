import httpCommon from "@/core/services/http-common";

class AuthApiService {
  signIn(authData) {
    return httpCommon.post("/users/sign-in", authData).then((response) => {
      const { id, firstName, lastName, username, token } = response.data;
      const userData = { id, firstName, lastName, username };
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", token);
      return response;
    });
  }
  signUp(registerData) {
    return httpCommon.post("/users/sign-up", registerData);
  }

  getAllUsers() {
    return httpCommon.get("/users");
  }

  getUserById(id) {
    return httpCommon.get(`/users/${id}`);
  }

  updateUser(id, updateData) {
    return httpCommon.put(`/users/${id}`, updateData);
  }

  deleteUser(id) {
    return httpCommon.delete(`/users/${id}`);
  }

  addPlantToCollection(userId, plantId) {
    return httpCommon.post(`/users/${userId}/plants/${plantId}`);
  }

  removePlantFromCollection(userId, plantId) {
    return httpCommon.delete(`/users/${userId}/plants/${plantId}`);
  }

  getSavedPlantsByUserId(userId) {
    return httpCommon.get(`/users/${userId}/plants`);
  }
}

export default new AuthApiService();
