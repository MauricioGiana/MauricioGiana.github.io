import styles from './Loading.module.css';

export default function Loading() {
    return (
        <div className={styles.divloading}>
            <img className={styles.loadingImg} src="https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif" alt="..." />
            <p className={styles.loading}>Loading...</p>
        </div>
    )   
}