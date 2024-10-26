<template>
    <div>
        <Header />
        <div class="welcome-page container mt-5">
            <h1 class="text-center mb-4">{{ message }}!</h1>
            <div class="flex justify-content-center">
                <h3>Progetto realizzato con:</h3>
                <div class="img-container text-center">
                    <img src="./../assets/vue.png" alt="vue" class="img-small">
                    <img src="./../assets/nodejs.png" alt="nodejs" class="img-small">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Header from './Header.vue'

export default {
    name: 'WelcomePage',
    components: {
        Header,
    },
    setup() {
        const message = ref('')
        const router = useRouter()

        const getWelcomeMessage = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3000/welcome', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                message.value = response.data.message
            } catch (error) {
                router.push('/login')
            }
        }

        onMounted(() => {
            getWelcomeMessage()
        })

        return {
            message,
        }
    },
};
</script>

<style scoped>
.welcome-page {
    max-width: 600px;
    margin: 0 auto;
}

.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35px;
}

.img-container {
    display: flex;
    justify-content: center;
}

.img-small {
    width: 70px;
    height: auto;
    margin: 0 10px;
}
</style>
