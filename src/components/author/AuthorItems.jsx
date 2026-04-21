import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ExploreItemsSkeleton from "../ExploreItemsSkeleton";

const AuthorItemCard = ({ item, authorImage }) => {
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
        <Link to="">
          <img className="lazy" src={authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
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
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like" onClick={handleLikeClick} style={{ cursor: "pointer" }}>
          <i className={`fa fa-heart${liked ? "" : "-o"}`}></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

const AuthorItems = () => {
  const { authorId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [authorItems, setAuthorItems] = useState({});

  async function fetchAuthorItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthorItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAuthorItems();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading
            ? Array(8).fill(0).map((_, i) => <ExploreItemsSkeleton key={i} />)
            : authorItems.nftCollection.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                  <AuthorItemCard item={item} authorImage={authorItems.authorImage} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
