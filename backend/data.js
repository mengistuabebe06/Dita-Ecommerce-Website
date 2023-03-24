import bcrypt from "bcrypt";

const data = {
    users:[
        {
           name: 'meng',
           email: 'm@gmail.com',
           password: bcrypt.hashSync('1234', 8),
           isAdmin: true,
        },
        {
            name: 'abebe',
            email: 'a@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name:"Nike Slim Tishir",
            slug:"Nike Slim Tishir",
            category:"shirsts",
            image:"/images/p1.jpg",
            price: 120,
            counterInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description:"high quilty with low price"
        },
        {
            name:"Puma",
            slug:"Puma",
            category:"shirsts",
            image:"/images/p1.jpg",
            price: 450,
            counterInStock: 5,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description:"high quilty with low price"
        },
        {
            name:"shoes",
            slug:"shoes",
            category:"shirsts",
            image:"/images/p1.jpg",
            price: 450,
            counterInStock: 0,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description:"high quilty with low price"
        },
        {
            name:"bag",
            slug:"bag",
            category:"bag",
            image:"/images/p1.jpg",
            price: 450,
            counterInStock: 0,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description:"high quilty with low price"
        },
    ]
}
export default data