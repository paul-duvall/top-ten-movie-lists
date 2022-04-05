<template>
    <h2>Edit list</h2>
    <form action="">
        <div class="d-flex">
            <h3 v-if="!allowNameEdit">{{ list.name }}</h3>
            <input v-else type="text" v-model="list.name">
            <div
                v-if="!allowNameEdit"
                class="d-inline"
                @click="updateAllowNameEdit"
                title="Edit list title"
            >
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
                    class="feather feather-edit">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
               </svg>
            </div>
        </div>
       <h4>Films</h4>
        <div v-for="(item, index) in list.items">
        {{ index + 1 }}
        <input type="text" v-model="list.items[index]" >   
        </div>
        <button @click="addItem">Add film</button>
    </form>
    <button @click="handleSubmit">Update list</button>
    <button @click="$router.push({ name: 'home' })">Cancel</button>
    <button @click="deleteList">Delete list</button>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { addDoc, collection, query, where, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useToast } from "vue-toastification";

export default {
    name: 'EditList',

    setup() {
        const router = useRouter();
        const route = useRoute()
        const toast = useToast();

        const id = route.params.id;
        const list = ref({});
        const allowNameEdit = ref(false);
        const thing = ref('bunny');

        const docRef = doc(db, 'lists', id);
        const handleSubmit = async () => {
            await updateDoc(docRef, {
                items: list.value.items,
                name: list.value.name
            }).then (() => {
                toast.success("You have successfully updated your list: " + list.value.name, 
                    { timeout: 3000 }
                );
                router.push({ name: 'home' });
            }).catch ((error) => {
                toast.error("There was a problem with your submission. Please try again.", 
                    { timeout: 3000 }
                );
            });
        }

        const deleteList = async () => {
            await deleteDoc(docRef)
            .then (() => {
                toast.success("You have successfully deleted your list: " + list.value.name, 
                    { timeout: 3000 }
                );
                router.push({ name: 'home' });
            }).catch ((error) => {
                toast.error("There was a problem with your submission. Please try again.", 
                    { timeout: 3000 }
                );
            });
        }

        getDoc(docRef)
            .then((doc) => {
                list.value = doc.data();
            });
        
        const addItem = () => {
            list.value.items.push('');
        }

        const updateAllowNameEdit = () => {
            allowNameEdit.value = true;
        }

        return { addItem, allowNameEdit, deleteList, updateAllowNameEdit, handleSubmit, list }
    }
}
</script>

<style scoped>
.feather-edit {
    margin-left: 0.5rem;
    width: 1.1rem;
}
.feather-edit:hover {
    cursor: pointer;
}
</style>