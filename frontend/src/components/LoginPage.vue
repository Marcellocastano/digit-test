<template>
    <div class="login-page container mt-5">
        <h1 class="text-center mb-4">Accedi</h1>
        <form @submit.prevent="login" class="needs-validation" novalidate>
            <div class="form-group">
                <input
                    v-model="username"
                    type="text"
                    class="form-control mb-2"
                    placeholder="Nome utente"
                    required
                />
            </div>
            <div class="form-group">
                <input
                    v-model="password"
                    type="password"
                    class="form-control mb-4"
                    placeholder="Password"
                    required
                />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
        <p v-if="error" class="error text-danger mt-3 text-center">{{ error }}</p>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from "axios"
import { useRouter } from 'vue-router'

export default {
    name: 'LoginPage',
    setup() {
        const username = ref('')
        const password = ref('')
        const error = ref('')
        const router = useRouter()

        const login = async () => {
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    username: username.value,
                    password: password.value,
                })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', username.value)
                router.push('/welcome')
            } catch (err) {
                error.value = 'Credenziali non valide'
            }
        }

        return {
            username,
            password,
            error,
            login,
        }
    },
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
}

.error {
  color: red;
}
</style>
