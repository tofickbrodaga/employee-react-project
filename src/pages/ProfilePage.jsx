import React, { useEffect } from "react";
import { Text } from "@consta/uikit/Text";
import { getToken } from "../../services/token";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../store/store";


const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userInfo = await response.json();
        dispatch(setUser(userInfo));
      } catch (err) {
        setError(err.message || "An error occurred while fetching user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

    return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "60vw" }}>
      <div>
        <Text size="xl" weight="bold">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text view="secondary">{user?.email}</Text>
        <Text view="secondary" style={{ marginTop: "8px" }}>
          Username: {user?.username}
        </Text>
        <Text view="secondary">Phone: {user?.phone}</Text>
        <Text view="secondary">Age: {user?.age}</Text>
      </div>
      <img
        src={user?.image}
        alt="User Profile"
        style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "16px" }}
      />
    </div>
  );
};

export default ProfilePage;
