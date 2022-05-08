const db = require('./database');

const getProducts = async () => {
    const allProductsQuery = "SELECT * FROM products";
    const [rows] = await db.execute(allProductsQuery);

    console.log(rows);

    return rows;
}

const insertProduct = async (p_name, p_code) => {

    const insertProductQuery = "INSERT INTO products(p_name, p_code) VALUES (?, ?)";
    const queryResult = await db.execute(insertProductQuery, [p_name, p_code]);

    console.log(queryResult);

    return ;
}

const updateProduct = async (p_name, p_code, pid) => {

    const attrArr = [];
    
    if(p_name) attrArr.push("p_name = ?");
    if(p_code) attrArr.push("p_code = ?");
    
    const valArr = [];
    if(p_name) valArr.push(p_name);
    if(p_code) valArr.push(p_code);

    const updateProductQuery = `UPDATE products SET ${attrArr.join(", ")} WHERE id = ${pid}`;
    const queryResult = await db.execute(updateProductQuery, valArr);

    console.log(queryResult);

}

const deleteProduct = async (pid) =>{
    const deleteProductQuery = "DELETE FROM products WHERE id = ?";
    const queryResult = await db.execute(deleteProductQuery, [pid]);
    console.log(queryResult);
}

module.exports = {
    getProducts,
    insertProduct,
    updateProduct,
    deleteProduct
}