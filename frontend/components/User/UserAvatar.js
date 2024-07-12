import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import axios from "../../src/API";

// Import all potential avatar images
import detectiveAvatar from "../../src/images/avatars/detective-avatar.png";
import gumshoeAvatar from "../../src/images/avatars/gumshoe-avatar.png";
import sleuthAvatar from "../../src/images/avatars/sleuth-avatar.png";
import policeAvatar from "../../src/images/avatars/police-avatar.png";
import neighborAvatar from "../../src/images/avatars/neighbor-avatar.png";
import suspectAvatar from "../../src/images/avatars/suspect-avatar.png";

const avatarMap = {
  "detective-avatar": detectiveAvatar,
  "gumshoe-avatar": gumshoeAvatar,
  "sleuth-avatar": sleuthAvatar,
  "police-avatar": policeAvatar,
  "neighbor-avatar": neighborAvatar,
  "suspect-avatar": suspectAvatar,
};

const URL = "/userdata";

const UserAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [altText, setAltText] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(URL, { withCredentials: true });
        if (response.data.Status === "Success") {
          const userData = response.data.user;
          const avatarUrl = avatarMap[userData.avatar] || "";
          setAvatarUrl(avatarUrl);
          setAltText(`${userData.name}'s Avatar`);
        } else {
          console.error("User data not found");
          setAvatarUrl("");
          setAltText("");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setAvatarUrl("");
        setAltText("");
      }
    };

    fetchUserData();
  }, []);

  return (
    <Avatar
      alt={altText}
      src={avatarUrl}
      sx={{ width: 100, height: 100, border: "2px solid black", margin: 1 }}
    />
  );
};

export default UserAvatar;