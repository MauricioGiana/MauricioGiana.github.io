import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTypes } from "../../redux/actions";
import { editPokemon } from '../../Controllers';
import styles from './EditPokemon.module.css';
import PokemonTypes from '../PokemonTypes/PokemonTypes';

export default function CreatePokemon() {
    const { idPokemon } = useParams();
    const [input, setInput] = useState({
        name: '',
        image: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showTypes, setShowTypes] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getTypes());
                let { data } = await axios(`http://localhost:3001/pokemons/${idPokemon}`);
                data.types = data.types.map(type => type.name);
                setInput(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch, idPokemon]);

    const typesApi = useSelector(state => state.types);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        });
    }

    const addOrQuitType = (event) => {
        event.preventDefault();
        const { value } = event.target;
        if (!input.types) input.types = [];
        const type = input.types.find(t => t === value);
        if (type) {
            setInput({
                ...input,
                types: input.types.filter(t => t !== value)
            });
        } else if (input.types.length < 3) {
            setInput({
                ...input,
                types: [...input.types, value]
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const edit = async () => {
            try {
                editPokemon(idPokemon, input);
                navigate(-1)
            } catch (error) {
                console.log(error);
            }
        }
        edit();
    }

    const handleClear = (event) => {
        event.preventDefault();
        setInput({
            ...input,
            image: "",
        });
    }

    const handleShowTypes = (event) => {
        event.preventDefault();
        setShowTypes(!showTypes);
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={styles.divedit}>
            <div className={styles.header}>
                <input className="back" type="button" value="<< Back" onClick={() => navigate(-1)} />
                <h1>Edit Pokemon</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formbody}>
                    <div className={styles.group}>
                        <div className={styles.item}>
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                                maxLength="20"
                            />
                        </div>
                        <div className={styles.imagebox}>
                            <label>Image: </label>
                            <div className={styles.itemimg}>
                                <textarea
                                    className={styles.inputimg}
                                    name="image"
                                    value={input.image}
                                    onChange={handleChange}
                                    maxLength="255"
                                >
                                </textarea>
                                {
                                    input.image.length > 0 && <span className={styles.clear} onClick={handleClear}>X</span>
                                }
                                {
                                    input.image.length > 0 && <img src={input.image} alt="" />
                                }
                            </div>
                        </div>
                        <div className={styles.item}>
                                <div className={styles.types}>
                                    <input className={styles.showtypes} onClick={handleShowTypes} type="button" value="Types >>" />
                                    {
                                        input.types.length > 0 && <div className={styles.selectedtypes}>
                                            {
                                                input.types.map(type => (
                                                    <button
                                                        key={type}
                                                        className={styles.typeselected}
                                                        onClick={addOrQuitType}
                                                        value={type}
                                                    >
                                                        <input type="image" value={type} src={PokemonTypes[type]} alt="" />
                                                        {type}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        showTypes && <div className={styles.typeslist}>
                                            {
                                                typesApi.map(type => (
                                                    <button
                                                        key={type.id}
                                                        className={input.types.find(t => t === type.name) ? styles.typeselected : styles.typebtn}
                                                        onClick={addOrQuitType}
                                                        value={type.name}
                                                    >
                                                        <input type="image" value={type.name} src={PokemonTypes[type.name]} alt="" />
                                                        {type.name}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                    </div>
                    <div className={styles.group}>
                        {
                            ['hp', 'attack', 'defense', 'speed', 'height', 'weight'].map(stat => (
                                <div className={styles.item} key={stat}>
                                    <label>{stat[0].toUpperCase() + stat.slice(1)}: </label>
                                    <input
                                        className={styles.inputnumber}
                                        type="number"
                                        name={stat}
                                        value={input[stat]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.submit}>
                        <input type="submit" onSubmit={handleSubmit} value="Save changes" />
                </div>
            </form>
        </div>
    );
};


