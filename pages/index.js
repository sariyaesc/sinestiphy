import Background from "../components/common/Background";
import LoginBtnSpotify from "../components/common/LoginBtnSpotify";
import BackgroundSub from "../components/common/BackgroundSub";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/global.css" />

      {/* Sección que ocupa el 100vh */}
      <section className="relative h-[100vh] flex flex-col p-16 justify-center items-center ">
        <Background
          width="100%"
          height="100%"
          className="absolute top-0 left-0 z-0"
        />
        <nav className="inline-flex text-white text-xl z-10 mb-10 top-0 right-0 px-6 opacity-70 ">
          <ul className="flex space-x-4 font-medium menu-desktop">
            <li>
              <a
                href="#how_it_works_section"
                className="hover:text-gray-500 transition"
              >
                HOW DOES IT WORK?
              </a>
            </li>
            <li>
              <a
                href="#about_section"
                className="hover:text-gray-500 transition"
              >
                ABOUT US
              </a>
            </li>
            <li>
              <a
                href="#about_section"
                className="hover:text-gray-500 transition"
              >
                ABOUT YOU
              </a>
            </li>
          </ul>
        </nav>

        <h1 className="text-white  font-bold text-center z-10 lg:text-9xl md:text-9xl sm:text-6xl ">
          sinestiphy
        </h1>
        <p className="text-white text-md my-5 text-center">
          Create playlists based on vibes, visuals, and feelings.
        </p>
        <LoginBtnSpotify>Start Here</LoginBtnSpotify>
      </section>

      <section
        id="how_it_works_section"
        className="relative h-[100vh] flex flex-col p-6 "
      >
        <BackgroundSub
          width="100%"
          height="100%"
          className="absolute top-0 left-0 z-0"
        />

        <section className="grid grid-cols-2 gap-36 mx-16 h-screen">
          <section className="flex flex-col items-center justify-center">
            <h1 className="text-7xl self-start z-10 drop-shadow-md font-bold pb-5 text-[#dcff00]">
              syn·es·the·sia
            </h1>
            <p className="text-sm pb-5 self-start">
              /ˌsinəsˈTHēZH(ē)ə,ˌsinəsˈTHēzēə/: noun
            </p>
            <p className="text-md self-end text-right">
              the production of a sense impression relating to one sense or part
              of the body by stimulation of another sense or part of the body.
            </p>
          </section>
          <section className="flex flex-col justify-center">
            <h1 className="text-5xl pb-16 font-semibold">
              You only have one task:
              <br></br>
              <span className="text-[#dcff00]  font-bold">
                Answer vibes based.
              </span>
            </h1>
            <p className="text-lg">
              This is a test based on the synesthesia of music.{" "}
              <span className=" font-bold">Sinestiphy</span> is a test that
              analyzes the different sensations and vibes of a genre and its
              variations to recommend playlists based on your answers.
              <br></br>
              <br></br>
              This experience works with <b>Spotify</b> to bring you
              personalized recommendations, so you will be needing an active
              account to proceed on this test.
            </p>
          </section>
        </section>
      </section>

      <section
        id="about_section"
        className="bg-white grid grid-cols-2 gap-1 h-[100vh] mx-auto py-6 px-16"
      >
        <section className="relative p-6 m-6 flex flex-col justify-center">
          <Background
            width="100%"
            height="100%"
            className="absolute top-0 left-0 z-0"
          />
          <h1 className="text-white text-8xl px-7 font-bold">About Us</h1>
          <p className="text-white font-semibold px-7 text-2xl pb-10">
            We are a great one-person team :)
          </p>
          <p className="text-white text-semibold px-7 text-lg">
            Now seriously, this test was made based on the opinions of different
            synaesthetic users, research of information and comparison of
            results. We are in constant progress, so we are always (me and the
            voices) open to suggestions to improve the experience.
          </p>
        </section>

        <section className="relative p-6 m-6 flex flex-col justify-center">
          <Background
            width="100%"
            height="100%"
            className="absolute top-0 left-0 z-0"
          />
          <h1 className="text-white text-8xl px-7 font-bold">About You</h1>
          <p className="text-white font-semibold px-7 text-2xl pb-10">
            We are a great
          </p>
          <p className="text-white text-semibold px-7 text-lg">
            We wanna hear about you! If you have any suggestion, comment, or anything you wanna share
            this is your chance. You can leave whatever you want right <a href="https://docs.google.com/forms/d/e/1FAIpQLSdCQu86HhG_p1y_ejkXAgkkJpS5BvY7H9Nn8wEilCmOHY3Umw/viewform?usp=header">here</a> 
          </p>
  
        </section>
      </section>

      <footer className="h-8 w-full relative">
      <Background
            width="100%"
            height="100%"
            className="absolute top-0 left-0 z-0"
          />
      </footer>
    </>
  );
}
