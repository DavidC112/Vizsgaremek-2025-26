import { Link } from "react-router-dom";

const LandPageNavElements = () => {
  return (
    <div>
      <div className="flex space-x-15">
        <section>
          <Link
            to="/login"
            className="bg-primary-green-400 hover:bg-primary-green-500 rounded-3xl px-6 py-1 text-white md:px-10"
          >
            Login
          </Link>
        </section>
      </div>
    </div>
  );
};
export default LandPageNavElements;
