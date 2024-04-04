'use server';

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from '@firebase/firestore';
import { revalidatePath } from 'next/cache';

import { db } from '../config/firebase';

export async function getPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error getting posts: ', error);

        return [];
    }
}

export async function addPost(data) {
    try {
        const docRef = await addDoc(collection(db, 'posts'), data);
        console.log('Post created with ID: ', docRef.id);

        revalidatePath('/');

        return docRef.id;
    } catch (error) {
        console.error('Error creating post: ', error);

        return null;
    }
}

export async function updatePost(id, data) {
    try {
        await updateDoc(doc(db, 'posts', id), data);
        console.log('Post updated with ID: ', id);
        revalidatePath('/');
        return id;
    } catch (error) {
        console.error('Error updating post: ', error);
        return null;
    }
}

export async function deletePost(id) {
    try {
        await deleteDoc(doc(db, 'posts', id));
        console.log('Post deleted with ID: ', id);

        revalidatePath('/');

        return id;
    } catch (error) {
        console.error('Error deleting post: ', error);

        return null;
    }
}
