import LoginBtn from "@/components/common/Login-Btn";
import Background from "../components/common/Background";


export default function LogIn() {
  return (  
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/global.css" />
        
        <Background width="100vw" height="100vh" />

        <div className="relative h-screen flex flex-col items-center justify-center">
  <h1 className="text-white text-8xl font-bold m-5">Sinestiphy</h1>
  <p className="text-white text-md">
    Create playlists based on vibes, visuals, and feelings. 
  </p>
 <LoginBtn color="green">Log In with Spotify</LoginBtn>
</div>




        <section></section>
      </>
  );
  
}