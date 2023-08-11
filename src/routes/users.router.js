import { Router } from "express";
import { userModel } from "../DAO/mongoManager/models/users.js";

const router = Router()

router.get('/', async (req, res) =>{
    try{
        let users = await userModel.find()
        res.send({result: "success", payload: users})
    }
    catch(error){
        console.log("No se pueden obtener usuarios:"+error)
    }
})

router.post('/', async(req, res) =>{
    let {first_name,last_name,email} = req.body;
    if(!first_name||!last_name||!email) return res.send({status:"error", error:"Campos incompletos"})
    //si todo esta bien...
    let result = await userModel.create({
        first_name,
        last_name,
        email
    })
    res.send({status:"ExItO", payload:result})
})

router.put('/:uid', async(req, res) =>{
    let {uid} = req.params

    let userToRemplace = req.body
    if(!userToRemplace.first_name||!userToRemplace.last_name||!userToRemplace.email)
    return res.send({status:"error", error: "Campos incompletos"})

    let result = await userModel.updateOne({_id:uid}, userToRemplace)
    res.send({status:"exito",  payload:result})
})

router.delete('/:uid', async(req, res) =>{
    let {uid} = req.params

    let result = await userModel.deleteOne({_id:uid})
    res.send({status:"exito", payload:result})
})

export default router