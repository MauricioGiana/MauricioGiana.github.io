import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTypes } from "../../redux/actions";
import { editPokemon } from '../../Controllers';
import styles from './EditPokemon.module.css';

export default function CreatePokemon() {
    const { idPokemon } = useParams();
    const [input, setInput] = useState({
        name: '',
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
        } else {
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
                        <div className={styles.item}>
                            <label>Image: </label>
                            <input
                                className={styles.url}
                                type="url"
                                name="image"
                                value={input.image}
                                onChange={handleChange}
                                maxLength="255"
                            />
                        </div>
                    </div>
                    <div className={styles.group}>
                        {
                            ['hp', 'attack', 'defense', 'speed', 'height', 'weight'].map(stat => (
                                <div className={styles.item} key={stat}>
                                    <label>{stat[0].toUpperCase() + stat.slice(1)}: </label>
                                    <input
                                        className={styles.stat}
                                        type="number"
                                        name={stat}
                                        value={input[stat]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.group}>
                        <div className={styles.types}>
                            <label>Types: </label>
                            <div className={styles.typeslist}>
                                <select name="selectTypes" onClick={addOrQuitType} multiple size="10">
                                    {
                                        typesApi.map(type => (
                                            <option key={type.id} value={type.name} label={type.name} />
                                        ))
                                    }
                                </select>
                                <div className={styles.selected}>
                                    {
                                        input.types?.length > 0 && input.types.map((type) => (
                                            <input key={type} type="button" value={type} onClick={addOrQuitType} />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.submit}>
                    <div className={styles.divsubmit}>
                        <input type="submit" onSubmit={handleSubmit} value="Save changes" />
                    </div>
                </div>
            </form>
        </div>
    );
};


