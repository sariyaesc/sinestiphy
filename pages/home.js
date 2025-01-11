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
        
        <section className="relative h-[40vh] flex flex-col p-16 overflow-hidden">
            <Background width="100%" height="100%" className="absolute top-0 left-0 z-0" />
            
            <nav class="container text-white text-xl flex-end z-10 mb-10 top-0 right-0">
                <ul class="flex space-x-4 font-medium menu-desktop">
                <li>
                    <a href="#profile_section" class=" hover:text-gray-500 transition">HOW IT WORKS?</a>
                </li>
                <li>
                    <a href="#photos_section" class=" hover:text-gray-500 transition">ABOUT US</a>
                </li>
                <li>
                    <a href="#video_section" class=" hover:text-gray-500 transition">ABOUT YOU</a>
                </li>
                </ul>
    
            </nav>

            
            <h1 className="text-white text-9xl font-bold content-center justify-between z-10">Sinestiphy</h1>
            <p className="text-white text-md">
                Create playlists based on vibes, visuals, and feelings. 
            </p>

            
            </section>
            <LoginBtn className="text-white text-9xl font-bold content-center justify-between z-10">Hola</LoginBtn>







        
      </>
  );
  
}