<template>
    <h2>Edit list</h2>
    <form action="">
        <h3>{{ list.name }}</h3>
       Films
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

        const docRef = doc(db, 'lists', id);

        const handleSubmit = async () => {
            await updateDoc(docRef, {
                items: list.value.items
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

        return { addItem, deleteList, handleSubmit, list }
    }
}
</script>