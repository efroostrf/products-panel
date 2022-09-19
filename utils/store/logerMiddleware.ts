import { toast } from 'react-toastify';
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      let errMsg: string = action.payload.data ? action.payload.data.error : 'Something went wrong';
      toast.error(`${action.payload.status}: ${errMsg}`);
    }

    return next(action);
  }
