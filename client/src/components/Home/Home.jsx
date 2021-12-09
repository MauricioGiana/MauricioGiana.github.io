import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getPokemons, getTypes, getFavorites } from '../../redux/actions';
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
    let currentPage = endpoint && endpoint.includes("page") ? endpoint.split("page=")[1].split("&")[0] : false;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemons());
                await dispatch(getTypes());
                await dispatch(getFavorites());
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
                <Filters endpoint={endpoint} />
                    </div>
                <div className={styles.pokemons}>
            <p className={styles.title}>Pokemons</p>
                    <Pokemons />
                    <Pagination endpoint={endpoint} currentPage={currentPage} />
                </div>
            </div>
        </div>
    );
};

