import express from "express"
import ProductManager from "./Eccomerce"



const app = express()
app.use(express.json())

app.get('/products', (req, res) => {
    res.json()
})




/* let usuarios = [] ------Anterior

app.get('/api/usuarios', (req, res) => {
    res.json(usuarios)
})

app.post('/api/usuarios', (req, res) => {
    const usuario = req.body

    usuarios.push(usuario)
    res.status(201).json({status: 'confirmado', mensaje: 'usuario creado'})
})

app.put('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id) 
    const usuario = req.body

    const usuarioIdx = usuarios.findIndex(u => u.id === id)
    if(usuarioIdx <0){
        return res.status(404).json({status: "error", mensaje: "Usuario no encontrado"})
    }

    usuarios[usuarioIdx] = usuario


    res.json({status: "Aceptado", mensaje: "actualizando..."})
})

app.delete('/api/usuarios/:id', (req, res) =>{
    const id = parseInt(req.params.id)

    const usuarioIdx = usuarios.findIndex(u => u.id === id)
    if(usuarioIdx <0){
        return res.status(404).json({status: "error", mensaje: "Usuario no encontrado"})
    }

    usuarios = usuarios.filter(u => u.id !== id)
    res.send({status: "Aceptado", mensaje: "Usuario eliminado con exito"})
}) */

app.listen(8080)
