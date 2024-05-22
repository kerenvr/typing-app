import styles from './footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} BloomType. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
