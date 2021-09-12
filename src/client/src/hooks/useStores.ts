import {useContext} from "react";
import {StoreContext} from "../context/store-context";
import {MainStore} from "../stores";

export const useStores = () => useContext<MainStore>(StoreContext);