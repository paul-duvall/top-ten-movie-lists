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
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
    name: 'AddList',

    setup() {
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
                console.log('job done mate');
            });
        }

        const addItem = () => {
            newList.value.items.push('');
        }

        return { newList, handleSubmit, addItem };
    }
}
</script>