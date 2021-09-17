import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IUser } from "../../utils/TypeScript";
interface IProps {
  //children: any;
  user: IUser;
//   border: any;
//   handleClose: () => void;
//   setShowFollowers: () => void;
//   setShowFollowing: () => void;
  // msg: string;
}
const UserCard: React.FC<IProps> = ({
  //children,
  user,
  
//   border,
//   handleClose,
//   setShowFollowers,
//   setShowFollowing,
  // msg,
}) => {
  // const handleCloseAll = () => {
  //     if(handleClose) handleClose()
  //     if(setShowFollowers) setShowFollowers(false)
  //     if(setShowFollowing) setShowFollowing(false)
  // }

//   const showMsg = (user: IUser) => {
//       return(
//           <>
//               <div >
//                   {user.}
//               </div>
//               {
//                   user.media.length > 0 &&
//                   <div>
//                       {user.media.length} <i className="fas fa-image" />
//                   </div>
//               }

//               {
//                   user.call &&
//                   <span className="material-icons">
//                       {
//                           user.call.times === 0
//                           ? user.call.video ? 'videocam_off' : 'phone_disabled'
//                           : user.call.video ? 'video_camera_front' : 'call'
//                       }
//                   </span>
//               }
//           </>
//       )
//   }

  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 `}
    >
      <div>
        <Link to={`/profile/${user._id}`} className="d-flex align-items-center me-1 avatar_comment">
          <img
            src={user.avatar}
            alt="avatar"
            className="big-avatar"
           
          />
        

          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.name}</span>
                        
                        <small style={{opacity: 0.7}}>
                            {
                                // msg 
                                // ? showMsg(user)
                                // : user.fullname
                                user.account
                            }
                        </small>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default UserCard;
