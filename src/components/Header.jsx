/*
zona para importar librerias
*/
// import { Fragment } from "react"
import { useMemo } from "react";
export default function Header({ cart,removeFromToCart,incrementarQuantity, decrementarQuantity,clearCart }) {
  /*zona de state o funciones*/

  // const [item, setItem] = useState(0);

  //State derivado
  const isEmpty = useMemo(()=>cart.length === 0,[cart]) //valida si el carrito esta vacio
 
  const cartTotal = useMemo(()=> cart.reduce((total,item) => total + (item.quantity * item.price),0),[cart]) //aqui calculamos el total a pagar


  return (
    /*
            zona de la vista / HTML
         lo que se coloque aqui se vera en pantalla 
         las variables se deben colocar entre llaves
         el nivel maximo es la primera etiqueta html de la estructura que se vaya a renderizar 
        */
    //La siguiente manera para renderizar el contenido se denomina fragment
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img
                  className="img-fluid"
                  src="/img/logo.svg"
                  alt="imagen logo"
                />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img
                  className="img-fluid"
                  src={`${import.meta.env.BASE_URL}/img/carrito.png`}
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-3">
                  {isEmpty ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((guitar) => (
                            <tr key={guitar.id}>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={`${import.meta.env.BASE_URL}/img/${guitar.image}.jpg`}
                                  alt="imagen guitarra"
                                />
                              </td>
                              <td>{guitar.name}</td>
                              <td className="fw-bold">${guitar.price}</td>
                              <td className="flex align-items-start gap-4">
                                <button
                                  type="button"
                                  onClick={()=>incrementarQuantity(guitar.id)/*aqui se pasa la funcion como un callback para que se ejecute una sola vez*/}
                                  className="btn btn-dark"
                                >
                                  {" "}
                                  +{" "}
                                </button>
                                {guitar.quantity}
                                <button
                                  type="button"
                                  onClick={()=>decrementarQuantity(guitar.id)}
                                  className="btn btn-dark"
                                >
                                  {" "}
                                  -{" "}
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={()=>removeFromToCart(guitar.id)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-end">
                        Total pagar: <span className="fw-bold">${ cartTotal}</span>
                      </p>
                    </>
                  )}

                  <button className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {/* Zona de la vista que se */}
    </>
  );
}
