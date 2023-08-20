import styles from './page.module.css'

export default function Page() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <a href={`${process.env.BACKEND_URL}/oauth2/authorization/google`}>Login</a>
            </div>
        </main>
    )
}
