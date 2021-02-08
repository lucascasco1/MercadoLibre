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
  const [offset, setOffset] = useState();

  const orderFilteredProducts = (state) => {
    return products.filter(p => p.condition === state)
  }
  useEffect(() => {
    console.log("dentro de useEffect")
    console.log(orderProducts)
    if (orderProducts === "ascendente") {
      setFilteredProducts(sortProducts(filteredProducts, orderProducts))
    }
    else if (orderProducts === "descendente") {
      setFilteredProducts(sortProducts(filteredProducts, orderProducts))
      console.log("aaa")
    }
    else {
      setOrderProducts: clone(products)
      // setOrderProducts(products)
    }
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

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  function Paginacion() {
    const [offset, setOffset] = useState(0);

    return (
      <div>
        <button onClick={() => setOffset(offset + 5)}>
          siguiente
            </button>
      </div>
    );
  }

  const sortProducts = (arr, c) => {
    return arr.sort((a, b) => {
      if (((a.price > b.price) && c === 'ascendente') || ((a.price < b.price) && c === 'descendente')) {
        return 1;
      }
      else if (((a.price > b.price) && c === 'descendente') || ((a.price < b.price) && c === 'ascendente')) {
        return -1;
      }
      return 0
    })
  }

  const clone = matriz => matriz.map(i => (Array.isArray(i) ? clone(i) : i));


  const getProduct = (q) => {
    console.log(q)
    axios.get("http://localhost:3000/products?q=" + q).then(data => {
      console.log(data)
      setProducts(data.data.results)
    })
  };


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
            getProduct(searchValue)
          }}
        ><SearchIcon /></i>

        <>
          <select className={style.ord} requiered name="all" id="all" onChange={changeOrderProduct}>
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
        {Paginacion()}
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
