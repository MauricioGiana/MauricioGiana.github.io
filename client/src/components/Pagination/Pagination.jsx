import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from './Pagination.module.css';


export default function Pagination({endpoint, currentPage}) {
  const totalPages = useSelector((state) => state.totalPages);
  const navigate = useNavigate();
  const pageNumbers = new Array(totalPages).fill(0).map((_, i) => i + 1);

  const firstPage = (event) => {
    event.preventDefault();
    if (endpoint && endpoint.includes("page")) {
      endpoint = endpoint.replace(/page=\d+/, "page=1");
      navigate(`/pokemons${endpoint}`);
    } else if (endpoint) {
      navigate(`/pokemons${endpoint}`);
    } else navigate("/pokemons");
}

const lastPage = (event) => {
  event.preventDefault();
    if (endpoint && endpoint.includes("page")) {
      endpoint = endpoint.replace(/page=\d+/, `page=${totalPages}`);
      navigate(`/pokemons${endpoint}`);
    } else if (endpoint) {
      navigate(`/pokemons${endpoint}&page=${totalPages}`);
    } else navigate(`/pokemons?page=${totalPages}`);
}



  const handleChangePage = (event) => {
    let pageNumber = event.target.value;
    if (endpoint && endpoint.includes("page")) {
      endpoint = endpoint.replace(/page=\d+/, `page=${pageNumber}`);
      navigate(`/pokemons${endpoint}`);
    } else if (endpoint) {
      navigate("/pokemons" + endpoint + "&page=" + pageNumber);
    } else navigate(`/pokemons?page=${pageNumber}`);
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