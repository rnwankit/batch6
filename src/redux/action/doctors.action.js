import * as ActionTypes from '../ActionTypes';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getDoctors = () => async (dispatch) => {
    try {
        dispatch(loadingDoctors());

        const querySnapshot = await getDocs(collection(db, "doctors"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ did: doc.id, ...doc.data() })
        });

        console.log(data);

        dispatch({ type: ActionTypes.GET_DOCTORS, payload: data })

    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const addDoctor = (data) => async (dispatch) => {
    try {
        dispatch(loadingDoctors());

        const imagesRef = ref(storage, 'doctors/' + data.file.name);

        await uploadBytes(imagesRef, data.file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then(async (url) => {
                    const docRef = await addDoc(collection(db, "doctors"), {
                        name: data.name,
                        aptprice: data.aptprice,
                        degree: data.degree,
                        description: data.description,
                        url: url
                    });
            
                    dispatch({ type: ActionTypes.ADD_DOCTORS, payload: { did: docRef.id, name: data.name,
                        aptprice: data.aptprice,
                        degree: data.degree,
                        description: data.description,
                        url: url } })
                })
        });
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const deleteDoctors = (docid) => async (dispatch) => {
    console.log(docid);
    try {
        await deleteDoc(doc(db, "doctors", docid));

        dispatch({ type: ActionTypes.DELETE_DOCTORS, payload: docid })
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const updateDoctors = (data) => async (dispatch) => {
    try {
        const doctorRef = doc(db, "doctors", data.did);

        await updateDoc(doctorRef, {
            name: data.name,
            aptprice: data.aptprice,
            degree: data.degree,
            description: data.description
        });

        dispatch({ type: ActionTypes.UPDATE_DOCTORS, payload: data })
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const loadingDoctors = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_DOCTORS })
}

export const errorDoctors = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_DOCTORS, payload: error })
}