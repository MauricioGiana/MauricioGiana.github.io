import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getTypes, getPokemonsByType, getPokemons } from '../../redux/actions';
import styles from './Filters.module.css';

export default function Filters({endpoint}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingTypes, setLoadingTypes] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getTypes());
                setLoadingTypes(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);

    const types = useSelector(state => state.types);

    const resetPokemons = () => {
        const reset = async () => {
            try {
                await dispatch(getPokemons());
                navigate('/pokemons');
            }
            catch (error) {
                console.log(error);
            }
        }
        reset();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { value } = event.target;
        if (value === "Reset Pokemons") {
            resetPokemons();
        };
        if (value === "Existing") {
            if (endpoint && endpoint.includes("filter=db")) {
                endpoint = endpoint.replace("filter=db", "filter=api");
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "filter=api");
        };
        if (value === "Created") {
            if (endpoint && endpoint.includes("filter=api")) {
                endpoint = endpoint.replace("filter=api", "filter=db");
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "filter=db");
        };
        if (value === "nameAsc") {
            if (endpoint && endpoint.includes("order")) {
                endpoint = endpoint.split("order")[0] + "order=name-asc";
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "order=name-asc");
        };
        if (value === "nameDes") {
            if (endpoint && endpoint.includes("order")) {
                endpoint = endpoint.split("order")[0] + "order=name-des";
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "order=name-des");
        };
        if (value === "attackAsc") {
            if (endpoint && endpoint.includes("order")) {
                endpoint = endpoint.split("order")[0] + "order=attack-asc";
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "order=attack-asc");
        };
        if (value === "attackDes") {
            if (endpoint && endpoint.includes("order")) {
                endpoint = endpoint.split("order")[0] + "order=attack-des";
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "order=attack-des");
        };
    }

    const filterTypes = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const filter = async () => {
            try {
                await dispatch(getPokemonsByType(value));
            } catch (error) {
                console.log(error);
            }
        }
        filter();
    }

    if (loadingTypes) return <h3>Loading types...</h3>;

    return (
        <div className={styles.filterscontainer}>
            <div className={styles.title}><span>Filters</span></div>
            <div className={styles.divform}>
                <form >
                    <div className={styles.form}>
                        <div className={styles.item}>
                            <label className={styles.label}>By origin</label>
                            <select className={styles.select} onChange={handleSubmit}>
                                <option label="select..." />
                                <option value="Existing">Existing</option>
                                <option value="Created">Created</option>
                            </select>
                        </div>
                        <div className={styles.item}>
                            <label className={styles.label}>By type </label>
                            <select className={styles.select} onChange={filterTypes}>
                                <option label="select..." />
                                {
                                    types.map(type => (
                                        <option key={type.id} value={type.name}>{type.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={styles.item}>
                            <label className={styles.label}>Order by name</label>
                            <select className={styles.select} onChange={handleSubmit}>
                                <option label="select..." />
                                <option value="nameAsc">Ascending</option>
                                <option value="nameDes">Descending</option>
                            </select>
                        </div>
                        <div className={styles.item} >
                            <label className={styles.label}>Order by attack</label>
                            <select className={styles.select} onChange={handleSubmit}>
                                <option label="select..." />
                                <option value="attackAsc">Ascending</option>
                                <option value="attackDes">Descending</option>
                            </select>
                        </div>
                        <div className={styles.divreset}>
                            <input type="button" onClick={handleSubmit} value="Reset Pokemons" />
                        </div>
                    </div >
                </form >
            </div >
        </div >
    )
}