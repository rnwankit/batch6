import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Formik, Form, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor, deleteDoctors, getDoctors, updateDoctors } from '../../redux/action/doctors.action';

function Doctors(props) {
    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);
    const [filterData, setFilterData] = useState([]);

    const dispatch = useDispatch();

    const m = useSelector(state => state.counter);
    const doctors = useSelector(state => state.doctors);

    const [data, setData] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please enter name"),
        aptprice: yup.number().required("Please enter appointment price").positive().integer(),
        degree: yup.string().required("Please enter degree"),
        description: yup.string().required("Please enter description")
    });

    const handleInsert = (values) => {
        dispatch(addDoctor(values))

        // const localData = JSON.parse(localStorage.getItem("doctors"));

        // if (localData === null) {
        //     localStorage.setItem("doctors", JSON.stringify([data]));
        // } else {
        //     localData.push(data)
        //     localStorage.setItem("doctors", JSON.stringify(localData))
        // }

        loadData();
        handleClose();
        formikObj.resetForm();
    }

    const handeUpdateData = (values) => {
        // let localData = JSON.parse(localStorage.getItem("doctors"));

        // let uData = localData.map((l) => {
        //     if (l.id === values.id) {
        //         return values
        //     } else {
        //         return l
        //     }
        // });

        // localStorage.setItem("doctors", JSON.stringify(uData))

        dispatch(updateDoctors(values))

        handleClose();
        setUpdate(false);
        formikObj.resetForm();
        loadData();
    }

    const formikObj = useFormik({
        initialValues: {
            name: '',
            aptprice: '',
            degree: '',
            description: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handeUpdateData(values)
            } else {
                handleInsert(values)
            }
        },
    });

    const handleDelete = () => {
        // const localData = JSON.parse(localStorage.getItem("doctors"));

        // let fData = localData.filter((l) => l.id !== did);

        // localStorage.setItem("doctors", JSON.stringify(fData));

        dispatch(deleteDoctors(did))

        handleClose();
        setDid(0);
        loadData();
    }

    const handleEdit = (params) => {
        handleClickOpen();

        setUpdate(true);

        formikObj.setValues(params.row)
    }

    const columns = [
        { field: 'name', headerName: 'id', width: 130 },
        { field: 'aptprice', headerName: 'Appointment Price', width: 130 },
        { field: 'degree', headerName: 'Degree', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.row.did) }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("doctors"));

        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(
        () => {
            dispatch(getDoctors())
            // loadData();
        },
        [])

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formikObj

    console.log(errors);

    const handleSearch = (val) => {

        let localData = JSON.parse(localStorage.getItem("doctors"));

        let fData = localData.filter((l) => (
            l.name.toLowerCase().includes(val.toLowerCase()) ||
            l.aptprice.toString().includes(val) ||
            l.degree.toString().includes(val) ||
            l.description.toString().includes(val)
        ));

        setFilterData(fData)
        //console.log(fData);
    }

    const finalData = filterData.length > 0 ? filterData : data

    console.log(doctors);
    return (
        <div>
            <h1>Doctors</h1>
            {
                doctors.isLoading ?
                    <p>Loading....</p>
                    :
                    doctors.error != '' ?
                        <p>{doctors.error}</p> :
                        <div>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Add Doctors
                            </Button>

                            <TextField
                                margin="dense"
                                id="search"
                                name="search"
                                label="Search Doctor"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => handleSearch(e.target.value)}
                            />

                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    getRowId={(row) => row.did}
                                    rows={doctors.doctors}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </div>

                            <Dialog
                                open={dopen}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure to delete?"}
                                </DialogTitle>

                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button onClick={handleDelete} autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog fullWidth open={open} onClose={handleClose}>
                                <DialogTitle>Add Doctors</DialogTitle>

                                <Formik values={formikObj}>
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.name}
                                                margin="dense"
                                                id="name"
                                                name="name"
                                                label="Doctor Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                            <TextField
                                                value={values.aptprice}
                                                margin="dense"
                                                id="aptprice"
                                                name="aptprice"
                                                label="Doctor aptprice"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.aptprice && touched.aptprice ? <p>{errors.aptprice}</p> : ''}
                                            <TextField
                                                value={values.degree}
                                                margin="dense"
                                                name="degree"
                                                id='degree'
                                                label="Doctor degree"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.degree && touched.degree ? <p>{errors.degree}</p> : ''}
                                            <TextField
                                                value={values.description}
                                                margin="dense"
                                                name="description"
                                                id='description'
                                                label="Doctor description"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.description && touched.description ? <p>{errors.description}</p> : ''}

                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                {
                                                    update ?
                                                        <Button type="submit">Update</Button>
                                                        :
                                                        <Button type="submit">Submit</Button>
                                                }
                                            </DialogActions>
                                        </DialogContent>
                                    </Form>
                                </Formik>
                            </Dialog>
                        </div>
            }
        </div>
    );
}

export default Doctors;