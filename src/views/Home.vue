<template>
  <div class="container">
    <div class="row text-center g-4 d-flex flex-row mt-2">
      <button
                @click="$router.push({ name: 'add' })"
                class="btn btn-primary"
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
                    class="feather feather-plus">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add a list
            </button>
    </div>
    <div class="row text-center g-4 d-flex flex-row">
      <div v-for="list in lists" class="col-12 col-sm-6 col-md-4">
        <div class="card bg-primary text-white mt-4">
          <div class="card-header">{{ list.name }}</div>
          <div class="card-body text-left">
            <div v-for="(item, index) in list.items">
              <div>{{ index + 1 }}. {{ item }}</div>
            </div>
            <button
                @click="$router.push({ name: 'edit', params: { id: list.id } })"
                class="btn btn-light mt-2"
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

  .feather-edit {
    margin-left: 0.5rem;
    width: 1.1rem;
}

</style>