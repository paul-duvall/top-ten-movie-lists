<template>
    <h2>Add a new list</h2>
    <form>
      List name
      <input
        type="text"
        v-model="newList.name"
      >
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

        return { newList, handleSubmit, addItem };
    }
}
</script>