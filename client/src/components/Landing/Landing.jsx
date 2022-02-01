import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getPokemons } from '../../redux/actions';
import pokemonlogo from '../../assets/images/pokemonlogo.png';
import styles from './Landing.module.css';

export class Landing extends Component {


    componentDidMount() {
        getPokemons();
    }

    render() {

        return (
            <div className={styles.landing}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <img src={pokemonlogo} alt="pokemonlogo" />
                        <h2>Henry Individual Project</h2>
                    </div>
                    <Link className={styles.linkhome} to="/pokemons">
                        <p>To Home</p>
                    </Link>
                </div>
            </div>
        );
    };
};


export default connect(null, { getPokemons })(Landing);
