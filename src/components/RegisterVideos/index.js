import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PROJECT_URL = "https://nwvjeubzjdrznkhhttpv.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dmpldWJ6amRyem5raGh0dHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzQ3MTIsImV4cCI6MTk4Mzc1MDcxMn0.c5vZW1iqDrwBfyyTob3xUNVEUDKl0KO6kYqTi7wvntg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  let video_url = getVideoId(url);
  return `https://img.youtube.com/vi/${video_url}/hqdefault.jpg`;
}

function getVideoId(videoID) {
  let video_id = "";
  if (videoID.includes(".be/")) {
    video_id = videoID.split(".be/")[1];
  }

  if (videoID.includes("/embed/")) {
    video_id = videoID.split("/embed/")[1];
  }

  if (videoID.includes("com/v/")) {
    video_id = videoID.split("com/v/")[1];
  }

  if (videoID.includes("/watch?v=")) {
    video_id = videoID.split("/watch?v=")[1];
    let ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
  }

  return video_id;
}

function useForm(propsForm) {
  const [values, setValues] = React.useState(propsForm.initialValues);

  let video_id = getVideoId(values.url);

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
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {formVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFormVisible(false);
            formCadastro.clearForm();
            supabase
              .from("playlistVideos")
              .insert({
                playlist: "Upload dos Usuário",
                title: formCadastro.values.titulo,
                url: getVideoId(formCadastro.values.url),
                thumb: getThumbnail(formCadastro.values.url),
              })
              .then(() => {})
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => setFormVisible(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
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
            <h2>{formCadastro.values.titulo}</h2>
            {formCadastro.video_id && (
              <div className="wrapperPreview">
                <div className="videoPreview">
                  <iframe
                    width="310"
                    height="220"
                    src={`https://www.youtube.com/embed/${formCadastro.video_id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
