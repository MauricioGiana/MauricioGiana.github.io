import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFavorite, quitFavorite } from "../../Controllers";
import { getFavorites } from '../../redux/actions';
import styles from './PokemonCard.module.css';
import { BsPersonCheckFill } from "react-icons/bs";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

export class PokemonCard extends Component {
    constructor() {
        super();
        this.state = {
            isFavorite: false
        }
    }

    componentDidMount() {
        const fetchFavs = async () => {
            await getFavorites();
            this.setState({
                isFavorite: this.props.favorites.some(fav => fav.id === this.props.id)
            })
        }
        fetchFavs();
    }


    handleAddFavorite = (event) => {
        event.preventDefault();
        const add = async () => {
            this.setState({ isFavorite: true });
            try {
                const resp = await addFavorite(this.props.id);
            } catch (error) {
                console.log(error)
            }
        }
        add();
    }

    handleQuitFavorite = (event) => {
        event.preventDefault();
        const quit = async () => {
            this.setState({ isFavorite: false });
            try {
                await quitFavorite(this.props.id);
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
                            !this.state.isFavorite ?
                                <AiOutlineStar className={styles.favIcon} onClick={this.handleAddFavorite} /> :
                                <AiTwotoneStar className={styles.favIconOn} onClick={this.handleQuitFavorite} />
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

const mapStateToProps = state => {
    return {
        favorites: state.favorites
    }
}

export default connect(mapStateToProps, { getFavorites, addFavorite, quitFavorite })(PokemonCard);


