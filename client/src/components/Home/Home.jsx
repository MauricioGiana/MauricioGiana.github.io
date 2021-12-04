import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getPokemons, getTypes } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Pokemons from '../Pokemons/Pokemons';
import SearchResults from '../SearchResults/SearchResults';
import Filters from '../Filters/Filters';
import Pagination from '../Pagination/Pagination';
import styles from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();
    let endpoint = useLocation().search;
    endpoint = endpoint.length ? endpoint : false;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemons());
                await dispatch(getTypes());
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }
    if (endpoint && endpoint.includes("search")) {
        return <SearchResults />
    }

    return (
        <div className={styles.home}>
            <div className={styles.content}>
                <div className={styles.filters}>
                <Filters />
                    </div>
                <div className={styles.pokemons}>
            <p className={styles.title}>Pokemons</p>
                    <Pokemons />
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

