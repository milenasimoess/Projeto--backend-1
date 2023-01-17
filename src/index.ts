import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, getAllPurchasesFromUserId, createPurchase } from "./database";
import { Category, TProduct, TPurchase, TUser } from "./types";
import express from 'express';
import { Request, Response} from 'express';
import cors from 'cors';
import { isErrored } from "stream";

// console.log("USERS", users)
// console.log("PRODUCTS", products)
// console.log("PURCHASE", purchase)

console.log(createUser("u3", "user3@email.com", "1234"))
console.table(getAllUsers())
console.log(createProduct("p3", "calça", 4321,Category.CLOTHES))
console.table(getAllProducts())
console.log(createProduct("p4", "celular", 400, Category.ELECTRONICS))
console.table(getProductById("p2"))
console.table(queryProductsByName("blusa"))
console.table(createPurchase("u1", "p2", 1, 7))
console.log(getAllPurchasesFromUserId("u2"))

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
});

//---------------------------
app.get('/users', (req: Request, res:Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
});

//-------------------------------

app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
        
    } catch (error : any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
    
});

//-------------------------------------------


app.get('/products/search', (req:Request, res:Response) =>{
    try {
        const q = req.query.q as string

    const result = products.filter((products) => {
        return products.name.toLowerCase().includes(q.toLowerCase())
    })
  
    if(q.length < 1 ) {
        res.status(400)
        throw new Error("Query params deve possuir pelo menos um caractere")
    }

    if(result.length<1){
        res.status(404)
        throw new Error("Produto não encontrado")
    }
    res.status(200).send(result)
        
    } catch (error: any) {
        console.log(error)

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)
        
    }
    
});

//---------------------------------------------
app.post('/users', (req: Request, res: Response) => {
    try {
        const {id, email, password} = req.body as TUser
        // const id = req.body.id as string
        // const email = req.body.email as string
        // const password = req.body.password as string
    
        const newUser: TUser= {
            id,
            email,
            password
        }
    if(id !== undefined) {
        if(typeof id !== 'string'){
            res.status(400)
            throw new Error('o id deve ser tipo string')
        }
    }
     
    if(id.length <=0){
        res.status(400)
        throw new Error('o id deve ter pelo menos um valor')
    }

    if(id[0] !== "0"){
        res.status(400)
        throw new Error('o id deve começar com zero')
    }
    
    if(email !== undefined){
        if(typeof email !== 'string'){
            res.status(400)
            throw new Error('o email deve ser do tipo string')
        }
    }
    if(email.length <= 0){
      res.status(400)
      throw new Error("o email deve ter pelo menos um valor ")
    }
    
    if(password !== undefined){
        if(typeof password !== 'string'){
            res.status(400)
            throw new Error('o password deve ser tipo number')
        }

       

    }
    const userId = users.filter((user) => user.id === id)

    if(userId.length >= 1){
        res.status(403)
        throw new Error('essa id já está cadastrada')
    }

    const userEmail = users.filter((user) => user.email === email)

    if(userEmail.length >= 1){
        res.status(422)
        throw new Error("esse email já está cadastrado")
    }
        users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso")
        
    } catch (error : any) {
        console.log(error)
        res.status(400).send(error.mesage)
    }
   
});

//----------------------------------------------

