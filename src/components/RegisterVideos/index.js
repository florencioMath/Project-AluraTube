import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsForm) {
  const [values, setValues] = React.useState(propsForm.initialValues);

  let video_id = "";
  if (values.url.includes(".be/")) {
    video_id = values.url.split(".be/")[1];
  }

  if (values.url.includes("/embed/")) {
    video_id = values.url.split("/embed/")[1];
  }

  if (values.url.includes("com/v/")) {
    video_id = values.url.split("com/v/")[1];
  }

  if (values.url.includes("/watch?v=")) {
    video_id = values.url.split("/watch?v=")[1];
    let ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
  }

  return {
    values,
    video_id,
    handleChange: (e) => {
      const value = e.target.value;
      const name = e.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },

    clearForm() {
      setValues({
        titulo: "",
        url: "",
        video_id: "",
      });
    },
  };
}

export default function RegisterVideo() {
  const [formVisible, setFormVisible] = React.useState(false);
  const formCadastro = useForm({
    initialValues: { titulo: "", url: "" },
  });

  return (
    <StyledRegisterVideo>
      <button
        className="add-video"
        onClick={() => {
          setFormVisible(true);
          formCadastro.clearForm();
        }}
      >
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
            <button
              className="close-modal"
              onClick={() => setFormVisible(false)}
            >
              x
            </button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
              required
              minLength="5"
              max="50"
            />
            <input
              placeholder="Exemplo: https://youtu.be/5FZzjYACrQc"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
              required
              pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
            />
            <button type="submit">Cadastrar</button>

            <span>Preview</span>
            {formCadastro.video_id && (
              <>
                <div className="wrapperPreview">
                  <h2>{formCadastro.values.titulo}</h2>
                  <div className="videoPreview">
                    <iframe
                      width="410"
                      height="220"
                      src={`https://www.youtube.com/embed/${formCadastro.video_id}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
