import React, { useState } from "react";

export default function Practice() {
  const [products, setProducts] = useState([
    { name: "computer", model: "iphone", id: 1, quantity: 1 },
    { name: "phone", model: "samsung", id: 2, quantity: 1 },
  ]);

  function handleQuantity(id){
    let updateProducts = products.map(product => product.id == id ? {...product,quantity:0} : product);
    setProducts(updateProducts);
  }
  return (
    <div className="grid justify-center items-center h-screen">
        {products.map((product,index) => 
        <div key={index}>
            <span>{product.id}</span>
            <br />
          {product.name}
          <br />
          <span>{product.model}</span>
          <br />
          <span>{product.quantity}</span>
          <hr />
          <button className="p-1 bg-black/50 " onClick={()=> handleQuantity(product.id)}>+</button>
        </div>
      )}
    </div>
  );
}
