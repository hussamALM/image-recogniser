export default function Error({ err }) {
  return (
    <div className="mt-12 border-4 border-red-500 rounded-sm h-[35%] pt-5">
      <h5 className="text-red-500 pt-4">Error</h5>
      <p className="text-grayishBlue w-full md:w-3/4 mx-auto">
        there was an error tring to analys the image you provided:
        <strong className="text-black block mb-4">"{err["error"]}"</strong>{" "}
        please reload the page and try again
      </p>
    </div>
  );
}
