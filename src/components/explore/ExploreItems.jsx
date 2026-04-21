import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExploreItemsSkeleton from "../ExploreItemsSkeleton";
import NftCard from "../NftCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardsShown, setCardsShown] = useState(8);
  const [value, setValue] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setCardsShown(8);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
          value ? `?filter=${value}` : ""
        }`,
        { signal: controller.signal }
      )
      .then(({ data }) => {
        setExploreItems(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) throw err;
      });

    return () => controller.abort();
  }, [value]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setValue(e.target.value)}
          style={{ cursor: "pointer" }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {isLoading
        ? Array(8).fill(0).map((_, i) => <ExploreItemsSkeleton key={i} />)
        : exploreItems.slice(0, cardsShown).map((item) => (
            <div
              key={item.nftId}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard item={item} />
            </div>
          ))}

      {cardsShown < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault();
              setCardsShown((prev) => prev + 4);
            }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
