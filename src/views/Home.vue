<template>
  <nav class="navbar bg-dark">
    <div class="container">
      <h1 class="navbar-brand text-light">Top Ten Movies</h1>
      <button @click="$router.push({ name: 'add' })" class="btn btn-light">Add a list</button>
    </div>
  </nav>
  <div class="container">
    <div class="row text-center g-4 d-flex flex-row">
      <div v-for="list in lists" class="col-12 col-sm-6 col-md-4">
        <div class="card bg-primary text-white mt-4">
          <div v-rainbow class="card-header">{{ list.name }}</div>
          <div class="card-body text-left">
            <div v-for="(item, index) in list.items">
              <div>{{ index + 1 }}. {{ item }}</div>
            </div>
            <button @click="$router.push({ name: 'edit', params: { id: list.id } })" class="btn btn-light mt-2">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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