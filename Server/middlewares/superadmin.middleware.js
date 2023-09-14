const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).send({message: "Unauthorized"});
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        if(req.user.user_type === "1"){
            next()
        }else{
            res.status(401).send({message: "Unauthorized"})
        }

    } catch (error) {
        console.log(error);
        res.status(401).send({message: "Unauthorized"})
    }
}

module.exports=authMiddleware;