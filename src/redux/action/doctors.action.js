import * as ActionTypes from '../ActionTypes';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytes
} from "firebase/storage";

import {
    db,
    storage
} from '../../firebase';

export const getDoctors = () => async (dispatch) => {
    try {
        dispatch(loadingDoctors());

        const querySnapshot = await getDocs(collection(db, "doctors"));

        let data = [];

        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            })
        });

        dispatch({
            type: ActionTypes.GET_DOCTORS,
            payload: data
        })
        console.log(data);

    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const addDoctor = (data) => async (dispatch) => {
    try {
        // dispatch(loadingDoctors());

        const doctorRef = ref(storage, 'doctors/' + data.file.name);

        uploadBytes(doctorRef, data.file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "doctors"), {
                            aptprice: data.aptprice,
                            degree: data.degree,
                            description: data.description,
                            name: data.name,
                            url: url
                        });
                        dispatch({
                            type: ActionTypes.ADD_DOCTORS, 
                            payload: {
                                id: docRef.id,
                                aptprice: data.aptprice,
                                degree: data.degree,
                                description: data.description,
                                name: data.name,
                                url: url
                            }
                        })
                    })
            });

        
        //      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
        dispatch(errorDoctors(error.message));
    }
}

export const deleteDoctors = (id) => async (dispatch) => {
    try {
        console.log(id);
        await deleteDoc(doc(db, "doctors", id));

        dispatch({
            type: ActionTypes.DELETE_DOCTORS,
            payload: id
        })
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const updateDoctors = (data) => async (dispatch) => {
    try {
        const doctorRef = doc(db, "doctors", data.id);

        await updateDoc(doctorRef, {
            aptprice: data.aptprice,
            degree: data.degree,
            description: data.description,
            name: data.name
        });

        dispatch({
            type: ActionTypes.UPDATE_DOCTORS,
            payload: data
        })
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const loadingDoctors = () => (dispatch) => {
    dispatch({
        type: ActionTypes.LOADING_DOCTORS
    })
}

export const errorDoctors = (error) => (dispatch) => {
    dispatch({
        type: ActionTypes.ERROR_DOCTORS,
        payload: error
    })
}