import "./AddBook.css";

import * as FaIcons from "react-icons/fa";

//Components
import ChooseBook from "../components/ChooseBook";
import ConfirmBook from "../components/ConfirmBook";
import ReviewBook from "../components/ReviewBook";
import Thanks from "../components/Thanks";
import Steps from "../components/Steps";

// Hooks
import { useForm } from "../components/hooks/useForm";
import { useState } from "react";
import { toast } from "react-toastify";
//Axios
import axios from "../axios-config";

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
  index: "",
};

const AddBook = () => {
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const addBook = async () => {
    console.log(data);
    try {
      const res = await axios.patch(
        "users/books/66a3f31891ae8751357cda7f",
        data,
        {
          "Content-Type": "application/json",
        }
      );
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
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
        <Steps currentStep={currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e, data)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button
                type="button"
                onClick={(e) => changeStep(currentStep - 1, e, data)}
              >
                <span>Voltar</span>
              </button>
            )}
            {!isLastStep ? (
              <button type="submit" disabled={!data.googleBookId}>
                <span>Próximo</span>
              </button>
            ) : (
              <button type="button" onClick={addBook}>
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
