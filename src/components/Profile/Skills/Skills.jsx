import EditButton from "../EditButton/EditButton";

import styles from "./Skills.module.css";
import SkillItem from "./SkillItem/SkillItem";
import FormEditSkills from "./FormEditSkills";
import useToggle from "../../../hooks/useToggle";
import { useAuth } from "../../../hooks/useAuthContext";

export default function Skill() {
  const { close, isOpen, open } = useToggle();
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <FormEditSkills onCloseModal={close} openModal={isOpen} />
      <h2 className={styles.title}>Skills</h2>
      <hr />
      <ul>
        {user.skills.map((skill) => {
          return <SkillItem key={skill.id} skill={skill.name} />;
        })}
      </ul>

      <EditButton
        onClick={() => {
          open();
        }}
      >
        Edit Skills
      </EditButton>
    </div>
  );
}
