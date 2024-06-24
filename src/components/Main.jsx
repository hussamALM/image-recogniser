import { useRef, useState } from "react";
import Results from "./Results.jsx";
import Error from "./Error.jsx";

export default function Form() {
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);
  const imgRef = useRef();
  const modelRef = useRef();
  async function uploadImage(event) {
    event.preventDefault();
    const model = modelRef.current.value;
    if (model == -1) {
      setErr({ error: "please choose a model to work with" });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", imgRef.current.files[0]);
      formData.append("model", model);

      const response = await fetch("http://127.0.0.1:5000/uploadImage", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        setErr(result);
        setData(undefined);
      } else {
        setData(result);
        setErr(undefined);
      }
    } catch (e) {
      setErr({ error: "something went wrong" });
      setData(undefined);
    }
  }
  return (
    <div className="section-container h-[100vh] pt-8" id="main">
      <h5>Upload an Image</h5>
      <form onSubmit={uploadImage} method="POST">
        <div className="flex justify-center">
          <input
            className="border md:basis-1/2 p-2 bg-slate-100 text-darkGrayishBlue"
            type="file"
            name="file"
            ref={imgRef}
            id="file"
            accept="image/*"
            required
          />

          <button
            type="submit"
            className="p-2 px-4 rounded-r-xl shadow-lg bg-strongCyan duration-200 hover:opacity-80 "
          >
            Upload
          </button>
        </div>
        <select
          name="model"
          id="model"
          ref={modelRef}
          className="bg-darkGrayishBlue text-center text-white p-2 w-[100%] sm:w-[57.9%] mt-2 shadow-lg rounded-sm"
        >
          <option value="-1">choose analysing model</option>
          <option value="ResNet50">ResNet50 (recommended)</option>
          <option value="MobileNetV2">MobileNetV2</option>
          <option value="InceptionV3">InceptionV3</option>
          <option value="DenseNet121">DenseNet121</option>
        </select>
      </form>
      {data && <Results data={data} />}
      {err && <Error err={err} />}
    </div>
  );
}
