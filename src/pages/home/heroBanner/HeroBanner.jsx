import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./style.scss"
import { useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';

import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  };
  return (
    <div className="heroBanner">

      {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}
<div className="opacity-layer"></div>
      <ContentWrapper>
      <div className="heroBannerContent">
          <span className='title'>Welcome.</span>
          <span className="subTitle">Millons of Movies, TV show && porple to discover Explore now.</span>
          <div className="searchInput">
            <input type="text" onKeyUp={searchQueryHandler}
            onChange={(e) => setQuery(e.target.value)}
              placeholder='Search for a movix or tv show...' />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
    
   
  );
};

export default HeroBanner;