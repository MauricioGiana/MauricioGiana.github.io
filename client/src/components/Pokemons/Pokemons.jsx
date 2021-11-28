import React, { Component } from 'react';
import { connect } from 'react-redux';
import PokemonCard from '../PokemonCard/PokemonCard';
import { getPokemons } from '../../redux/actions';

export class Pokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount = async () => {
        try {
            await this.props.getPokemons(`page=${this.props.page}`);
            this.setState({ loading: false });
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }
        return (
            <div>
                {
                    this.props.pokemons?.map((pokemon) => {
                        return <PokemonCard 
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                        image={pokemon.image}
                        isFavorite={pokemon.isFavorite}
                        />
                    })
                }
            </div>
        );
    };
};


export const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        page: state.page,
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getPokemons: (page) => dispatch(getPokemons(page))
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);