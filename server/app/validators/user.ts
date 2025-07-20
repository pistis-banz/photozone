import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
    username: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6).maxLength(255),
    firstname: vine.string().trim().minLength(3).maxLength(255),
    lastname: vine.string().trim().minLength(3).maxLength(255),    
    gender: vine.enum(['male', 'female']),
    birthdate: vine.date()
})
) 

export const loginValidator = vine.compile(
    vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6).maxLength(255),
})
)
    
