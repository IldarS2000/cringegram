import React, { createContext, ReactNode } from 'react';
import { MainStore } from '../stores';

export const StoreContext = createContext<MainStore>({} as MainStore);

const mainStore = new MainStore();

interface Props {
    children: ReactNode;
}

export const StoreProvider = ({ children }: Props): JSX.Element => {
    return <StoreContext.Provider value={mainStore}>{children}</StoreContext.Provider>
};

