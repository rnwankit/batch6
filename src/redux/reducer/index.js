import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { doctorsReducer } from "./doctors.reducer";
import { medicinesReducer } from "./medicines.reducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    medicines: medicinesReducer,
    doctors: doctorsReducer
})