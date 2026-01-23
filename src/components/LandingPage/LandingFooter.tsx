import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <>
      <div className="from-primary-green-100 bg-linear-to-t via-white to-white py-25">
        <section className="m-auto flex max-w-7xl flex-col items-center gap-10 py-20 text-center lg:py-50">
          <h1 className="text-5xl font-bold">Ready for a healthier life?</h1>
          <h2 className="px-5 font-extralight">
            Join the others who have already achieved their goal
          </h2>
          <Link
            to="/register"
            className="bg-primary-green-400 font-extraligh hover:bg-primary-green-500 w-30 rounded-2xl py-1 font-extralight text-white"
          >
            Join now
          </Link>
        </section>
      </div>
    </>
  );
};
export default LandingFooter;
