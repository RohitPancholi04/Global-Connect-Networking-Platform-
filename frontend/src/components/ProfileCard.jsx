import { useEffect, useState } from "react";
import Card from "./Card";
import api from "../lib/axios";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Decode token to get userId
      const decoded = jwtDecode(token);
      const userId = decoded.id; // matches your backend `jwt.sign({ id })`

      const res = await api.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Card padding={0}>
      <div className="relative h-25">
        <div className="relative w-full h-22 rounded-md">
          <img
            src="https://thumbs.dreamstime.com/b/abstract-network-vector-concept-world-globe-internet-global-connection-background-abstract-network-vector-concept-103318227.jpg"
            className="rounded-t-md h-full w-full"
          />
        </div>
        <div className="absolute top-14 left-6 z-10">
          <img
            src={profile.profilePic || "not given"}
            className="rounded-full b-2 h-16 w-16 border-white cursor-pointer"
          />
        </div>
      </div>
      <div className="p-5">
        <div className="text-xl">{profile.name}</div>
        <div className="text-sm my-1">{profile.bio || "No bio"}</div>
        <div className="text-sm my-1">{profile.location || "Location not set"}</div>
        <div className="text-sm my-1">{profile.company || "No company"}</div>
      </div>
    </Card>
  );
};

export default ProfileCard;
