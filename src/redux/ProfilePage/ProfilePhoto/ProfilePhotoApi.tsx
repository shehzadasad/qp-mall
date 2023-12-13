import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface PostProfilePhoto {
  isLoading: boolean;
  profilePhotoError: Error | null;
}
interface FetchDataArgs {
  payload: any;
  loginToken: string;
}

export const postprofilePictureData: any = createAsyncThunk(
  "data/postPhoto",
  async (arg: FetchDataArgs) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "v1/ms-customer-api/user/profile-image-new"
    )
      .headers({
        "Mall-Authorization": `Bearer ${arg.loginToken}`,

        "x-api-key": "abc123!",
      })

      .patch(arg.payload)
      .badRequest((err) => {
        toast.error("Invalid input data!");
      })
      .notFound((err) => {
        // console.log("==> ", err);
      })
      .unauthorized((err) => {
        toast.error("Invalid Token!");
      })
      .internalError((err) => {
        toast.error("Error!");
      })
      .json();

    return response;
  }
);

const postProfilePictureSlice = createSlice({
  name: "postprofilePictureData",
  initialState: {
    isLoading: false,
    profilePhotoError: null,
  } as PostProfilePhoto,
  reducers: {},
  extraReducers: {
    //New Arrival Products
    [postprofilePictureData.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [postprofilePictureData.fulfilled.type]: (state: any, action: any) => {
      state.customerData = action.payload;
      state.isLoading = false;
    },
    [postprofilePictureData.rejected.type]: (state: any, action: any) => {
      state.customerError = action.error;
    },
    //New Arrival Products End
  },
});

export default postProfilePictureSlice.reducer;
