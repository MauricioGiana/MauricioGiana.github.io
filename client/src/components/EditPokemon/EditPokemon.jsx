import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import { getTypes } from "../../redux/actions";
import { editPokemon } from '../../Controllers';
import styles from './EditPokemon.module.css';

export default function CreatePokemon() {
    const {idPokemon} = useParams();
    const [input, setInput] = useState({});

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getTypes());
                const {data} = await axios(`http://localhost:3001/pokemons/${idPokemon}`);
                console.log("data", data);
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





    const handleSubmit = async (event) => {
        event.preventDefault();
        await editPokemon(idPokemon, input);
        navigate(-1)
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={styles.divedit}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pokemon name: </label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image: </label>
                    <input
                        type="url"
                        name="image"
                        value={input.image}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {
                        ['hp', 'attack', 'defense', 'speed', 'height', 'weight'].map(stat => (
                            <div key={stat}>
                                <label>{stat[0].toUpperCase() + stat.slice(1)}: </label>
                                <input
                                    type="number"
                                    name={stat}
                                    value={input && input[stat]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))
                    }
                </div>
                <div>
                <label>Types: </label>
                <select name="selectTypes" onClick={addOrQuitType} multiple>
                    {
                        typesApi.map(type => (
                            <option key={type.id} value={type.name} label={type.name} />
                        ))
                    }
                </select>
                {
                    input.types?.length > 0 && input.types.map((type) => (
                        <div key={type}>
                            <input type="button" value={type} onClick={addOrQuitType}/>
                        </div>
                    ))}
                </div>
            <input type="submit" onSubmit={handleSubmit} value="Save changes"/>
            </form>
        </div>
    );
};


