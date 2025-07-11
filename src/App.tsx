import React from "react";
import InterestForm from "./components/InterestForm";
import AnimatedBackground from "./components/AnimateBackground";
import "./App.css";

const App: React.FC = () => (
  <div className="section-spidr section-slide page-section" style={{ position: "relative", overflow: "hidden" }}>
    <AnimatedBackground />
    <div className="form-container" style={{ position: "relative", zIndex: 2 }}>
      <InterestForm />
    </div>
  </div>
);

export default App;
