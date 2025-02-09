import joi from 'joi'

let userEmail = joi.object({
    user : joi.string(),
    email : joi.string().email().required(),
    title : joi.string().trim(),
    status : joi.string().trim(),
    messageAr : joi.string().trim(),
    messageEn : joi.string().trim(),
    messageBr : joi.string().trim(),
    ShipmentLink : joi.string().trim(),
    ShipmentCode : joi.string().trim(),
})

export {
    userEmail
}