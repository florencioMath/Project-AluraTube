import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsForm) {
  const [values, setValues] = React.useState(propsForm.initialValues);
  return {
    values,
    handleChange: (e) => {
      const value = e.target.value;
      const name = e.target.value;
      calculateSizeAdjustValues({
        ...values,
        [name]: value,
      });
    },

    clearForm() {
      setValues({});
    },
  };
}

export default function RegisterVideo() {
  const [formVisible, setFormVisible] = React.useState(false);
  const formCadastro = useForm({
    initialValues: { titulo: "...", url: "https//..." },
  });
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisible(true)}>
        +
      </button>
      {formVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFormVisible(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button className="close-modal">x</button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
