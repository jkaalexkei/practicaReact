//el nombre del props aca se coloca entre llaves por ser un objeto y se coloca entre llaves
export default function Guitar({ guitar,setCart,addToCart } /*aqui va el nombre del props*/) {
  const { id, name, description, image, price } = guitar; //aqui se hace destructuring del props que esta recibiendo


  return (
    <>
      <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
          <img
            className="img-fluid"
            src={`${import.meta.env.BASE_URL}/img/${image}.jpg`} 
            alt={name}
          />
        </div>
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>{description}</p>
          <p className="fw-black text-primary fs-3">${price}</p>
          <button type="button" className="btn btn-dark w-100" onClick={()=>addToCart(guitar)} >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </>
  );
}


// onClick={()=>setCart(prevCart => [...prevCart, guitar])} agrega elementos al carrito tomando una copia antes del arreglo y agregar el nuevo elemento