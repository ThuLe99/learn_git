import React, { useState, useEffect, useCallback } from "react";
import { IBlog, RootStore, IUser, IComment } from "../../utils/TypeScript";
import Comments from "../comments/Comments";
import Loading from "../global/Loading";
import Input from "../comments/Input";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createComment, getComments } from "../../redux/actions/commentAction";
import LikeBtn from "./LikeBtn";
import { getLikes, likeBlog, unLikeBlog } from "../../redux/actions/blogAction";
import EditReactQuill from "./EditBlog";
import Pagination from "../global/Pagination";
import { stateBlog } from "./../../redux/actions/adminAction";
import { log } from "console";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comment } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  //like
  const [isLike, setIsLike] = useState(0);
  const [loadLike, setLoadLike] = useState(false);
  //comment
  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  //like
  const [showLikes, setShowLikes] = useState<IBlog[]>([]);

  //update blog
  const [onEdit, setOnEdit] = useState(false);
  //update state
  const [isState, setState] = useState(0);
  const [loadState, setLoadState] = useState(false);

  const history = useHistory();

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      replyCM:[],
      createdAt: new Date().toISOString(),
    };
    setShowComments([data, ...showComments]);
    dispatch(createComment(data, auth.access_token));
  };

  useEffect(() => {
    if (comment.data.length === 0) return;
    setShowComments(comment.data);
  }, [comment.data]);

  const fetchComments = useCallback(
    async (id: string, num = 1) => {
      setLoading(true);
      await dispatch(getComments(id, num));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!blog._id) return;
    const num = history.location.search.slice(6) || 1;
    fetchComments(blog._id, num);
  }, [blog._id, fetchComments, history]);

  useEffect(() => {
    if (blog.likes.find((like) => like._id === auth.user?._id)) {
      setIsLike(1);
    }
  }, [blog.likes, auth.user?._id]);

  useEffect(() => {
    if (blog.state) {
      setState(1);
    }
  }, [blog.state]);
  const handleLike = async () => {
    console.log("isLike");

    if (loadLike) return;
    setIsLike(1);
    setLoadLike(true);
    dispatch(likeBlog(blog, auth.access_token as string));
    await dispatch(getLikes(blog._id as string));
    setLoadLike(false);
    console.log(isLike);
  };
  console.log("j");
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(0);
    setLoadLike(true);
    dispatch(unLikeBlog(blog, auth.access_token as string));
    await dispatch(getLikes(blog._id as string));
    setLoadLike(false);
  };

  useEffect(() => {
    if (!blog._id) return;
    const num = history.location.search.slice(6) || 1;
    fetchComments(blog._id, num);
  }, [blog._id, fetchComments, history]);

  const handlePagination = (num: number) => {
    if (!blog._id) return;
    fetchComments(blog._id, num);
  };


  //like
  const fetchLikes = useCallback(
    async (id: string) => {
      await dispatch(getLikes(id));
    },
    [dispatch]
  );
  return (
    <div>
      <h2
        className="text-center my-3 text-capitalize fs-1"
        style={{ color: "#ff7a00" }}
      >
        {blog.title}
      </h2>

      <div className="text-end fst-italic" style={{ color: "teal" }}>
        {/* {auth.user?.role === "admin" && (
        <li className={`nav-item ${isActive("/category")}`}>
          <Link to="/category" className="nav-link">
            Category
          </Link>
        </li>
      )} */}
        {auth.user?.role === "admin" && (
          <div className={`nav-item `}>
            <i className="fas fa-edit mx-2" onClick={() => setOnEdit(true)}></i>
          </div>
        )}
        <div>
          {onEdit && <EditReactQuill blog={blog} setOnEdit={setOnEdit} />}
        </div>
        <small>
          {typeof blog.user !== "string" && ` By: ${blog.user.name}`}
        </small>

        <small className="ms-2">
          {new Date(blog.createdAt).toLocaleString()}
        </small>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

      <div className="card_footer">
        <div
          className="d-flex justify-content-start"
          style={{ padding: "0 25px", cursor: "pointer" }}
        >
          <LikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <h6 style={{ padding: "0 25px" }}>{blog.likes.length} likes</h6>
        </div>
      </div>
      <hr className="my-1" />
      <h3 style={{ color: "yellow" }}> ❤️ Comment ❤️</h3>
      {auth.user ? (
        <Input callback={handleComment}></Input>
      ) : (
        <h5>
          Vui lòng <Link to={`/login?blog/${blog._id}`}>Đăng nhập</Link> để bình
          luận.
        </h5>
      )}

      {loading ? (
        <Loading />
      ) : (
        showComments?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))
      )}
      {comment.total > 1 && (
        <Pagination total={comment.total} callback={handlePagination} />
      )}
    </div>
  );
};

export default DisplayBlog;
