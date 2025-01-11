export default function Background({ width = "100%", height = "100%", className }) {
    return (
      <div
        className={`absolute top-0 left-0 ${className}`}
        style={{
          width,
          height,
          background: "linear-gradient(40deg, var(--color-bg1), var(--color-bg2))", // Aplica el degradado aquí
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
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </div>
    );
  }
  