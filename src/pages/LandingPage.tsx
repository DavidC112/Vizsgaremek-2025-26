import { Link } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import MagicBento from "../components/MagicBento"

const LandingPage = () => {
  return (
    <>
        <Navbar>
          <div className="flex space-x-15">
            <section className="hidden w-full md:block md:w-auto my-auto">
              <ul className="flex space-x-15 ">
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
              </ul>
            </section>

            <section>
              {/* <button className="border rounded-3xl py-1 px-6 md:px-10"></button> */}
              <Link to="/login" className="bg-primary-green text-white rounded-3xl py-1 px-6 md:px-10">Login</Link>
            </section>
          </div>
        </Navbar>
        
        <main>
          <div className="relative bg-linear-to-br from-emerald-50 via-white to to-blue-50 py-30 pb-40 px-15  lg:px-13">
            <div className="mx-auto max-w-7xl">
                <section className="grid gap-12 lg:gap-8 grid-cols-1 md:max-lg:text-center lg:grid-cols-2 items-center">
                  <article className="flex flex-col gap-8">
                    <h1 className="text-5xl lg:text-7xl tracking-tight font-semibold">Complex Nutrition & <span className="text-primary-green">Health Management</span></h1>
                    <p className="text-2xl text-gray-600 max-w-xl italic font-light tracking-tight">
                      Everything in one place for a healthier lifestyle.
                    </p>
                    <span className="border-b border-gray-400"></span>
                    <div className="flex flex-col md:flex-row gap-4  md:gap-6 xl:justify-between md:max-lg:mx-auto  text-center">
                      <Link to="/register" className="bg-primary-green text-white rounded-3xl py-3 px-6 md:max-lg:px-10 text-lg xl:px-15 xl:text-xl">Get Started</Link>
                      <Link to="/login" className="border text-gray-800 rounded-3xl py-3 px-6 md:max-lgpx-10 text-md italic">Already have an account</Link>
                    </div>
                  </article>
                  <aside className="md:max-lg:w-2/3 md:mx-auto ">
                    <img src="572949-1640772.jpg" alt="" className="size-full rounded-2xl"/>
                  </aside>
                </section>
              </div>
          </div>
          <section className="grid justify-center grid-col-1 py-20 space-y-5">
            <header className="text-center  space-y-5 mx-auto">
              <h1 className="text-3xl md:text-5xl tracking-widest ">Everything you need</h1>
              <h2 className="font-light md:w-2xl">Complete solution for a healthy lifestyle - calorie counter, recipes, community and health tracking on one platform.</h2>
            </header>
            <MagicBento
              textAutoHide={true}
              enableStars={false}
              enableSpotlight={false}
              enableBorderGlow={false}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="107, 144, 128"
            />
          </section>
        </main>
        
    </>
  )
}

export default LandingPage    
