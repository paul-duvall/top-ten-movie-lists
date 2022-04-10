<template>
  <div class="container">
    <div class="row text-center g-4 mt-2">
        <h2>Add a new list</h2>
        <div class="card bg-light mt-4">
            <form>
                List name
                <input
                type="text"
                v-model="newList.name"
                >
                <button @click="autoGenerateTitle()" title="Auto-generate a list title">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-zap"
                    >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                </button>
                <br>
                Films
                <div v-for="(item, index) in newList.items">
                {{ index + 1 }}
                <input
                type="text"
                v-model="newList.items[index]"
                >   
                </div>
                <button @click="addItem">Add film</button>
            </form>
            <button @click="handleSubmit">Add new list</button>
            <button @click="$router.push({ name: 'home' })">Cancel</button>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useToast } from "vue-toastification";

export default {
    name: 'AddList',

    setup() {
        const router = useRouter();
        const toast = useToast();

        const listsRef = collection(db, 'lists');

        let newList = ref({
        items: [''],
        name: null
        });

        let listTitles = ref([
            'Favourite films of all time',
            'Science Fiction films',
            'Funniest Films',
            'Films with animals in',
            'Scariest horror films',
            'Favourite films from the 80s',
            'Favourite films from the 90s',
            'Favourite directors',
            'Best remakes',
            'Post-apocalyptic films',
            'Animated films',
            'Films that had a big influence on you',
            'Films you watched multiple times as a child',
            'Best film soundtracks'
        ]);

        const handleSubmit = async () => {
            await addDoc(listsRef, {
                items: newList.value.items,
                name: newList.value.name
            }).then (() => {
                toast.success("You have successfully added your new list: " + newList.value.name, 
                    { timeout: 3000 }
                );
                router.push({ name: 'home' });
            }).catch ((error) => {
                toast.error("There was a problem with your submission. Please try again.", 
                    { timeout: 3000 }
                );
            });
        }

        const addItem = () => {
            newList.value.items.push('');
        }

        const autoGenerateTitle = () => {
            let randomNumber = Math.floor(Math.random() * listTitles.value.length);
            newList.value.name = listTitles.value[randomNumber];
        }

        return { newList, handleSubmit, addItem, autoGenerateTitle };
    }
}
</script>