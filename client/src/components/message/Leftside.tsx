import React, { useState } from "react";
import UserCard from "../global/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { IUser, RootStore } from "../../utils/TypeScript";
import { useHistory } from "react-router";
const Leftside = () => {
  const [search, setSearch] = useState("");
  const { auth, admin, message } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddUser = (user: IUser) => {
    setSearch('')
  };
  return (
    <>
      <form className="message_header">
        <input
          type="text"
          value={search}
          placeholder="Enter to Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
        <div className="message_chat_list"></div>
      </form>
      <div>
        {admin.length !== 0 ? (
          <>
            {admin.map((u) => (
              <div
                key={u._id}
                className="message_user"
                onClick={() => handleAddUser(u)}
              >
                <UserCard user={u}></UserCard>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Leftside;
