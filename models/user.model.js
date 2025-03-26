import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minLength: 6
  }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User

// {name:"Utkarsh Raj",email:"utkarshraj525@gmail.com",password:"utkarsh525"}


/*
{
  "message": "User SignUp SuccessFully",
  "newUsers": [
    {
      "name": "Pallawi",
      "email": "pallawi034@gmail.com",
      "password": "$2b$10$juLGul60mf9JlVASWjp1w.H8tVXzOMSm2QqyZa3S37tVtcIZJ/tIy",
      "_id": "67e37e12726c6add8333a276",
      "createdAt": "2025-03-26T04:09:54.774Z",
      "updatedAt": "2025-03-26T04:09:54.774Z",
      "__v": 0
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UzN2UxMjcyNmM2YWRkODMzM2EyNzYiLCJpYXQiOjE3NDI5NjIxOTQsImV4cCI6MTc0MzA0ODU5NH0.WP7hlw9M5XDStLUVQZUKmic9AR9YspuTjBX9xrG2jyw"
}
*/