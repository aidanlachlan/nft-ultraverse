import React, { useState } from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";

const NftCard = ({ item }) => {
  const [likes, setLikes] = useState(item.likes);
  const [liked, setLiked] = useState(false);

  function handleLikeClick() {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  }

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${item.authorName}`}
        >
          <img className="lazy" src={item.authorImage} alt="" data-aos='fade-in' data-aos-duration='700'/>
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {item.expiryDate ? (
        <div className="de_countdown">
          <Timer duration={item.expiryDate} data-aos='fade-in' data-aos-duration='700'/>
        </div>
      ) : null}
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons" data-aos='fade-in' data-aos-duration='700'>
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <Link to={`/item-details/${item.nftId}`}>
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" data-aos='fade-in' data-aos-duration='700'/>
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4 data-aos='fade-in' data-aos-duration='700'>{item.title}</h4>
        </Link>
        <div className="nft__item_price" data-aos='fade-in' data-aos-duration='700'>{item.price} ETH</div>
        <div className="nft__item_like" data-aos='fade-in' data-aos-duration='700' onClick={handleLikeClick} style={{ cursor: "pointer" }}>
          <i className={`fa fa-heart${liked ? "" : "-o"}`}></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
