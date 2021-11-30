import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import { getPokemons, getTypes } from '../../redux/actions';
import Pokemons from '../Pokemons/Pokemons';
import SearchResults from '../SearchResults/SearchResults';
import Filters from '../Filters/Filters';


export default function Pagination() {
  const totalPages = useSelector((state) => state.totalPages);
  const navigate = useNavigate();
  const pageNumbers = new Array(totalPages).fill(0).map((_, i) => i + 1);
  let endpoint = useLocation().search;
  endpoint = endpoint.length ? endpoint : false;

  const firstPage = (event) => {
    navigate("/pokemons");
}

  const handleChangePage = (event) => {
    let pageNumber = event.target.value;
    if (!endpoint) navigate(`/pokemons?page=${pageNumber}`);
    else if (endpoint.includes("page")) {
      let newEndpoint = endpoint.split("page=")[0] + "page=" + pageNumber;
      let cutPoint = endpoint.indexOf("&");
      if (cutPoint > 0) newEndpoint += endpoint.slice(cutPoint);
      navigate(`/pokemons${newEndpoint}`);
    }
  }

  return (
    <div>
      <input type="button" value="First Page" onClick={firstPage} />
      {
        pageNumbers.map(number => (
          <input type="button" value={number} onClick={handleChangePage}/>
        ))
      }
    </div>
  )
}