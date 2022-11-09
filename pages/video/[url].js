import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Menu from "../../src/components/Menu";

const StyledVideo = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  section {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
    padding: 16px;
  }
  iframe {
    width: 100%;
    max-width: 1080px;
    height: 540px;
  }
`;

export default function Video() {
  const router = useRouter();
  const data = router.query;
  return (
    <>
      <Menu />
      <StyledVideo>
        <section>
          <h2>{data.title}</h2>
          <iframe
            className="videoPlayer"
            src={`https://www.youtube.com/embed/${data.url}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
      </StyledVideo>
    </>
  );
}
