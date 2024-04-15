import jwt from 'jsonwebtoken';
export const validJWTToken = async (request) =>{
    const token = request.cookies.get('token')?.value;

    try{
        if(!token){
            throw new Error("No token found");
        }

        //verify token
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decodeToken._id;
        return userId;
    }catch(error){
        return error;
    }
 }