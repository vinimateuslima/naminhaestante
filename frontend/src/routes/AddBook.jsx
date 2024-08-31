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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
  search: "",
};

const AddBook = () => {
  const [data, setData] = useState(formTemplate);
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const updateFieldHandler = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const addBook = async () => {
    console.log(data);
    MySwal.fire({
      title: "Deseja salvar o livro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      allowOutsideClick: false,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch(
            "users/books/66a3f31891ae8751357cda7f",
            data,
            {
              "Content-Type": "application/json",
            }
          );
          toast.success(res.data.msg);
          setTimeout(() => {
            navigate("/")
          }, 2000);
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.msg);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Usuário respondeu Não");
        // Lógica para quando o usuário clica em Não
      }
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
