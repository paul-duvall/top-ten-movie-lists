<template>
  <div class="container">
    <div class="row text-center m-3">
        <h2>Add a new list</h2>
        <div class="card bg-light mt-4">
            <form class="m-3">
                <div class="form-group row">
                    <label for="title" class="col-2">List name</label>
                    <div class="input-group col">
                        <input
                            type="text"
                            id="title"
                            class="form-control"
                            v-model="newList.name"
                        >
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" @click="autoGenerateTitle()">
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
                        </div>
                    </div>
                    <small id="titleHelp" class="form-text text-muted">Need some inspiration for a list idea? Click the lightning bolt!</small>
                </div>
                <h3 class="mt-3">Films</h3>
                <div v-for="(item, index) in newList.items" class="form-group row mt-3">
                    <label
                        :for="'choice' + (index + 1)"
                        class="col-2"
                    >
                        {{ index + 1 }}
                    </label>
                    <input
                        type="text"
                        :id="'choice' + (index + 1)"
                        class="form-control col"
                        v-model="newList.items[index]"
                    >   
                </div>
                <div class="d-flex flex-row-reverse mt-2">
                    <a @click="addItem" class="add-list-add-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-plus-circle"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </a>
                </div>
                <div>
                    <button class="btn btn-danger" @click="$router.push({ name: 'home' })">Cancel</button>
                    <button class="btn btn-primary m-2" @click="handleSubmit">Add new list</button>
                </div>
            </form>
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

<style scoped>
  .add-list-add-icon {
      cursor: pointer;
}
</style>