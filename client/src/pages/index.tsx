import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootStore } from "../utils/TypeScript";

import CardVert from "../components/cards/CardVert";
import Loading from "../components/global/Loading";

const Home = () => {
  const { homeBlogs, topBlogs } = useSelector((state: RootStore) => state);

  if (homeBlogs.length === 0) return <Loading />;
  return (
    <>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">React & Node</span>
          <span className="headerTitleLg">Blog</span>
        </div>
        <img
          className="headerImg" style=
          {{zIndex:99}}
          src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      </div>
      <div className="home_page">
        <h3>Recommend for you</h3>
        
        <div className="home_blogs">
          {topBlogs.map((top) => (
            <div key={top._id} >
              <CardVert blog={top} />
            </div>
          ))}
        </div>

        {homeBlogs.map((homeBlog) => (
          <div key={homeBlog._id}>
            {homeBlog.count > 0 && (
              <>
                <h3>
                  <Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
                    {homeBlog.name} <small>({homeBlog.count})</small>
                  </Link>
                </h3>
                <hr className="mt-1" />

                <div className="home_blogs">
                  {homeBlog.blogs
                    .filter((item) => item.state === true)
                    .map((blog) => (
                      <CardVert key={blog._id} blog={blog} />
                    ))}
                </div>
              </>
            )}

            {homeBlog.count > 4 && (
              <Link
                className="text-end d-block mt-2 mb-3 
              text-decoration-none"
                to={`/blogs/${homeBlog.name}`}
              >
                Read more &gt;&gt;
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
