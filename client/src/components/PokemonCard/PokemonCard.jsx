import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {addFavorite} from '../../redux/actions';

export class PokemonCard extends Component {

    
    setFavorite = () => {
        this.props.addFavorite(this.props.id);
    }

    render() {

        return (
            <div>
                <Link to={`/pokemons/${this.props.id}`}>
                    <h3>{this.props.name}</h3>
                </Link>
                <img src={this.props.image} alt={this.props.name}/>
                <p>Types</p>
                {this.props.types?.map(type => (
                    <div key = {type.id}>
                    <p>{type.name}</p>
                    <p>{type.id}</p>
                    </div>
                ))}
                <div>
                    <input type="button" value="Add to Favorites" onClick={this.setFavorite} />
                </div>
            </div>
        );
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: (id) => dispatch(addFavorite(id))
    }
}

export default connect(null, mapDispatchToProps)(PokemonCard);


