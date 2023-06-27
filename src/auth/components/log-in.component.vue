<script>
import { defineComponent, ref , reactive } from 'vue';
import authApiService from "@/auth/services/auth-api.service";
import router from "@/router";

export default defineComponent({
    name: 'login-view',
    setup() {
        const form = reactive({
            username: '',
            password: ''
        });
        const errorMessage = ref('');

        const loginUser = async () => {
            const loginData = {
                username: form.username,
                password: form.password
            };

            try {
                await authApiService.signIn(loginData);
                router.push('/');
            } catch (error) {
                errorMessage.value = error.response.data.message;
            }
        };

        return {
            form,
            errorMessage,
            loginUser
        };
    }
});
</script>

<template>
  <div class="bg-container">
    <div class="form-container">
      <pv-card>
          <template #header>
            <div class="header">
              <div class="logo-container">
                <img class="logo" src="src/assets/logo.png" alt="logo">
                <span>AgriPure</span>
              </div>
            </div>
          </template>

          <template #content>
            <div class="content">
              <div class="btn-container">
                <RouterLink to="/login">
                    <pv-button text raised>Log in</pv-button>
                </RouterLink>
                <RouterLink to="/register">
                    <pv-button text raised>Sign up</pv-button>
                </RouterLink>
              </div>
                <form @submit.prevent="loginUser">
                    <br>
                    <pv-inputText type="text" v-model="form.username" placeholder="Username" />
                    <br>
                    <pv-inputText type="password" v-model="form.password" placeholder="Password" />
                    <br>
                    <pv-button type="submit" raised>Submit</pv-button>
                </form>
            </div>
          </template>
      </pv-card>
    </div>
  </div>
</template>
<style scoped>
.bg-container {
  width: 100%;
  height: 100vh;
  background-color: rgb(44, 43, 43);
  display: grid;
}

.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3rem 0;
  justify-self: center;
  align-self: center;
}

.p-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  max-width: 30rem;
  margin: 0 1rem;
  padding: 2rem 0;
  border-radius:20px;
  background-color: rgb(63, 63, 63);
  color:white;
  
}

.header {
  flex-direction: column;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo-container img {
  width: 6rem;
  border-radius: 9999px;
}

.logo-container span {
  margin-left: 1rem;
  font-size: 3.5rem;
  line-height: 1;
}

.content {
  margin: 0 2rem;
}

.content form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.content form button[type=submit] {
  background: rgb(47, 153, 47);
  border-color: rgb(47, 153, 47);
  justify-content: center;
  margin-top: 1rem;
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 53, 53);
  margin: 0 0 1rem;
  padding: .25rem;
  border-radius: 6px;
}

.btn-container .p-button {
  width: 100%;
  color:white;
  justify-content: center;
}

.btn-container .p-button.active {
  background: rgb(47, 153, 47);
}

.btn-container > * + * {
  margin-left: .25rem;
}

@media (max-width: 599.98px) {
  card {
    padding: 1rem 0;
  }

  .content {
    margin: 1rem;
  }

  .logo-container {
    flex-direction: column;
  }

  .logo-container span {
    margin-top: 1rem;
    margin-left: 0;
    font-size: 2.5rem;
  }
}

</style>
