import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SubmittedView = () => (
  <main className="from-primary-green-50 mx-auto flex min-h-screen min-w-full items-center justify-center bg-linear-to-b via-white to-blue-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 rounded-2xl border bg-white px-12 py-14 text-center shadow-xl"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 14,
          delay: 0.15,
        }}
        className="bg-primary-green-100 flex h-20 w-20 items-center justify-center rounded-full"
      >
        <svg
          className="text-primary-green-500 h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
          Recipe Submitted!
        </h2>
        <p className="max-w-xs text-sm text-gray-500">
          Your recipe has been uploaded successfully.
        </p>
      </div>
      <Link
        to="/"
        className="bg-primary-green-400 hover:bg-primary-green-500 active:bg-primary-green-600 mt-2 rounded-full px-8 py-2 text-sm font-medium tracking-tight text-white transition duration-300"
      >
        Back to Home
      </Link>
    </motion.div>
  </main>
);

export default SubmittedView;
