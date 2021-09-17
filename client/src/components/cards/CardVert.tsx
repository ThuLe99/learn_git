import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootStore, IBlog } from "../../utils/TypeScript";
interface IProps {
  blog: IBlog;
}

const CardVert: React.FC<IProps> = ({ blog }) => {
  const { auth } = useSelector((state: RootStore) => state);
  const { pathname } = useLocation();
  const isActive = (pn: string) => {
    if (pn === pathname) return "active";
  };

  return (
    <div className="card">
      {typeof blog.thumbnail === "string" && (
        <img
          src={blog.thumbnail}
          className="card-img-top"
          alt="..."
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">
          <Link
            to={`/blog/${blog._id}`}
            style={{
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            {blog.title.slice(0, 50) + "..."}
          </Link>
        </h5>
        <p className="card-text">{blog.description.slice(0, 100) + "..."}</p>

        <p className="card-text d-flex justify-content-between">
          <small className="text-muted text-capitalize">
            {typeof blog.user !== "string" && (
              <Link
                to={`/profile/${blog.user._id}`}
                style={{
                  textDecoration: "none",
                  textTransform: "capitalize",
                }}
              >
                By: {blog.user.name}
              </Link>
            )}
          </small>

          <small className="text-muted">
            {new Date(blog.createdAt).toLocaleString()}
          </small>
        </p>
        {auth.user?.role === "admin" && (
          <div className={`nav-item ${isActive("/category")}`}></div>
        )}
      </div>
    </div>
  );
};

export default CardVert;
