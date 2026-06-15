import { FaLaptopCode, FaUserGraduate, FaBriefcase } from "react-icons/fa";

const Section = () => {
  const features = [
    {
      icon: <FaLaptopCode />,
      title: "Real Projects",
      description:
        "Nazariyadan tashqari haqiqiy loyihalar ustida ishlang va portfolio yarating.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Expert Mentors",
      description:
        "Sohada tajribaga ega mentorlar bilan zamonaviy texnologiyalarni o‘rganing.",
    },
    {
      icon: <FaBriefcase />,
      title: "Career Support",
      description:
        "CV tayyorlash, intervyu va ish topishda qo‘shimcha yordam oling.",
    },
  ];

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            Why IT ZONE
          </span>

          <h2 className="mt-6! text-4xl font-bold text-gray-900 md:text-5xl">
            Build Your Future With Confidence
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Zamonaviy IT kurslari, tajribali mentorlar va amaliy loyihalar
            orqali karyerangizni yangi bosqichga olib chiqing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl text-green-500 transition-all duration-300 group-hover:bg-green-500 group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="leading-7 text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;