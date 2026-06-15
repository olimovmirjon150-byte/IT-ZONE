import Courses from "./_components/Courses";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Section from "./_components/Section";

const page = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Courses />
      <Section/>
      <Footer/>
    </div>
  );
};

export default page;