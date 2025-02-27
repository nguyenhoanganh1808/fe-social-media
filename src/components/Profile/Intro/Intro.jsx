import { GraduationCap } from "lucide-react";
import EditButton from "../EditButton/EditButton";
import styles from "./Intro.module.css";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuthContext";
import ProfileService from "../../../services/profile.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import CancelButton from "../../common/CancelButton";
import LoadingButton from "../../common/Spinner/LoadingButton";
import PropTypes from "prop-types";

export default function Intro({ userInfo }) {
  const [isEditting, setIsEditting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user, setUser } = useAuth();
  const { id } = useParams();

  const onSubmitBio = async (formData) => {
    console.log(formData);
    setLoading(true);
    try {
      await ProfileService.updateBio(formData.bio);
      setUser({ ...user, bio: formData.bio });
    } catch (e) {
      toast.error(e || "Failed to update bio");
    } finally {
      setLoading(false);
      setIsEditting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Intro</h2>
      <hr />
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmitBio)}
      >
        <textarea
          {...register("bio")}
          className={`border-none ${styles.bioInput} ${
            isEditting ? styles.bioInputActive : ""
          }`}
          name="bio"
          rows={isEditting ? 5 : "auto"}
          disabled={!isEditting}
          id="bio"
          defaultValue={userInfo.bio}
        ></textarea>
        {isEditting && (
          <div className={`${styles.buttonContainer} `}>
            <CancelButton onClick={() => setIsEditting(false)}>
              Cancel
            </CancelButton>
            <LoadingButton isLoading={loading} type="submit" className="">
              Save
            </LoadingButton>
          </div>
        )}
      </form>
      {!isEditting && id === user.userId && (
        <EditButton onClick={() => setIsEditting(!isEditting)}>
          Edit Bio
        </EditButton>
      )}
      {user.informationDetail.major && (
        <div className={styles.detailContainer}>
          <GraduationCap size={20} />

          <p> Study {userInfo.informationDetail.major} at UIT</p>
        </div>
      )}
      {/* {user.informationDetail.homeTown && (
        <div className={styles.detailContainer}>
          <MapPin size={20} />
          <p>{userInfo.informationDetail.homeTown}</p>
        </div>
      )}
      {user.informationDetail.currentCity && (
        <div className={styles.detailContainer}>
          <House size={20} />
          <p>Live at {userInfo.informationDetail.currentCity}</p>
        </div>
      )} */}
      {id === user.userId && (
        <Link to={`/profile/${user.id}/about/work-and-education`}>
          <EditButton>Edit Details</EditButton>
        </Link>
      )}
    </div>
  );
}

Intro.propTypes = {
  userInfo: PropTypes.shape({
    bio: PropTypes.string,
    informationDetail: PropTypes.shape({
      major: PropTypes.string,
      homeTown: PropTypes.string,
      currentCity: PropTypes.string,
    }),
  }),
};
