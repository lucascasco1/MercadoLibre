import '../App.css'
import axios from 'axios'
import style from "./Product.Module.css";
import React, { useState, useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';
import logo from "./logo.png"

const Home = () => {
  function Buscar({ producto }) {
    function Stock() {
      let dispon = "Stock no disponible";
      if (producto.available_quantity > 0) {
        dispon = producto.available_quantity;
      }
      return dispon
    }
    return (


      <div className={style.container}>

        <div className={style.card}>

          <div className={style.imgBx}>
            <img src={producto.thumbnail} />

          </div>

          <div className={style.contentBx}>

            {/* <h2>{name}</h2> */}
            <div className={style.description}>
              <p className={style.titulo}>{producto.title}</p>
              <h1 className={style.precio}>{producto.currency_id}${producto.price}</h1>
              <h1 className={style.stock}>Stock:{Stock()}</h1>
              <a href={producto.permalink} target='_blank' className={style.verMas}>ver mas </a>
            </div>
            <p className={style.condicion}>{producto.condition}</p>
          </div>
        </div>
      </div>


    )
  }
  const [searchValue, setSearchValue] = useState("");
  const [renderBuscar, setRenderBuscar] = useState(false);
  const [BuscarDetalle, setBuscarDetalle] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [stateProduct, setStateProduct] = useState("default");
  const [orderProducts, setOrderProducts] = useState("default");
  const [offset, setOffset] = useState(0);

  const orderFilteredProducts = (state) => {
    return products.filter(p => p.condition === state)
  }

  const ascendente = (a,b) =>{
    return a.price - b.price
  }

  const descendente = (a,b) =>{
    return b.price - a.price
  }

  const ordenar = () =>{
    console.log("dentro de useEffect")
    console.log(orderProducts)
    if (orderProducts === "ascendente") {
      // setFilteredProducts(products.sort(ascendente))
      const data=filteredProducts;
      console.log(data, "aca la data")
      data.sort(ascendente)
      console.log(data, "nueva")
      setFilteredProducts(data)
    }
    else if (orderProducts === "descendente") {
      setFilteredProducts(filteredProducts.sort(descendente))
    }
    else {
      setOrderProducts: clone(products)
      // setOrderProducts(products)
    }
  }

  useEffect(() => {
    ordenar()
  }, [orderProducts])

  useEffect(() => {
    console.log(stateProduct)
    if (stateProduct === "new") {
      setFilteredProducts(orderFilteredProducts(stateProduct))
    }
    else if (stateProduct === "used") {
      setFilteredProducts(orderFilteredProducts(stateProduct))
    }
    else {
      setFilteredProducts(products)
    }

  }, [stateProduct])

  // useEffect(() => {
  //   setFilteredProducts(products)
  // }, [products])



  useEffect(() =>{
  if(searchValue !== ""){
    getProduct(searchValue, offset)
  }
  }, [offset])

  const anterior = () =>{
    setOffset(offset - 5);
  }

  const aumentar = () =>{
    setOffset(offset + 5);
  }

  function Anterior() {
    return (
      <div>
        <button onClick={anterior}>
          anterior
            </button>
      </div>
    );
  }

  function Siguiente() {
    console.log(offset)
    return (
      <div className={style.sig} >
        <button onClick={aumentar}>
          siguiente
            </button>
      </div>
    );
  }


  const clone = matriz => matriz.map(i => (Array.isArray(i) ? clone(i) : i));


  // const getProduct = (q) => {
  //   console.log(q)
  //   axios.get("http://localhost:3000/products?q=" + q).then(data => {
  //     console.log(data)
  //     setProducts(data.data.results)
  //   })
  // };.

  const getProduct = (q, offset) => {
    let data = {
      q,
      offset
    }
    axios.post("http://localhost:3000/products",data).then(data => {
      console.log(data)
      setFilteredProducts(data.data.results)
    })
  }


  const changeStateProduct = (e) => {
    setStateProduct(e.target.value)
  }

  const changeOrderProduct = (e) => {
    setOrderProducts(e.target.value)
  }


  return (
    <div>

      <input

        placeholder="Busca un producto..."
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />



      <div>
        <i
          className={style.searchButton}
          value={1}
          onClick={(e) => {
            getProduct(searchValue, offset)
          }}
        ><SearchIcon /></i>

        <>
          <select className={style.ord} requiered name="all" id="all" onChange={changeOrderProduct} value = {orderProducts}>
            <option value="ascendente">descendente</option>
            <option value="descendente">ascendente</option>
          </select>
        </>
        <>
          <select className={style.estado} requiered name="all" id="all" onChange={changeStateProduct}>
            <option value="default">default</option>
            <option value="new">nuevo</option>
            <option value="used">usado</option>
          </select>
        </>

        <div>
          {Anterior()}
          {Siguiente()}
        </div>
      </div>
      <img className={style.logo} src={logo} />
      {filteredProducts && filteredProducts.length ?

        filteredProducts.map((producto) => {
          return (
            <Buscar producto={producto}

            />

          )
        }) :
        <h2>No hay productos disponibles...</h2>
      }
    </div>)
}



export default Home
