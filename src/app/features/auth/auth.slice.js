import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./auth.service";

// Get user from localStorage
const reactUser = JSON.parse(localStorage.getItem("uml_user"));
const initialState = {
  user: reactUser || null,

  isLoginError: false,
  isLoginSuccess: false,
  isLoginLoading: false,
  loginMessage: "",

  isRegisterError: false,
  isRegisterSuccess: false,
  isRegisterLoading: false,
  registerMessage: "",

  isLoggedIn: false,
};

// Login user
// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ data, callBack }, thunkAPI) => {
//     try {
//       console.log("slice", data);
//       return await authService.login(data);
//     } catch (error) {

//       callBack(error.message || error, false);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const login = createAsyncThunk(
  "auth/login",
  async ({ values, notifyToaster }, thunkAPI) => {
    try {
      const response = await authService.login(values);
      // if (response.succeeded === true) {
      //   if (notifyToaster) {
      //     notifyToaster();
      //   }
      // } else {
      //   notifyToaster(response.message, "error");
      // }
      return response;
    } catch (error) {
      notifyToaster(error.message, "error");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Registration user
export const register = createAsyncThunk(
  "auth/register",
  async ({ data, callBack }, thunkAPI) => {
    try {
      await authService.register(data);
      callBack();
      return true;
    } catch (error) {
      callBack(error.message || error, false);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//       state.isLoginSuccess = false;
//     },
//     reset: (state) => {
//       state.isLoginLoading = false;
//       state.isLoginSuccess = false;
//       state.isLoginError = false;
//       state.loginMessage = "";
//     },
//     updateUser: (state) => {
//       const updatedUser = JSON.parse(localStorage.getItem("user"));
//       state.user = updatedUser;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.isLoginLoading = true;
//         state.loginMessage = "";
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoginLoading = false;
//         state.isLoginSuccess = true;
//         state.isLoginLoggedIn = true;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loginMessage = action.payload;
//         state.isLoginLoading = false;
//         state.isLoginError = true;
//         state.user = null;
//       })
//       .addCase(register.pending, (state) => {
//         state.isRegisterLoading = true;
//         state.registerMessage = "";
//       })
//       .addCase(register.fulfilled, (state) => {
//         state.isRegisterLoading = false;
//         state.isRegisterSuccess = true;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.registerMessage = action.payload;
//         state.isRegisterLoading = false;
//         state.isRegisterError = true;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//       });
//   },
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isSuccess = false;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
