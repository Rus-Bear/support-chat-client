import React from 'react';
import {BrowserRouter} from "react-router-dom";

import './App.scss';

import AppRoutes from "./appRoutes";
import RootStore from "./store/store";

interface State {
    store: RootStore
}

const store = new RootStore()

export const Context = React.createContext<State>({
    store
})

function App() {
    return (
        <Context.Provider value={{store}}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
