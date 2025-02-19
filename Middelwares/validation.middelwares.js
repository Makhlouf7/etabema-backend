import {userEmail} from '../Services/emailValidation.js'

function emailValidationMiddellware (req , res , next){

    try {
        // let data = RegisterSchema.validate(req.body)
        // console.log(data);
        let {error} = userEmail.validate(req.body)
        // console.log(error.details[0].message);
        if(error){
            let errMsg = error.details[0].message
            return res.status(403).json({message : errMsg})
        } 
        next()
        // return res.send()
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }

}
export {
    emailValidationMiddellware
}