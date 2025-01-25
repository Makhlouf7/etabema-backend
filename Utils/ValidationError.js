export function ValidationError(error , res){
    const errors = Object.values(error.errors).map((e)=>({
        field : e.path,
        message : e.message
    }))
    return res.status(400).json({errors})
}