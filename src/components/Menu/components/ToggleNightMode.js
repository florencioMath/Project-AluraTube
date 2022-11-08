import React from "react";
import styled from "styled-components";

const StyledToggleNightMode = styled.div`
  .wrapperToggle {
    background: #333333;
    display: grid;
    align-items: center;
    height: 26px;
    width: 50px;
    border-radius: 17px;
    grid-template-columns: repeat(2, 1fr);
    z-index: -1;
  }
  .lightMode {
    background-color: #fafafa;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    cursor: pointer;
    grid-column: 1;
    grid-row: 1;
  }
  .darkMode {
    background-color: #fafafa;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    cursor: pointer;
    grid-column: 2;
    grid-row: 1;
  }
  .active {
    opacity: calc(0);
  }

  span {
    border-radius: 50%;
    height: 24px;
    width: 24px;
  }
`;

export default function ToggleNightMode() {
  const [darkMode, setdarkMode] = React.useState("darkMode");

  const handleClick = () => {
    if (darkMode === "darkMode") {
      setdarkMode("lightMode");
    } else {
      setdarkMode("darkMode");
    }
  };

  return (
    <StyledToggleNightMode>
      <div className="wrapperToggle">
        {darkMode === "darkMode" ? (
          <>
            <div className="lightMode" onClick={handleClick}></div>
            <span>🌒</span>
          </>
        ) : (
          <>
            <div className="darkMode" onClick={handleClick}></div>
            <span>☀️</span>
          </>
        )}
      </div>
    </StyledToggleNightMode>
  );
}
