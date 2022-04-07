const express = require('express')
const { Router } = express
const ProductosApi = require('./api/productos.js')

const productosApi = new ProductosApi()

const productosRouter = Router()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

productosRouter.get('/', async (req, res, next) => {
  try {
    const productosTodos = await productosApi.listarAll()
    res.send(productosTodos)
  } catch (error) {
    return next(error);
  }
})

productosRouter.get('/:id', async (req, res, next) => {
  try {
    const producto = await productosApi.listar(parseInt(req.params.id))
    res.send(producto)
  } catch (error) {
    return next(error);
  }
})

productosRouter.post('/', async (req, res, next) => {
  try {
    const productoGuardado = await productosApi.guardar(req.body)
    res.send(productoGuardado)
  } catch (error) {
    return next(error);
  }

})

productosRouter.put('/:id', async (req, res, next) => {
  try {
    const productoActualizado = await productosApi.actualizar(req.body, parseInt(req.params.id))
    res.send(productoActualizado)
  } catch (error) {
    return next(error);
  }
})

productosRouter.delete('/:id', async (req, res, next) => {
  try {
    const productoBorrado = await productosApi.borrar(parseInt(req.params.id))
    res.send(productoBorrado)
  } catch (error) {
    return next(error);
  }
})


app.use('/files', express.static(__dirname + '/public'))
app.use('/api/productos', productosRouter)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
