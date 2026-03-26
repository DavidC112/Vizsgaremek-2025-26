import { ArrowLeft } from "lucide-react";
import Silk from "../components/Silk";
import { Link } from "react-router-dom";
import SignUpSection from "../components/SignUpPage/SignUpSection";
import UserSignUpContext from "../context/UserSignUpContext";

const SignUpPage = () => {
  return (
    <UserSignUpContext>
      <main className="relative w-full overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-screen overflow-hidden">
          <Silk
            speed={5}
            scale={0.8}
            color="#6b9080"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        <section className="absolute pt-10 pl-10">
          <Link to="/">
            <ArrowLeft className="b-white hidden size-10 rounded-full border p-1 text-black transition-all duration-300 hover:scale-110 md:text-white xl:block" />
          </Link>
        </section>
        <section className="absolute bottom-0 left-0 hidden pb-10 pl-10 text-5xl text-black italic transition-transform hover:scale-110 md:text-white xl:block">
          NutriLife
        </section>
        <SignUpSection />
      </main>
    </UserSignUpContext>
  );
};

export default SignUpPage;
