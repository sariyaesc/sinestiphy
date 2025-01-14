import Button from "../components/common/Button";
import Background from "../components/common/Background";
import LoginBtn from "../components/common/Login-Btn";

const navigation=[
    {name: 'Log In', href:'/login'}
  ]

  export default function Home() {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/global.css" />
        
        {/* Sección que ocupa el 100vh */}
        <section className="relative h-[100vh] flex flex-col p-16 justify-center items-center">
          <Background width="100%" height="100%" className="absolute top-0 left-0 z-0" />
          
          <nav className="inline-flex text-white text-xl z-10 mb-10 top-0 right-0 px-6 opacity-70">
            <ul className="flex space-x-4 font-medium menu-desktop">
              <li>
                <a href="#profile_section" className="hover:text-gray-500 transition">HOW IT WORKS?</a>
              </li>
              <li>
                <a href="#photos_section" className="hover:text-gray-500 transition">ABOUT US</a>
              </li>
              <li>
                <a href="#video_section" className="hover:text-gray-500 transition">ABOUT YOU</a>
              </li>
            </ul>
          </nav>
  
          <h1 className="text-white text-9xl font-bold text-center z-10">sinestiphy</h1>
          <p className="text-white text-md my-5 text-center">
            Create playlists based on vibes, visuals, and feelings.
          </p>
          <Button color="green">Start Here</Button>
        </section>
  
        <section id="how_it_works_section">
        <h1 className="text-black text-7xl font-bold text-left mx-16 mt-16 z-10" >HOW IT WORKS?</h1>
        </section>

        
      </>
    );
  }
  