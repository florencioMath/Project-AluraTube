import styled from "styled-components";

const StyledFavorites = styled.div`
  width: 100%;
  padding: 32px;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .wrapper-favorites {
    display: flex;
  }
  .favorite-info {
    padding: 16px;
  }
  p {
    width: 92px;
    height: 16px;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: ${({ theme }) => theme.textColorBase || "#222222"};
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export default function Favorites(props) {
  const favorites = props.favorites;
  return (
    <StyledFavorites>
      <h2>Aluratubes Favoritos</h2>
      <section className="wrapper-favorites">
        {favorites.map((favorite, index) => {
          return (
            <div className="favorite-info" key={index}>
              <a href={favorite.url} target="_blank">
                <img src={favorite.thumb}></img>
                <p>{favorite.name}</p>
              </a>
            </div>
          );
        })}
      </section>
    </StyledFavorites>
  );
}
