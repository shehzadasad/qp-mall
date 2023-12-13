import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist";
import { RootState } from "./rootReducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

export default persistConfig;
