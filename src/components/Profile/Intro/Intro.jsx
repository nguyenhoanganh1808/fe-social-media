import { GraduationCap } from "lucide-react";
import EditButton from "../EditButton/EditButton";
import PropTypes from "prop-types";
import styles from "./Intro.module.css";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuthContext";
import ProfileService from "../../../services/profile.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Intro({ data }) {
  const [isEditting, setIsEditting] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user, setUser } = useAuth();

  const onSubmitBio = async (formData) => {
    console.log(formData);
    try {
      await ProfileService.updateBio(formData.bio);
      setUser({ ...user, bio: formData.bio });
    } catch (e) {
      toast.error(e || "Failed to update bio");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Intro</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmitBio)}>
        <textarea
          {...register("bio")}
          className={`${styles.bioInput} ${
            isEditting ? styles.bioInputActive : ""
          }`}
          name="bio"
          rows={isEditting ? 5 : "auto"}
          disabled={!isEditting}
          id="bio"
          defaultValue={user.bio}
        ></textarea>
        {isEditting && (
          <div className={styles.buttonContainer}>
            <button onClick={() => setIsEditting(false)}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        )}
      </form>
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
