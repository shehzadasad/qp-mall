import { fetchToken } from "redux/GenerateToken/GenerateToken";

export const apiErrorMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (action.type.endsWith("rejected")) {
      // Dispatch an action to trigger the generation of a new token
      store.dispatch(fetchToken());

      // Retry the failed API call
      const retryAction = {
        ...action,
        payload: undefined,
      };
      return next(retryAction);
    }

    return next(action);
  };
