import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const StyledSearch = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.borderBase};
  max-width: 425px;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;

  input {
    width: 80%;
    padding: 4px 6px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.textColorBase};
    background-color: ${({ theme }) => theme.backgroundBase};
    border-radius: 8px;
  }
  button {
    flex: 1;
    cursor: pointer;
    border: none;
    background-color: ${({ theme }) => theme.backgroundLevel2};
    box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
    border-left: 1px solid ${({ theme }) => theme.borderBase};
    border-radius: 0px 8px 8px 0px;
    width: 40px;
    height: 30px;
    @media (min-width: 600px) {
      width: 64px;
      height: 30px;
    }
  }
  .faMagnifyingGlass {
    color: ${({ theme }) => theme.textColorBase};
  }
`;

export default function Search({ valorDoFiltro, setValorDoFiltro }) {
  const valorDaBusca = valorDoFiltro;
  const setValorDaBusca = setValorDoFiltro;
  return (
    <StyledSearch>
      <input
        type="text"
        onChange={(e) => {
          setValorDaBusca(e.target.value);
        }}
        value={valorDaBusca}
      ></input>
      <button>
        <FontAwesomeIcon
          className="faMagnifyingGlass"
          icon={faMagnifyingGlass}
        />
      </button>
    </StyledSearch>
  );
}
