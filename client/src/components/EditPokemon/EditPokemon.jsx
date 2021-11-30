import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import { getTypes, getPokemon } from "../../redux/actions";
import { editPokemon } from '../../Controllers';

export default function CreatePokemon() {
    const {idPokemon} = useParams();
    const [input, setInput] = useState({});

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getTypes());
                const {data} = await axios(`http://localhost:3001/pokemons/${idPokemon}`);
                setInput(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);

    const typesApi = useSelector(state => state.types);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        });
        setErrors(validate({
            ...input,
            [name]: value,
        }))
    }

    const addOrQuitType = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const type = input.types.find(t => t.name === value);
        if (type) {
            setInput({
                ...input,
                types: input.types.filter(t => t.name !== value)
            });
        } else {
            const addType = typesApi.find(t => t.name === value);
            setInput({
                ...input,
                types: [...input.types, addType]
            });
        }
    }





    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await editPokemon(idPokemon, input);
        navigate(-1)
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pokemon name:</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="url"
                        name="image"
                        value={input.image}
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
                                    value={input[stat]}
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
                    input.types?.length && input.types.map((type) => (
                        <div key={type.id}>
                            <input type="button" value={type.name} onClick={addOrQuitType}/>
                        </div>
                    ))}
                </div>
            <input type="submit" onSubmit={handleSubmit}/>
            </form>
        </div>
    );
};



export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    }
    return errors;
};
