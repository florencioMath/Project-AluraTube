import styled from "styled-components";
import config from "../../config.json";

const StyledBanner = styled.div`
  height: 230px;
  width: 100%;
  margin-top: 56px;
  background-image: url("../assets/img/banner.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default function Banner() {
  return <StyledBanner></StyledBanner>;
}
