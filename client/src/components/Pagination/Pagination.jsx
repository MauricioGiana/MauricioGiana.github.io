import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import styles from './Pagination.module.css';


export default function Pagination() {
  const totalPages = useSelector((state) => state.totalPages);
  const navigate = useNavigate();
  const pageNumbers = new Array(totalPages).fill(0).map((_, i) => i + 1);
  let endpoint = useLocation().search;
  endpoint = endpoint.length ? endpoint : false;
  let currentPage = endpoint && endpoint.includes("page") ? endpoint.split("page=")[1].split("&")[0] : false;
  console.log("current", currentPage);

  const firstPage = (event) => {
    navigate("/pokemons");
}

const lastPage = (event) => {
  navigate(`/pokemons?page=${totalPages}` );
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
    <div className={styles.container}>
      <input type="button" value="First Page" onClick={firstPage} />
      <div className={styles.divpages }>
      {
        pageNumbers.map(number => (
          <input 
          className={currentPage === number.toString() ? styles.active : styles.page}
          key={number} 
          type="button" 
          value={number} 
          onClick={handleChangePage}
          />
        ))
      }
      </div>
      <input type="button" value="Last Page" onClick={lastPage} />
    </div>
  )
}