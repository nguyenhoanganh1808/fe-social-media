import styles from "./AddLinks.module.css";

export default function AddLinks() {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="link">
        Link URL <span>*</span>
      </label>
      <hr />
      <input className={styles.input} type="url" id="link" name="link" />
    </div>
  );
}
