import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getTypes, getPokemons } from '../../redux/actions';
import styles from './Filters.module.css';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

export default function Filters({ endpoint }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [showFilters, setShowFilters] = useState(false);


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
        const { value, name } = event.target;
        if (value === "Reset Pokemons") {
            resetPokemons();
        };
        if (value === "All") {
            if (endpoint && endpoint.includes("filter")) {
                endpoint = endpoint.replace(/\Dfilter=(api|db)/g, "")
                endpoint = endpoint[0] === "&" ? endpoint.replace("&", "?") : endpoint
                navigate(`/pokemons${endpoint}`);
            }
        }
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
        if (name === "type") {
            if (!endpoint || (endpoint && !endpoint.includes("type"))) {
                navigate(`/pokemons?type=${value}`);
            } else if (/type=\D+&/.test(endpoint)) {
                endpoint = endpoint.replace(/type=\D+&/, `type=${value}&`);
                navigate(`/pokemons${endpoint}`);
            } else if (/type=\D+/.test(endpoint)) {
                endpoint = endpoint.replace(/type=\D+/, `type=${value}`);
                navigate(`/pokemons${endpoint}`);
            }
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
        if (value === "speedAsc") {
            if (endpoint && endpoint.includes("order")) {
                endpoint = endpoint.split("order")[0] + "order=speed-asc";
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "order=speed-asc");
        };
        if (value === "speedDes") {
            if (endpoint && endpoint.includes("order")) {
                endpoint = endpoint.split("order")[0] + "order=speed-des";
                navigate("/pokemons" + endpoint)
            } else navigate("/pokemons" + (endpoint ? (endpoint + "&") : "?") + "order=speed-des");
        };
    }


    const handleShowFilters = (e) => {
        e.preventDefault();
        setShowFilters(!showFilters);
    }

    if (loadingTypes) return <h3>Loading types...</h3>;


    return (
        <div className={styles.filters}>
            <div className={showFilters ? styles.show2 : styles.show1} onClick={handleShowFilters} >
                <span className={styles.showfilters}>FILTERS</span>
                <IoIosArrowDroprightCircle className={showFilters ? styles.invertarrow : styles.arrow} />
            </div>
                    <div className={showFilters ? styles.filterscontainer : styles.filterscontainerout} >
                        <div className={styles.title}><span>Filters</span></div>
                        <div className={styles.divform}>
                            <form >
                                <div className={styles.form}>
                                    <div className={styles.item}>
                                        <label className={styles.label}>By origin</label>
                                        <select className={styles.select} onChange={handleSubmit}>
                                            <option label="select..." />
                                            <option value="All">All Pokemons</option>
                                            <option value="Existing">Existing</option>
                                            <option value="Created">Created</option>
                                        </select>
                                    </div>
                                    <div className={styles.item}>
                                        <label className={styles.label}>By type </label>
                                        <select className={styles.select} name='type' onChange={handleSubmit}>
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
                                    <div className={styles.item} >
                                        <label className={styles.label}>Order by speed</label>
                                        <select className={styles.select} onChange={handleSubmit}>
                                            <option label="select..." />
                                            <option value="speedAsc">Ascending</option>
                                            <option value="speedDes">Descending</option>
                                        </select>
                                    </div>
                                    <div className={styles.divreset}>
                                        <input type="button" onClick={handleSubmit} value="Reset Pokemons" />
                                    </div>
                                </div >
                            </form >
                        </div >
                    </div >
        </div>
    )
}