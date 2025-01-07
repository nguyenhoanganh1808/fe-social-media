import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileService from "../services/profile.service";

export default function useFetchUser() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);

      const result = await ProfileService.getProfileByUserId(id);
      if (result.success) {
        setUserInfo(result.data);
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  return {
    loading,
    userInfo,
  };
}
