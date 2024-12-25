import { useFormContext } from "react-hook-form";
import styles from "./AddLinks.module.css";

export default function AddLinks() {
  const { register } = useFormContext();
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="link">
        Link URL <span>*</span>
      </label>
      <hr />
      <input
        {...register("link")}
        className={styles.input}
        type="url"
        id="link"
        name="link"
      />
    </div>
  );
}
