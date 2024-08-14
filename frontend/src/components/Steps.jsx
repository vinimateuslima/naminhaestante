import { useEffect, useState } from "react";
import "./Steps.css";

const Steps = ({ currentStep }) => {
  const steps = [
    "Vamos começar escolhendo o livro...",
    "Confirme as informações do livro...",
    "...preencha as informações",
  ];

  return (
    <div className="steps">
      <div className="step"><p>{steps[currentStep]}</p></div>
    </div>
  );
};

export default Steps;
