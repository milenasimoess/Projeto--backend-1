import { TUser, TProduct, TPurchase, Category } from "./types";

export const users: TUser [] = [
    {
        id: "u1",
        name: "user1",
        email: "user1@email",
        password: "123ç"
    }, {
        id: "u2",
        name: "user2",
        email: "user2@email",
        password: "321ç"
    }
]

export const products: TProduct[] = [
    {
        id:"p1",
        name: "blusa",
        price: 25,
        category: Category.CLOTHES,
        imageUrl: "html..."
    },
     {
        id:"p2",
        name:"colar",
        price: 7,
        category: Category.ACCESSORIES,
        imageUrl: "html..."
    }
]

export const purchase : TPurchase[] = [
   {
    userId: "u2",
    productId: "p2",
    quantity: 2,
    totalPrice: 14
}, {
    userId: "u1",
    productId: "p1",
    quantity: 4,
    totalPrice: 100
}
]



export function createUser(id:string, name:string, email:string, password:string): string {
 users.push({id, name, email,password})
 return ("Cadastro realizado com sucesso")
}

export function getAllUsers(): TUser[] {
    return users
}

export function createProduct(id:string, name:string, price:number, category:Category, imageUrl:string): string {
    products.push({id, name, price, category, imageUrl})
    return ("Produto criado com sucesso")
}

export function getAllProducts(): TProduct[] {
    return products
}

export function getProductById(idToSearch:string): TProduct[] | undefined{
 return products.filter(
    (product) => {
        return product.id === idToSearch
    }
 )}


export const queryProductsByName = (q:string) => {
    return products.filter(
        (product) => {
            return(product.name.toLowerCase().includes(q.toLowerCase()))
        }
    )
}

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number) : string => {
 purchase.push({userId, productId, quantity, totalPrice})
return("Compra criada com sucesso") }

export const getAllPurchasesFromUserId = (userIdSearch:string) => {
 return purchase.filter(
    (purchase) => {
        return(purchase.userId.toLowerCase().includes(userIdSearch))})}