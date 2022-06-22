import { useContext, memo } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onTrashClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `location__like-button${
    isLiked ? " location__like-button_active" : ""
  }`;
  const cardLikesCount = card.likes.length;

  return (
    <article className="location">
      <img
        src={card.link}
        className="location__image"
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="location__name-area">
        <h2 className="location__name">{card.name}</h2>
        <div className="location__like-area">
          <button
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          >
            {" "}
          </button>
          <span className="location__like-value">
            {cardLikesCount === 0 ? "" : cardLikesCount}
          </span>
        </div>
      </div>
      {isOwn && (
        <button
          className="location__trash-button"
          onClick={() => onTrashClick(card)}
        ></button>
      )}
    </article>
  );
}

export default memo(Card);
