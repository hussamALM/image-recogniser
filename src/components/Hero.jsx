// import imageUrl from
export default function Hero() {
  return (
    <section id="hero">
      <div className="section-container mb-40 pt-16">
        <img src="images/logo.svg" alt="" className="mx-auto my-16" />

        <h3>
          Gimme anything <br />
          and I will tell you everything.
        </h3>

        <p className="section-content mb-10 text-2xl lg:text-3xl">
          ImageRecogniser will recognize images for you and will give you some
          detailed information about the image.
        </p>

        <div className="button-container">
          <a
            href="#main"
            className="p-4 px-8 rounded-full shadow-lg bg-strongCyan duration-200 hover:opacity-80"
          >
            Give it a Try
          </a>
        </div>
      </div>
    </section>
  );
}
