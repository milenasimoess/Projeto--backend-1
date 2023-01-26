export enum Category {
    ACCESSORIES = "Acessórios",
    CLOTHES = "Roupas",
    ELECTRONICS = "Eletrônicos"}
    
    export type TUser ={
        id: string,
        name: string,
        email: string,
        password: string
    }
    
    export type TProduct = {
        id: string,
        name: string,
        price: number,
        category: Category,
        imageUrl: string
    }
    
    export type TPurchase = {
        userId: string,
        productId: string,
        quantity: number,
        totalPrice: number
    }