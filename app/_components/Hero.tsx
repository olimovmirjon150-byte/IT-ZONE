import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-10000 hover:scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Glow */}
      <div className="absolute left-0 top-0 h-100 w-100 rounded-full bg-green-500/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-green-500/20 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center text-white">

        {/* Badge */}
        <div className="animate-pulse">
          <span className="rounded-full border border-green-500/30 bg-green-500/20 px-6 py-3 text-sm font-semibold text-green-300 backdrop-blur-xl">
            🚀 Welcome to IT ZONE
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-8 animate-bounce text-5xl font-black leading-tight md:text-7xl lg:text-8xl">
          Learn Modern IT Skills
          <span className="block bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Build Your Future Today
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
          Frontend, Backend, Full Stack, Mobile Development va boshqa
          zamonaviy IT kurslarini professional mentorlar bilan
          o‘rganing.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link href="/courses">
            <button className="group rounded-2xl! bg-green-500 px-10 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-green-600 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]">
              Explore Courses
            </button>
          </Link>

          <Link href="/applications">
            <button className="rounded-2xl! border border-white/20 bg-white/10 px-10 py-4 font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/20">
              Apply Now
            </button>
          </Link>

        </div>

        {/* Stats */}
        <div className="mt-24 grid gap-6 md:grid-cols-4">

          <div className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-white/20">
            <h2 className="text-4xl font-black text-green-400">
              5000+
            </h2>
            <p className="mt-2 text-gray-300">
              Students
            </p>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-white/20">
            <h2 className="text-4xl font-black text-green-400">
              20+
            </h2>
            <p className="mt-2 text-gray-300">
              Mentors
            </p>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-white/20">
            <h2 className="text-4xl font-black text-green-400">
              15+
            </h2>
            <p className="mt-2 text-gray-300">
              Courses
            </p>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-white/20">
            <h2 className="text-4xl font-black text-green-400">
              95%
            </h2>
            <p className="mt-2 text-gray-300">
              Success Rate
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;