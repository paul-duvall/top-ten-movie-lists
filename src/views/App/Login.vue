<template>
    <div class="container">
        <div class="row m-3 text-center d-flex justify-content-center">
            <div class="card bg-light mt-4 w-50">
                <h3 class="mt-3">Login</h3>
                <form class="m-3" @submit.prevent="handleSubmit">
                    <div class="form-group row">
                        <label for="title" class="col-2">Email</label>
                        <div class="input-group col">
                            <input
                                type="text"
                                id="title"
                                class="form-control"
                                v-model="email"
                            >
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label for="title" class="col-2">Password</label>
                        <div class="input-group col">
                            <input
                                type="password"
                                id="title"
                                class="form-control"
                                v-model="password"
                            >
                        </div>
                    </div>
                    <button class="btn btn-primary mt-3">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { db } from '@/firebase/config';

export default {
    name: 'Signup',

    setup() {
        let email = ref(null);
        let password = ref(null);
        const error = ref(null);

        const store = useStore();
        const router = useRouter();

        const handleSubmit = async () => {
      try {
         await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/');
        } catch (err) {
            error.value = err.message;
        } 
            console.log(email.value, password.value)
        }

        return { email, handleSubmit, password };
    }
}
</script>