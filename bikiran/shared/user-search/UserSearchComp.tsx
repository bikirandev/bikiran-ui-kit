import { UserSearchField } from "bik-inputs";
import React, { FC, useEffect, useState } from "react";
import { ApiSearchUser } from "./UserSearchOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

type TProps = {
  formData: any;
  setFormData: (data: any) => void;
  selectedUser: any;
  setSelectedUser: (data: any) => void;
  userData: any[];
  setUserData: (data: any[]) => void;
};

const UserSearchComp: FC<TProps> = ({
  setUserData,
  formData,
  selectedUser,
  setFormData,
  setSelectedUser,
  userData,
}) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { authInfo, chkLoginReq } = useAuth2();

  // get user
  useEffect(() => {
    // Debounce the search input
    const debounceTimeout = setTimeout(() => {
      if (debouncedValue.length > 2) {
        setLoading(true);
        ApiSearchUser(authInfo, chkLoginReq, debouncedValue)
          .then(({ data }) => {
            if (data?.users) {
              setUserData(data.users);
            } else {
              setUserData([]);
            }
          })
          .catch((err: Error) => {
            console.error("Error fetching user data:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUserData([]);
      }
    }, 800); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout); // Cleanup on input or component unmount
  }, [debouncedValue, authInfo, chkLoginReq]);

  return (
    <UserSearchField
      formData={formData}
      label="Search User"
      loading={loading}
      selectedUser={selectedUser}
      setDebouncedValue={setDebouncedValue}
      setFormData={setFormData}
      setSelectedUser={setSelectedUser}
      userData={userData}
    />
  );
};

export default UserSearchComp;
