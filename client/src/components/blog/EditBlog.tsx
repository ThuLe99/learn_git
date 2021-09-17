import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IBlog,
  RootStore,
  FormSubmit,
  InputChange,
} from "../../utils/TypeScript";
import { useSelector } from "react-redux";
//import ReactQuill from "react-quill";
import ReactQuill from "./../editor/ReactQuill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import "react-quill/dist/quill.snow.css";
import { updateBlog } from "./../../redux/actions/adminAction";
import { validCreateBlog } from "./../../utils/Valid";

interface IProps {
  blog: IBlog;
  setOnEdit: any;
}
const EditBlog: React.FC<IProps> = ({ setOnEdit, blog }) => {
  const initialState = {
    id: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    user: "",
    createdAt: "",
    state: false,
    likes: [],
    viewer: 0
  };

  const { auth, categories } = useSelector((state: RootStore) => state);

  const [userData, setUserData] = useState<IBlog>(initialState);
  const { title, content, description, category, state } = userData;

  const [thumbnail, setThumbnail] = useState<File>();
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  const modules = { toolbar: { container } };

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText as string;
    setText(text);
  }, [body]);

  useEffect(() => {
    setUserData(blog);
  }, [blog]);

  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      const err = checkImage(file);
      if (err) return dispatch({ type: ALERT, payload: { errors: err } });
      setThumbnail(file);
    }
  };

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name as any]: value });
  };
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    if (!auth.access_token) return;
    e.preventDefault();
    //
    const check = validCreateBlog({
      ...blog,
      content: content,
      title: title,
      description: description,
    });
    if (check.errLength !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    }
    //
    if (auth.access_token && thumbnail)
      dispatch(
        updateBlog(
          blog,
          thumbnail,
          content,
          category,
          description,
          title,
          state,
          auth.access_token
        )
      );
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        &times;
      </button>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <div className="form-group position-relative">
          <input
            type="text"
            className="form-control"
            value={title}
            name="title"
            onChange={handleChangeInput}
          />

          <small
            className="text-muted position-absolute"
            style={{ bottom: 0, right: "3px", opacity: "0.3" }}
          >
            {title.length}/50
          </small>
        </div>
        <label>Thumbnail</label>
        <div className="form-group my-3">
          <input
            type="file"
            name="file"
            className="form-control"
            accept="image/*"
            onChange={handleChangeThumbnail}
          />
        </div>
        <label>Description</label>
        <div className="form-group position-relative">
          <textarea
            className="form-control"
            rows={4}
            value={description}
            style={{ resize: "none" }}
            name="description"
            onChange={handleChangeInput}
          />

          <small
            className="text-muted position-absolute"
            style={{ bottom: 0, right: "3px", opacity: "0.3" }}
          >
            {description.length}/200
          </small>
        </div>
        <label>Category</label>
        <div className="form-group my-3">
          <select
            className="form-control text-capitalize"
            value={category}
            name="category"
            onChange={handleChangeInput}
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <label>Content</label>
        <div className="form-group position-relative">
          <textarea
            className="form-control"
            rows={4}
            value={content}
            style={{ resize: "none" }}
            name="content"
            onChange={handleChangeInput}
          />

          <small
            className="text-muted position-absolute"
            style={{ bottom: 0, right: "3px", opacity: "0.3" }}
          >
            {content.length}/2000
          </small>
        </div>
        <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="state"
                value="{{state}}"
              checked={state}
                onChange={handleChangeCheckbox}
              ></input>
              Xuất bản
            </label>
          </div>
 
        <button
          className="btn btn-success"
          type="submit"
          style={{ marginRight: "70px" }}
        >
          Save
        </button>
      </form>
    </div>
  );
};
let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];
export default EditBlog;
