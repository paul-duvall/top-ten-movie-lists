<template>
  <div>
    <div v-for="list in lists">
      {{ list.name }}
    </div>
    <form>
      <input
        type="text"
        v-model="newList.name"
        @keypress.enter.prevent="handleSubmit"
      >
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import addList from '../composables/addList';

export default {
  name: 'Home',
  setup() {
    const listsRef = collection(db, 'lists');
    // const { addDoc } = addList;
    
    let lists = ref([]);
    let newList = ref({
      name: null
    });

    // get real time collection data
    onSnapshot(listsRef, (snapshot) => {
        snapshot.docs.forEach(doc => {
            lists.value.push({
                ...doc.data(),
                id: doc.id
            });
        });     
    });

    const handleSubmit = async () => {

      await addDoc(listsRef, {
        name: newList.value.name
      }).then (() => {
        console.log('job done mate');
      });
    }

    return { lists, newList, handleSubmit };
  }
}
</script>
