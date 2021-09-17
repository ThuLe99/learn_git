import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherInfo } from "../../redux/actions/userAction";
import { RootStore, IUser } from "../../utils/TypeScript";
import Loading from "../global/Loading";
import Follow from "../global/Follow"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ForumIcon from "@material-ui/icons/Forum";
interface IProps {
  id: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  const [other, setOther] = useState<IUser>();

  const { otherInfo } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
        },
      },
    })
  );
  useEffect(() => {
    if (!id) return;

    if (otherInfo.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setOther(newUser);
    }
  }, [id, otherInfo, dispatch]);

  if (!other) return <Loading />;
  return (
    <div className="profile_info text-center rounded">
      <div className="info_avatar">
        <img src={other.avatar} alt="avatar" />
      </div>

      <h5 className="text-uppercase text-danger">{other.role}</h5>

      <div>
        Name: <span className="text-info">{other.name}</span>
      </div>

      <div>Email / Phone number</div>
      <span className="text-info">{other.account}</span>

      <div>
        Join Date:{" "}
        <span style={{ color: "#ffc107" }}>
          {new Date(other.createdAt).toLocaleString()}
        </span>
      </div>
      {/* <Button
        variant="contained"
        size="small"
        style={{ marginRight: "20px" }}
        startIcon={<ForumIcon />}
      >
        Chat
      </Button> */}
      {/* <Follow user={other}/>
      <div className="follow_btn">
        <span className="mr-4">0 Followers</span>  &ensp; &ensp;
        <span className="ml-4">0 Following</span>
      </div> */}
    </div>
  );
};

export default OtherInfo;
