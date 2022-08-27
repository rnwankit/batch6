import * as ActionTypes from '../ActionTypes';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { configureStore } from '../store';


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

        const fileId = (Math.floor(Math.random() * 1000000) + 1).toString();

        const imagesRef = ref(storage, 'doctors/' + fileId);

        await uploadBytes(imagesRef, data.file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then(async (url) => {
                    let addData = {
                        name: data.name,
                        aptprice: data.aptprice,
                        degree: data.degree,
                        description: data.description,
                        url: url,
                        fileId: fileId
                    }
                    const docRef = await addDoc(collection(db, "doctors"), addData);

                    dispatch({ type: ActionTypes.ADD_DOCTORS, payload: { did: docRef.id, ...addData } })
                })
        });
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const deleteDoctors = (data) => async (dispatch) => {
    console.log(data);
    try {
        const doctorsRef = ref(storage, 'doctors/' + data.fileId);
        deleteObject(doctorsRef).then(async () => {
            console.log("Deleted");

            await deleteDoc(doc(db, "doctors", data.did));

            dispatch({ type: ActionTypes.DELETE_DOCTORS, payload: data.did })
        }).catch((error) => {
            console.log(error);
        });


    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const updateDoctors = (data) => async (dispatch) => {
    try {
        const fileId = (Math.floor(Math.random() * 1000000) + 1).toString();
        const doctorRef = doc(db, "doctors", data.did);
        const doctorsRefImgDel = ref(storage, 'doctors/' + data.fileId);
        const doctorsRefImgIns = ref(storage, 'doctors/' + fileId);

        // let { store } = configureStore();

        // // if (store.getState().doctors.doctors.fileId !== data.fileId) {

        // // }

        //console.log(store.getState().doctors, data.fileId);

        await deleteObject(doctorsRefImgDel).then(async () => {
            await uploadBytes(doctorsRefImgIns, data.file).then(async (snapshot) => {
                await getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        let uData = {
                            name: data.name,
                            aptprice: data.aptprice,
                            degree: data.degree,
                            description: data.description,
                            fileId: fileId,
                            url: url,
                        }
    
                        await updateDoc(doctorRef, uData)
                            .then(() => {
                                console.log("Updated", uData);
                                dispatch({ type: ActionTypes.UPDATE_DOCTORS, payload: {did: data.did, ...uData} })
                            })  
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }).catch((error) => {
            console.log(error);
        });


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