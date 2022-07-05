<template>
    <nav class="navbar bg-dark">
        <div class="container">
            <router-link to="/" class="text-decoration-none">
                <h1 class="navbar-brand text-light">Your Film Lists</h1>
            </router-link>
            <template v-if="authIsReady">
                <div v-if="!user">
                    <router-link to="/signup" class="header-link">Signup</router-link>
                    <router-link to="/login" class="header-link">Login</router-link>
                </div>
                <div v-else style="color: white;">
                    {{ user.email }}
                    <button class="btn btn-primary" @click="logout">Logout</button>
                </div>
            </template>        
        </div>
    </nav>
</template>

<style>
.header-link {
    margin-left: 1rem;
    color: white;
    text-decoration: none;
}

.header-link:hover {
    color: rgb(204, 204, 204);
}

.header-logout {
    color: white;
border: 2px solid red;
}
</style>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'Header',

    setup() {
        // inialise Firebase auth
        const auth = getAuth();

        const store = useStore();

        const logout = () => {
            store.dispatch('logout')
        }

         const unsub = onAuthStateChanged(auth, (user) => {
            store.commit('setAuthIsReady', true)
            store.commit('setUser', user)
            unsub()
        });

        return {
            logout,
            user: computed(() => store.state.user),
            authIsReady: computed(() => store.state.authIsReady)
        }
    }  
}
</script>