import * as yup from 'yup'
import { isValidObjectId } from 'mongoose'
import { categories } from './audio_category'

export const CreateUserSchema = yup.object().shape({
    name: yup.string().trim().required("Name is missing!").min(3, "Name is too short!")
    .max(20, "Name is too long!"),
    email: yup.string().required("Email is missing!").email("Invalid email Id!"),
    password: yup.string().trim().required("Password is missing!")
    .min(8, "Password is too short").matches(/^(?=.*[a-zA-Z])/,
    "Password is too simple!")
})

export const EmailVerificationBody = yup.object().shape({
    token: yup.string().trim().required("Invalid token!"),
    userId: yup.string().transform(function(value) {
        if(this.isType(value) && isValidObjectId(value)){
            return value
        }
            return ""
    }).required("Invalid userId!")
})

export const TokenAndIDValidation = yup.object().shape({
    token: yup.string().trim().required("Invalid token!"),
    userId: yup.string().transform(function(value) {
        if(this.isType(value) && isValidObjectId(value)){
            return value
        }
            return ""
    }).required("Invalid userId!")
})

export const UpdatePasswordSchema = yup.object().shape({
    token: yup.string().trim().required("Invalid token!"),
    userId: yup.string().transform(function(value) {
        if(this.isType(value) && isValidObjectId(value)){
            return value
        }
            return ""
    }).required("Invalid userId!"),
    password: yup.string().trim().required("Password is missing!")
    .min(8, "Password is too short").matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
    "Password is too simple!")
})

export const SignInValidationSchema = yup.object().shape({
    email: yup.string().required("Email is missing!").email("Invalid email Id!"),
    password: yup.string().trim().required("Password is missing!")
})

export const AudioValidationSchema = yup.object().shape({
    title: yup.string().required("Title is missing!"),
    about: yup.string().required("About is missing!"),
    category: yup.string().oneOf(categories, "Invalid categories!").required
    ("Category is missing!")
})

// While creating playlist there can be request
// With new playlist name and the audio that user wants to store inside that playlist
// Or user just want to create an empty playlist

export const  NewPlaylistValidationSchema = yup.object().shape({
    title: yup.string().required("Title is missing!"),
    resId: yup.string().transform(function(value){
        return this.isType(value) && isValidObjectId(value) ? value : ""
    }),
    visibility: yup.string().oneOf(["public", "private"], "Invalid categories!")
    .required("Category is missing!")
})

export const  OldPlaylistValidationSchema = yup.object().shape({
    title: yup.string().required("Title is missing!"),

    // This is going to validate the audio id
    item: yup.string().transform(function(value){
        return this.isType(value) && isValidObjectId(value) ? value : ""
    }),

    // This is going to validate the playlist id
    id: yup.string().transform(function(value){
        return this.isType(value) && isValidObjectId(value) ? value : ""
    }),

    visibility: yup.string().oneOf(["public", "private"], "Invalid categories!")
    //  .required("Category is missing!")
})

export const  UpdateHistorySchema = yup.object().shape({
    audio: yup.string().transform(function(value){
        return this.isType(value) && isValidObjectId(value) ? value : ""
    }).required("Invalid audio id!"),
    progress: yup.number().required("History progress is missing!"),
    date: yup.string().transform(function (value) {
        const date = new Date(value)
        if(date instanceof Date) return value
        return ""
    }).required("Invalid date!")
})