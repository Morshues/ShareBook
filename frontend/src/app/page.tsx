import styles from './page.module.css'

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a href={'/user'}>User Page</a>
      </div>
    </main>
  )
}
