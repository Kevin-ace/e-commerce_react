import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import HomePage from "./pages/HomePage";

function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = () => {};

  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000", // Dark space background
            },
          },
          particles: {
            number: {
              value: 100,
            },
            size: {
              value: 3,
            },
            move: {
              speed: 0.5,
              direction: "none",
              out_mode: "out",
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
            },
          },
        }}
      />
      <div className="content">
        <h1 style={{ textAlign: "center", color: "primary" }}>Space-Tech Online Store</h1>
        <HomePage />
      </div>
    </div>
  );
}

export default App;