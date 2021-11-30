import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch } from 'react-redux';

export default function NavBar() {
    const navigate = useNavigate();


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <input type="button" value="Home" onClick={() => navigate("/pokemons")}/>
            <input type="button" value="Create Pokemon" onClick={() => navigate("/pokemons/create")}/>
            <input type="button" value="Favorites" onClick={() => navigate("/pokemons/favorites")}/>
            <input type="button" value="My Pokemons" onClick={() => navigate("/pokemons/mypokemons")}/>
            <SearchBar/>
        </nav>
    )
}