app.post('/products', (req: Request, res: Response) => {
    try {
    const {id, name, price, category} = req.body as TProduct
    //     const id = req.body.id as string
    // const name = req.body.name as string
    // const price = req.body.price as number
    // const category = req.body.category as Category

    const newProducts: TProduct = {
        id,
        name,
        price,
        category
    }

    if(id !== undefined) {
        if(typeof id !== 'string'){
            res.status(400)
            throw new Error('o id deve ser tipo string')
        }
    }
     
    if(id.length <=0){
        res.status(400)
        throw new Error('o id deve ter pelo menos um valor')
    }

    if(name !== undefined) {
        if(typeof name !== 'string'){
            res.status(400)
            throw new Error('o id deve ser tipo string')
        }
    }
     
    if(name.length <=0){
        res.status(400)
        throw new Error('o id deve ter pelo menos um valor')
    }

    if(price !== undefined) {
        if(typeof price !== 'number'){
            res.status(400)
            throw new Error("o price deve ser do tipo number")
        }
    }

    if(price <=0){
        res.status(400)
        throw new Error('o price deve ter pelo menos um valor')
    }

    // if(category !== undefined) {
    //     if(typeof category !== Category){
    //         res.status(400)
    //         throw new Error("o price deve ser do tipo number")
    //     }
    // }



    products.push(newProducts)
    res.status(201).send("Produto cadastrado com sucesso")
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
    
});

//----------------------------------------------

app.post('/purchase', (req: Request, res: Response) => {
    try {
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase
    //     const userId = req.body.userId as string
    // const productId = req.body.productId as string
    // const quantity = req.body.quantity as number
    // const totalPrice = req.body.totalPrice as number

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    if(userId !== undefined) {
        if(typeof userId !== 'string'){
            res.status(400)
            throw new Error('o id deve ser tipo string')
        }
    }
     
    if(userId.length <=0){
        res.status(400)
        throw new Error('o id deve ter pelo menos um valor')
    }

    if(productId !== undefined) {
        if(typeof productId !== 'string'){
            res.status(400)
            throw new Error('o id deve ser tipo string')
        }
    }
     
    if(productId.length <=0){
        res.status(400)
        throw new Error('o id deve ter pelo menos um valor')
    }

    if(quantity !== undefined) {
        if(typeof quantity !== 'number'){
            res.status(400)
            throw new Error("a quantity deve ser do tipo number")
        }
    }

    if(quantity <=0){
        res.status(400)
        throw new Error('a quantity deve ter pelo menos um valor')
    }

    if(totalPrice !== undefined) {
        if(typeof totalPrice !== 'number'){
            res.status(400)
            throw new Error("o total price deve ser do tipo number")
        }
    }

    if(totalPrice <=0){
        res.status(400)
        throw new Error('o total price deve ter pelo menos um valor')
    }



    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
    

});

//----------------------------------------------

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id 
    const result = products.find((product) => {
       return product.id === id
    })
    res.status(200).send(result)
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
    
})

//---------------------------------------------------

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id
 const result = users.find((user) => user.id === id)
    if(result){
        const resultPurchase = purchase.filter((p) => {
            return p.userId === result.id
        })
        if(resultPurchase){
            res.status(200).send(resultPurchase)
        }
    }
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
    }
 
 )

 //----------------------------------------------


app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

    const userIndex = users.findIndex((user) => {
        return user.id === id
    })
    console.log("Index:", userIndex)
    if(userIndex>=0){
        users.splice(userIndex, 1)
        
    }
    res.status(200).send("Item deletado com sucesso")
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
        
    }
    
)

//----------------------------------------------

app.delete('/products/:id', (req: Request, res:Response) => {
    try {
        const id =req.params.id as string

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })
        console.log("Index:", productIndex)
        if(productIndex>=0) {
            products.splice(productIndex, 1)
        }
        res.status(200).send("Item deletado com sucesso")
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
   
})

//----------------------------------------------

app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newId = req.body.id
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined
    
        const user = users.find((user) => {
            return user.id === id
        })
        if(user){
            user.id = newId || user.id
            user.email = newEmail || user.email
            user.password = newPassword || user.password
            res.status(200).send("Item atualizado com sucesso")
        }else {
         res.status(404).send("Item não encontrado")
        }

        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
        
    }
   
        
    
    
})

//----------------------------------------------

app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newId = req.body.id
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number 
        const newCategory = req.body.category as Category | undefined
    
        const product = products.find((product) => {
            return product.id === id
        })
        if(product){
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category
            res.status(200).send("Item atualizado com sucesso")
        }else{
            res.status(404).send("Item não encontrado")
        }
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
   
})







