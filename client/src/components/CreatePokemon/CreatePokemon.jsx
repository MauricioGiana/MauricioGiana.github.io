import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, createPokemon } from "../../redux/actions";

export default function CreatePokemon() {
    const [input, setInput] = useState({
        types: [],
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
        console.log("entre a handlesubmit")
        await dispatch(createPokemon(input));
        console.log("Pokemon created");
        console.log("input", input);
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form>
                <div>
                    <label>Pokemon name:</label>
                    <input
                        className={errors.name && "danger"}
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className="danger">{errors.name}</p>
                    )}
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
                        ['Hp', 'Attack', 'Defense', 'Speed', 'Height', 'Weight'].map(stat => (
                            <div key={stat}>
                                <label>{stat}: </label>
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
                    input.types.length > 0 && input.types.map((type) => (
                        <div key={type.id}>
                            <input type="button" value={type.name} onClick={addOrQuitType}/>
                        </div>
                    ))}
                </div>
            <input type="submit" onSubmit={handleSubmit} disabled={Object.keys(errors).length} />
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
