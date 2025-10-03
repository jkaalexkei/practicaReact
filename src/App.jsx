// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { useState, useEffect } from "react"

import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header"; //importacion del componente
import { db } from "./data/db";


function App() {

  const initialCart = () =>{
    const datosLocalStorage = localStorage.getItem('cart')
    return datosLocalStorage ? JSON.parse(datosLocalStorage) : []
  }
  
  /*ESTO ES UN COMPONENTE  */
  //se puede declarar o declaramos el state como arreglo vacio porque almacenara un listado de datos

  const [datos, /*setDatos*/] = useState(db)//como se trata de ur archivo local se puede setear dentro del state como valor inicial
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))//para tener persistencia de los datos en el navegador
    //se ejecuta cada vez que que el state cart cambie
  },[cart])

  /*
  Logica aplicada
  1. crear una funcion intermedia que recibe como parametro el objeto guitar
  2. crear una variable que almacene el resultado de la validación del arreglo(cart) que corresponde al carrito de comprar
  3. recorrer los elementos del carrito usando el array methods findIndex() para evaluar si existe o no un elemento en el carrito
  4.- validar el resultado almacenado en la variable que guarda el resultado del recorrido del arreglo que contiene los elementos del carrito de compras.
  5.- En un condicional evaluamos si el valor de la variable es mayor e igual 0, indica que ya hay un objeto y se procede actualizar el valor de la propiedad quantity incrementando su valor
  6. caso contrario que el resultado sea menor a 0, significa que no hay elementos por ese id, y se procede agregarlo al carrito creando un nuevo arreglo que contenga una copia de los elementos del carrito y el nuevo elemento.
  7. Luego la funcion se pasa como props al componente Guitar donde se colocara en el evento onClick del boton que se esta renderizando en el componente a la cual se le pasa como parametro el objeto guitar, el cual tambien ya esta incluido como props.
  */
  function addToCart(item){//funcion intermedia para agregar elementos al carrito
        
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)//aqui evaluamos si el elemento existe, la funcion findIndex() retorna -1 si el elemento no existe y el resultado lo almacenamos en la variable itemExits, en caso que existe retorna el indice o posición donde se encuentra el elemento
    
    // console.log(itemExists)
    
    if (itemExists >= 0){//aca se valida si el elemento ya existe en el carrito
      if(cart[itemExists].quantity >=MAX_ITEMS)return//aqui se revisa la posición en el carrito para validar que no se puedan agregar mas elementos de los permitidos
      // console.log('Elemento ya existe')
      //para actualizar la cantidad creamos una copia de state
     
      const updateCart = [...cart]//creamos la copia del state
     
      updateCart[itemExists].quantity++//incrementamos el valor de la cantidad de carrito y actualizamos la propiedad quantity 
     
      setCart(updateCart)
    
    }else{
    
      // console.log('Elemento no existe, Agregando....')
    
      item.quantity = 1
    
      setCart([...cart, item])//aqui se hace una copia de lo que tiene cart y le agrega un nuevo elemento
    }
    
    


  }

  function removeFromToCart(id){
    //aqui se setea lo que tiene el carrito y mediante el metodo filter se hace una busqueda por el parametro id para quitar del carrito de compras el item elegido
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function incrementarQuantity(id){
    //se recibe por parametro el id del items del carrito compras
    //se asigna a una variable lo que retorna el metodo map el cual hace una busqueda por id y si existe el item en el carrito de compras retorna lo que tiene actualmente el carrito y actualiza la cantidad
      const updatedCart = cart.map(item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
            return{
              ...item,//se mantiene el resto de propiedades
              quantity:item.quantity + 1//se modifica la cantidad
            }
        }
        //aqui se retornan los elementos que contiene el carrito de compras
        return item//mantiene el resto de las propiedades sobre las cuales no se dio click
      })

      setCart(updatedCart)//aca se setea el valor actualizado de los elementos del carrito al estado
  }

  function decrementarQuantity(id){
    const actualizarCart = cart.map((elementos)=>{
      if(elementos.id === id && elementos.quantity > MIN_ITEMS){
        return{
          ...elementos,
          quantity:elementos.quantity - MIN_ITEMS
        }
      }
      return elementos
    })
   setCart(actualizarCart)
  }

  function clearCart(){
    setCart([])
  }
  /*Aqui se declaran los statement*/

  return ( 
    <>
      <Header
      //aqui se pasan los props al componente
        cart = {cart}
        removeFromToCart = {removeFromToCart}
        incrementarQuantity = {incrementarQuantity}
        decrementarQuantity = {decrementarQuantity}
        clearCart = {clearCart}
       
      />
       {/*Aqui pasamos el objeto cart que contiene el carrito de compras para poderlo usar en el componente Header*/}
      {/* aqui dentro se declaran expresiones */}

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {datos.map((guitar) => ( //recorremos los datos
              <Guitar
                key={guitar.id} //identificador unico, siempre se debe colocar
                guitar={guitar} //nombre del props, en este caso recibe un objeto con todas las guitarras desde db
                cart = {cart}
                setCart = {setCart}
                addToCart = {addToCart}

              />
            )
          )}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

// useEffect(()=>{//eso se usa mucho en APIs (recomendado para API)
//   setDatos(db)//modificamos el state
// },[datos])//como array de dependencias le pasamos el valor del state cuando el componente este listo

/* const [state, funcion que modifica el state] =  hook  (estado inicial)         */
// const [auth, setauth] = useState(20)

// useEffect(()=>{
//    console.log('listo')
// },[])

// setTimeout(() => {
//   setauth(true)
// }, 3000);
