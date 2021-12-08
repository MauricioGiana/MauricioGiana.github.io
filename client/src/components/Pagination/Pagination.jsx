import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import styles from './Pagination.module.css';


export default function Pagination({endpoint, currentPage}) {
  const totalPages = useSelector((state) => state.totalPages);
  const navigate = useNavigate();
  const pageNumbers = new Array(totalPages).fill(0).map((_, i) => i + 1);
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
          number.toString() !== currentPage ?
          <input 
          className={styles.nocurrent}
          key={number} 
          type="button" 
          value={number} 
          onClick={handleChangePage}
          /> :
          <input 
          className={styles.current}
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