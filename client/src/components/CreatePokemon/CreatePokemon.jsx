import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getTypes } from "../../redux/actions";
import { createPokemon } from '../../Controllers';
import styles from './CreatePokemon.module.css';

export default function CreatePokemon() {
    const [input, setInput] = useState({
        name: "",
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
    }

    const addOrQuitType = (event) => {
        event.preventDefault();
        const { value } = event.target;
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
        const create = async () => {
            event.preventDefault();
            const response = await createPokemon(input);
            navigate("/pokemons/mypokemons");
            console.log(response);
        }
        create();
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={styles.create}>
            <div className={styles.header}>
                <input className="back" type="button" value="<< Back" onClick={() => navigate(-1)} />
                <h1>Create a new Pokemon</h1>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formbody}>
                        <div className={styles.group}>
                            <div className={styles.item}>
                                <label>Name: </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    maxLength="20"
                                />
                            </div>
                            <div className={styles.item}>
                                <label>Image: </label>
                                <input
                                    className={styles.input}
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
                                            className={styles.input}
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
                                            input.types.length > 0 && input.types.map((type) => (
                                                <div key={type}>
                                                    <input className={styles.input} type="button" value={type} onClick={addOrQuitType} />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.submit}>
                        <div className={styles.divsubmit}>
                            <input type="submit" value="Create!!" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};



/* export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    }
    return errors;
}; */
