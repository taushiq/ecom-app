import { ProductModelServer } from '../models/product.model';

export interface CartModelServer { 
            productId: number;
            product: ProductModelServer,
            numInCart: number        
}





