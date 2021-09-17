import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAPI } from "./../../utils/FetchData";
import CardVert from "../cards/CardVert";
import { RootStore } from "./../../utils/TypeScript";
import { IBlog } from "./../../utils/TypeScript";
import Loading from "./Loading";
import { InputChange, FormSubmit } from "./../../utils/TypeScript";
import { searchTask } from "../../redux/actions/blogAction";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  //   useEffect(() =>{
  //       if(search && auth.access_token){
  //           getAPI(`search?title=${search}`, auth.access_token)
  //           .then(res => setBlogs(res.data))
  //           .catch(err =>{
  //               console.log(err.response.data.msg)
  //           })
  //       }
  //   },[search, auth.access_token])

  const handleSearch = async (e: FormSubmit) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getAPI(`search?title=${search}`, auth.access_token);
      setBlogs(res.data.blogs);
      setLoad(false);
    } catch (err: any) {
      console.log("err");
    }
  };

  return (
    <form
      className="search_form"
      style={{ position: "relative" }}
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="search"
        value={search}
        id="search"
        title="Enter to Search"
        placeholder="Enter to search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>
      <div>
        {search && blogs.map((blog) => <CardVert  key={blog._id} blog={blog} />)}
      </div>
    </form>
  );
};

export default Search;
