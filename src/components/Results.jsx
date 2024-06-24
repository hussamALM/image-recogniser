export default function Results({ data }) {
  const values = Object.values(data["data"]);
  const keys = Object.keys(data["data"]);
  let dataArray = [];
  for (let i = 0; i < keys.length; i++) {
    dataArray.push([keys[i], values[i]]);
  }

  return (
    <div className="mt-12 border-[3px] border-strongCyan rounded-sm h-[80vh]">
      <h5 className="text-lightBlue pt-4">Results</h5>
      <p className="text-grayishBlue w-3/4 mx-auto">
        here are some details about the image you provided.
      </p>
      {
        <ul className="flex flex-col items-center gap-8 md:gap-5 mt-6">
          {dataArray.map((ele) => (
            <div
              key={ele[0]}
              className="flex flex-col md:flex-row items-right md:items-center  justify-around w-3/4"
            >
              <span className="w-[full] text-left md:w-[20px]">{ele[0]}</span>
              <progress
                max="100"
                value={ele[1]}
                className="result-bar w-[80%] md:w-[60%] "
              ></progress>
              <span className="w-[full] text-left md:w-[20px] ">
                {ele[1].toFixed(2)}% certain
              </span>
            </div>
          ))}
        </ul>
      }
    </div>
  );
}
