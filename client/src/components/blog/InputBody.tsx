import React, { useState, useRef,useEffect  } from "react";
import ReactQuill from "../editor/ReactQuill";
import { IBlog } from '../../utils/TypeScript'

interface IProps{
    callback: (body: string) =>void
    edit?: IBlog
  setEdit?:(edit?: IBlog) => void
}
const Input:React.FC <IProps> = ({callback,edit, setEdit}) =>{
  const [body, setBody] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(edit) setBody(edit.content)
  },[edit])

  const handleSubmit = () => {
    const div = divRef.current;
    const text = (div?.innerText as string)
    if(!text.trim()) {
      if(setEdit) return setEdit(undefined);
      return;
    };

    callback(body)

    setBody('')
  }
  return (
    <div>
      <ReactQuill setBody={setBody} />
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      ></div>
      {/* <button className="btn btn-dark ms-auto d-block px-4 mt-2" onClick={handleSubmit}>{ edit ? 'Update' : 'Send' }</button> */}
    </div>
  );
};

export default Input;
