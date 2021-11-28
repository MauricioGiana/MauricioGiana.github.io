import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getPokemons } from '../../redux/actions';

export class Landing extends Component {
   /*  componentDidMount() {
        this.props.getPokemons("page=1");
    } */

    render() {

        return (
            <div>
                <h1>Pokemon</h1>
                <Link to="/pokemons">
                    <input type="button" value="To Home"/>
                </Link>
            </div>
        );
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getPokemons: (page) => dispatch(getPokemons(page))
    }
}

export default connect(null, mapDispatchToProps)(Landing);
