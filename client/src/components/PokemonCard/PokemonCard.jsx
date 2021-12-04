import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFavorite, quitFavorite } from "../../Controllers"
import styles from './PokemonCard.module.css';
import { BsPersonCheckFill } from "react-icons/bs";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

export class PokemonCard extends Component {
    isFavorite = false;

    handleAddFavorite = (event) => {
        event.preventDefault();
        const add = async () => {
            try {
                console.log("entre a add fav")
                await addFavorite(this.props.id);
                this.isFavorite = !this.isFavorite;
            } catch (error) {
                console.log(error)
            }
        }
        add();
    }

    handleQuitFavorite = (event) => {
        event.preventDefault();
        const quit = async () => {
            try {
                console.log("entre a delete fav")
                await quitFavorite(this.props.id);
                this.isFavorite = !this.isFavorite;
            } catch (error) {
                console.log(error)
            }
        }
        quit();
    }

    render() {

        return (
            <div className={styles.pokemoncard}>
                <div className={styles.divHead}>
                    <div>
                        {
                            this.props.isCreated && <BsPersonCheckFill className={styles.customIcon} />
                        }
                    </div>
                    <div className={styles.divTitle}>
                        <Link className={styles.name} to={`/pokemons/${this.props.id}`}>
                            <h3>{this.props.name}</h3>
                        </Link>
                    </div>
                    <div>
                        {
                            !this.isFavorite ?
                                <AiOutlineStar className={styles.favIcon} onClick={this.handleAddFavorite} /> :
                                <AiTwotoneStar className={styles.favIcon} onClick={this.handleQuitFavorite} />
                        }
                    </div>
                </div>
                <div className={styles.titleBox}>
                    <Link to={`/pokemons/${this.props.id}`}>
                        <div className={styles.divImg}>
                            <img className={styles.pokeimg} src={this.props.image} alt={this.props.name} />
                        </div>
                    </Link>
                </div>
                <div className={styles.divTypes}>
                    <span className={styles.types}>TYPES </span>
                    <div className={styles.typesContainer}>
                        {this.props.types?.map(type => (
                            <span key={type.id}>{type.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
};



export default connect(null, { addFavorite, quitFavorite })(PokemonCard);


