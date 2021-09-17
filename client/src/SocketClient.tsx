import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "./utils/TypeScript";
import { IComment } from "./utils/TypeScript";
import { CREATE_COMMENT, REPLY_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,DELETE_REPLY , UPDATE_REPLY} from "./redux/types/commentType";
const SocketClient = () => {
  const { auth, socket } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  //crate comment
  useEffect(() => {
    if (!socket) return;

    socket.on("createComment", (data: IComment) => {
      dispatch({
        type: CREATE_COMMENT,
        payload: data,
      });
    });
    return () => {
      socket.off("createComment");
    };
  }, [socket, dispatch]);

  //reply
  useEffect(() => {
    if (!socket) return;

    socket.on("replyComment", (data: IComment) => {
      dispatch({ type: REPLY_COMMENT, payload: data });
    });

    return () => {
      socket.off("replyComment");
    };
  }, [socket, dispatch]);
  // Update Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("updateComment", (data: IComment) => {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socket.off("updateComment");
    };
  }, [socket, dispatch]);

  // Delete Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("deleteComment", (data: IComment) => {
      dispatch({
        type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socket.off("deleteComment");
    };
  }, [socket, dispatch]);

  return <div></div>;
};
export default SocketClient;
