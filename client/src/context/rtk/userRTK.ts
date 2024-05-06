// Imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_URL } from "../../constants/contants";
import {
  AllUsersResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from "../../types/rtk-types";
import { User } from "../../types/types";
import axios from "axios";

const UserApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({ baseUrl: USER_URL }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    allUsers: builder.query<AllUsersResponse, string>({
      query: () => "get-all-users",
      providesTags: ["User"],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${USER_URL}/get-user/${id}`
    );
    return data;
  } catch (err) {
    console.error("Error getting user : ", err);
  }
};

export const { useLoginMutation, useDeleteUserMutation } = UserApi;
export { UserApi }
