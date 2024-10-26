<template>
    <div class="header d-flex justify-content-end align-items-center p-2">
        <span class="me-3">{{ username }}</span>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'Header',
    setup() {
        const username = ref(localStorage.getItem('username') || 'Utente')
        const router = useRouter()

        const logout = () => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            router.push('/login')
        }

        return {
            username,
            logout,
        }
    },
}
</script>

<style scoped>
.header {
    background-color: #c5e6d6;
    border-bottom: 1px solid #dee2e6;
}
</style>

