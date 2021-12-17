<template>
  <h1>Movie Lists</h1>
  <div>
    <div v-for="list in lists" class="lists-container">
      <div class="list-card">
        <h3>{{ list.name }}</h3>
        <div v-for="(item, index) in list.items">
          <div>{{ index + 1 }}. {{ item }}</div>
        </div>
      </div>
    </div>
  </div>
  <button @click="$router.push({ name: 'add' })">Add a list</button>
</template>

// Jobs
// - Form validation? Mustn't submit without name + at least one list item
// - pre-submit clean-up - remove blank items from items array

<script>
// @ is an alias to /src
import { ref } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import addList from '../composables/addList';

export default {
  name: 'Home',
  setup() {
    const listsRef = collection(db, 'lists');
    
    let lists = ref([]);

    // get real time collection data
    onSnapshot(listsRef, (snapshot) => {
        snapshot.docs.forEach(doc => {
            lists.value.push({
                ...doc.data(),
                id: doc.id
            });
        });     
    });

    return { lists };
  }
}
</script>

<style scoped>
  .lists-container {
    display: flex;  
  }

  .list-card {
    border: 1px solid green;
    margin: 10px;
    padding: 10px;
  }
</style>