import { GraduationCap } from "lucide-react";
import EditButton from "../EditButton/EditButton";
import PropTypes from "prop-types";
import styles from "./Intro.module.css";
import { useState } from "react";

export default function Intro({ data }) {
  const [isEditting, setIsEditting] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Intro</h2>
      <hr />

      <textarea
        className={`${styles.bioInput} ${
          isEditting ? styles.bioInputActive : ""
        }`}
        name="bio"
        rows={isEditting ? 5 : "auto"}
        disabled={!isEditting}
        id="bio"
        defaultValue={data.bio}
      ></textarea>
      {isEditting && (
        <div className={styles.buttonContainer}>
          <button onClick={() => setIsEditting(false)}>Cancel</button>
          <button onClick={() => setIsEditting(false)}>Save</button>
        </div>
      )}
      {!isEditting && (
        <EditButton onClick={() => setIsEditting(!isEditting)}>
          Edit Bio
        </EditButton>
      )}
      <div className={styles.detailContainer}>
        <GraduationCap size={40} />
        <p>Study at {data.school}</p>
      </div>
      <EditButton>Edit Details</EditButton>
    </div>
  );
}

Intro.propTypes = {
  data: PropTypes.shape({
    school: PropTypes.string,
    bio: PropTypes.string,
  }),
};
