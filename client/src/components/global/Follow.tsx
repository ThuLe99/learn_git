import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../utils/TypeScript";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ForumIcon from "@material-ui/icons/Forum";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { IParams, RootStore, IBlog } from '../../utils/TypeScript'
import { follow } from "../../redux/actions/userAction";
interface IProps {
  user: IUser;
}
const Follow: React.FC<IProps> = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const { auth, otherInfo } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  console.log({ user });
  console.log("1");
  // useEffect(() => {
  //     if(auth.user.following.find(item => item._id === user._id)){
  //         setFollowed(true)
  //     }
  //     return () => setFollowed(false)
  // }, [auth.user.following, user._id])

  const handleFollow =  async () => {
    
      setFollowed(true)
      console.log("1")

      await dispatch(follow(otherInfo, user, auth))
    
  }

  const handleUnFollow = async () => {
      if(load) return;

      setFollowed(false)
      setLoad(true)
      //await dispatch(unfollow({users: profile.users, user, auth, socket}))
      setLoad(false)
  }

  return (
    <>
      {followed ? (
        <Button
          variant="contained"
          size="small"
          style={{ marginRight: "20px" }}
          startIcon={<PersonAddIcon />}
          onClick ={handleUnFollow}
        >
          Unollow
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          style={{ marginRight: "20px" }}
          startIcon={<PersonAddIcon />}
          onClick ={handleFollow}
        >
          Follow
        </Button>
      )}
      {/* {
            followed
            ? <button className="btn btn-outline-danger"
            onClick={handleUnFollow}>
                UnFollow
            : <button className="btn btn-outline-info"
            onClick={handleFollow}>
                Follow
            </button>
        } */}
    </>
  );
};

export default Follow;
