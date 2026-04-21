import React, { useEffect, useState } from "react";
import axios from "axios";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import TopSellers from "../components/home/TopSellers";
import NewItems from "../components/home/NewItems";

const BASE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hotCollections, setHotCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const config = { signal: controller.signal };

    Promise.all([
      axios.get(`${BASE_URL}/hotCollections`, config),
      axios.get(`${BASE_URL}/newItems`, config),
      axios.get(`${BASE_URL}/topSellers`, config),
    ])
      .then(([hotRes, newRes, topRes]) => {
        setHotCollections(hotRes.data);
        setNewItems(newRes.data);
        setTopSellers(topRes.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) throw err;
      });

    return () => controller.abort();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections data={hotCollections} isLoading={isLoading} />
        <NewItems data={newItems} isLoading={isLoading} />
        <TopSellers data={topSellers} isLoading={isLoading} />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
