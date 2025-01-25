import jwt from 'jsonwebtoken'
import util from 'util'

const authencatication = async (req , res , next)=>{
    
    const {authorization} = req.headers
    if (! authorization )
        return res.status(401).json({status:"Fail" , data : "You must login first"})

    try {
            let payload = await util.promisify(jwt.verify)(authorization , process.env.SECRET)

            req.role = payload.role
            req._id = payload.id
            next()

    } catch (error) {
        res.status(401).json({
            status : "Fail",
            data : "You're not authenticated"
        })
    }
}

const restrictTo = (...roles) =>{
    // Must Return Function
    return function (req , res ,next){


        if (! roles.includes(req.role)){
            return res.status(403).json({
                message : "You're Not Authorized"
            })
        }else {
            next()
        }
        
    }
}


export {
    authencatication ,
    restrictTo
}