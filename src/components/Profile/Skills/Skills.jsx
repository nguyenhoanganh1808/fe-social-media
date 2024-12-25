import EditButton from "../EditButton/EditButton";
import PropTypes from "prop-types";
import styles from "./Skills.module.css";
import { useState } from "react";
import SkillItem from "./SkillItem/SkillItem";

export default function Skill({ data }) {
  const [isEditting, setIsEditting] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Skills</h2>
      <hr />
      <ul>
        {data.skills.map((skill, index) => {
          return <SkillItem key={`${skill}-${index}`} skill={skill} />;
        })}
      </ul>

      {!isEditting && (
        <EditButton onClick={() => setIsEditting(!isEditting)}>
          Edit Skills
        </EditButton>
      )}
    </div>
  );
}

Skill.propTypes = {
  data: PropTypes.shape({
    skills: PropTypes.arrayOf(PropTypes.string),
  }),
};
