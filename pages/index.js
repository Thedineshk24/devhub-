import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

import {benefitOne} from "../components/data";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import PopupWidget from "../components/popupWidget";

const Home = () => {
  return (
    <>
      <Head>
        <title>
          DevHub: A website that connects developers with events and
          communities.
        </title>
        <meta
          name="description"
          content="DevHub: A website that connects developers with events and communities."
        />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle pretitle="Why DevHub" title=" Why should you use DevHub?">
        DevHub is the ultimate website for developers who love events. You can
        find and join the best hackathons, tech talks, and more in your city
        with just one click - thanks to 1Password.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <SectionTitle
        pretitle="Watch a video"
        title="Learn how to fullfil your needs"
      />
      <Video />
      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said"
      />
      <Testimonials />
      <Cta />
      <Footer />
      <PopupWidget />
    </>
  );
};

export default Home;
