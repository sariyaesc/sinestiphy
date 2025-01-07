import Button from "@/components/common/Button";

export default function Home() {
  return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/global.css" />
        

        <div className="relative h-screen flex flex-col items-center justify-center">
  <h1 className="text-white text-8xl font-bold m-5">Sinestiphy</h1>
  <p className="text-white text-md">
    Create playlists based on vibes, visuals, and feelings. 
  </p>
  <Button color="green">Log In with Spotify</Button>
</div>


        <div className="gradient-bg">
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
          </div>
        <div className="interactive"></div>
        </div>    
      </>
  );
  
}