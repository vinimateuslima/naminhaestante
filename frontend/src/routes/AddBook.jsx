import "./AddBook.css";

import * as FaIcons from "react-icons/fa";

//Components
import ChooseBook from "../components/ChooseBook";
import ConfirmBook from "../components/ConfirmBook";
import ReviewBook from "../components/ReviewBook";
import Thanks from "../components/Thanks";

// Hooks
import { useForm } from "../components/hooks/useForm";
import { useState } from "react";

const formTemplate = {
  googleBookId: "",
  title: "",
  authors: [""],
  description: "",
  thumbnail: "",
  categories: [""],
  pageCount: 0,
  rating: 0,
  status: "Lendo",
  currentPage: 0,
  review: "",
};

const AddBook = () => {
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <ChooseBook data={data} updateFieldHandler={updateFieldHandler} />,
    <ConfirmBook data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewBook data={data} updateFieldHandler={updateFieldHandler} />,
    <Thanks data={data} />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  return (
    <div className="add-book">
      <div className="form-container">
        <p>Etapas</p>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
                <span>Voltar</span>
              </button>
            )}
            {!isLastStep ? (
              <button type="submit">
                <span>Próximo</span>
              </button>
            ) : (
              <button type="button">
                <span>Salvar</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
