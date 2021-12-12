import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

const addList = (newList) => {
    const listCollectionRef = collection(db, 'lists');

    addDoc(listCollectionRef, newList)
        .then(() => {
            console.log('whoop whoop');
        });

    return { addDoc }
};

export default addList;