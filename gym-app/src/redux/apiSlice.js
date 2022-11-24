import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:4000' }),
    endpoints: builder =>({
        getAllExercises: builder.query({
            query:()=>({
                url:'/exercises'
            })
        }),
        getExercisesByBodyPart: builder.query({
            query:(bodyPart)=>({
                url:`/exercises?bodypart=${bodyPart}`
            })
        }),
        getExerciseByName: builder.query({
            query:(name)=>({
                url:`/exercises?q=${name}`
            })
        }),
        getExerciseById: builder.query({
            query: (id)=>({
                url:`/exercises/${id}`
            })
        }),
        getBodyParts: builder.query({
            query:()=>({
                url:'/exercises/bodyParts'
            })
        }),
        userSignup: builder.mutation({
            query:(user)=>({
                url:'/users',
                method: 'POST',
                body:user
            })
        }),
        userLogin: builder.mutation({
            query:(user)=>({
                url:'/auth',
                method:'POST',
                body:user
            })
        })

    })
});

export const {
    useGetAllExercisesQuery,
    useGetExerciseByIdQuery,
    useGetExerciseByNameQuery,
    useGetExercisesByBodyPartQuery,
    useGetBodyPartsQuery,
    useUserLoginMutation,
    useUserSignupMutation,
} = apiSlice