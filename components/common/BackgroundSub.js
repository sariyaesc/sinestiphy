export default function Background({ width = "100%", height = "100%", className }) {
    return (
      <div
        className={`absolute top-0 left-0 ${className}`}
        style={{
          width,
          height,
          background: "linear-gradient(40deg,white,white)", // Aplica el degradado aquí
          overflow: "hidden", // Asegura que no haya contenido desbordante
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1b"></div>
          <div className="g2b"></div>
          <div className="g3b"></div>
          <div className="g4b"></div>
          <div className="g5b"></div>
        </div>
      </div>
    );
  }
  