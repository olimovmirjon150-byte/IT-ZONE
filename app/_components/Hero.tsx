import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative flex min-h-[90vh] items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center text-white">
        <span className="mb-4 rounded-full bg-green-500/20 px-5 py-2 text-sm font-medium text-green-300 backdrop-blur-sm">
          🚀 Welcome to IT ZONE
        </span>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
          Learn Modern IT Skills
          <span className="block text-green-400">
            Build Your Future Today
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
          Frontend, Backend, Full Stack, Mobile Development va boshqa
          zamonaviy IT kurslarini professional mentorlar bilan o‘rganing.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/courses">
            <button className="rounded-2xl! bg-green-500 px-20 py-4 font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-xl">
              Explore Courses
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <h3 className="text-3xl font-bold text-green-400">5000+</h3>
            <p className="mt-2 text-gray-300">Students</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <h3 className="text-3xl font-bold text-green-400">20+</h3>
            <p className="mt-2 text-gray-300">Mentors</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <h3 className="text-3xl font-bold text-green-400">15+</h3>
            <p className="mt-2 text-gray-300">Courses</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <h3 className="text-3xl font-bold text-green-400">95%</h3>
            <p className="mt-2 text-gray-300">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;