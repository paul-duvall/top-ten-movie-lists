<template>
    <div class="container">
        <div class="row text-center m-3">
            <h2>Edit your list</h2>
        </div>
        <div class="row d-flex">
            <div class="col-sm-8 mx-auto">
                <div class="card bg-light mt-4 p-3">
                    <form class="m-3">
                        <div class="form-group row">
                            <div v-if="!allowNameEdit" class="edit-list-title-container">
                                <h3>{{ list.name }}</h3>
                                <span
                                    class="d-inline edit-list-title-icon"
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
                                </span>
                            </div>
                            <div v-else class="input-group col">
                                <label for="title" class="col-2">List name</label>
                                <input
                                    id="title"
                                    type="text"
                                    class="form-control"
                                    v-model="list.name"
                                >
                            </div>
                        </div>
                        <h3 class="mt-3">Films</h3>
                        <div
                            v-for="(item, index) in list.items"
                            class="form-group row mt-3"
                        >
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
                                v-model="list.items[index]"
                            >   
                        </div>
                        <div class="d-flex justify-content-center mt-2">
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
                        <div class="row mt-3">
                            <div class="col-6">
                                <button class="btn btn-primary ms-3" @click="$router.push({ name: 'home' })">Cancel</button>
                            </div>
                            <div class="col-6 d-flex justify-content-end">
                                <button class="btn btn-danger" @click="deleteList">Delete list</button>
                                <button class="btn btn-primary ms-3" @click="handleSubmit">Update list</button>
                            </div>                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
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

.edit-list-title-icon {
    position: relative;
}

.edit-list-title-icon {
    position: absolute;
    top: 1rem;
    left: 11rem;
}

.add-list-add-icon {
    color: #292b2c;
    cursor: pointer;
}
</style>