import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, createPokemon } from "../../redux/actions";

const CreatePokemon = () => {
    const [input, setInput] = useState({
        name: '',
        Image: '',
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
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

    function handleChange(event) {
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

    function addOrQuitType(event) {
        event.preventDefault();
        const { value } = event.target;
        console.log("value", value)
        const indexType = input.types.findIndex(t => t.name === value);
        if (indexType !== -1) {
            setInput({
                ...input,
                types: input.types.splice(indexType, 1)
            });
        } else {
            const addType = typesApi.find(t => t.name === value);
            setInput({
                ...input,
                types: [...input.types, addType]
            });
        }
        console.log("input", input.types)
    }





    function handleSubmit(event) {
        event.preventDefault();
        console.log("entre a handlesubmit")
        dispatch(createPokemon(input));
        console.log("Pokemon created");
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form method="post" onChange={handleChange}>
                <div>
                    <label>Pokemon name:</label>
                    <input
                        className={errors.name && "danger"}
                        type="text"
                        name="name"
                        value={input.name}
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
                                />
                            </div>
                        ))
                    }
                </div>
            </form>
            <form onClick={addOrQuitType}>
                <label>Types: </label>
                <select name="selectTypes" multiple>
                    {
                        typesApi.map(type => (
                            <option key={type.id} value={type.name} label={type.name} />
                        ))
                    }
                </select>
                {
                    input.types.length > 0 && input.types.map((type) => (
                        <div key={type.id}>
                            <input type="button" value={type.name} />
                        </div>
                    ))}

            </form>
            <input type="button" onSubmit={handleSubmit} disabled={Object.keys(errors).length} value="Submit" />
        </div>
    );
};

export default CreatePokemon;

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    }
    return errors;
};
