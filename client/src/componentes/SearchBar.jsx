import React, { useState, useEffect } from "react";
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search'


export default function SearchBar(props) {

    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState([]);

    const getProduct = (q) => {
        console.log(q)
        axios.get("http://localhost:3000/products?q=" + q).then(data => {
            console.log(data)
            setProducts(data.data.results)
        })
    };


    return (
        <div>

            <input placeholder="buscar un producto..."
                type="text"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            />
            <i
                onClick={(e) => {
                    getProduct(searchValue)
                }}
            ><SearchIcon /></i>
        </div>
    )
}