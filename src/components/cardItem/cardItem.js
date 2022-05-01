import React from "react";
import DetectBrowser from "react-detect-browser";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import fallbackImage from '../../images/fallback.png';

import "react-circular-progressbar/dist/styles.css";
import "./cardItem.scss";

const CardItem = (props) => {
  const { image, item, type } = props
  const roundedVoteAverage = Math.round(item.vote_average * 10)

  return (
    <Link to={`/details/${type.toLowerCase()}/${item.id}`} key={item.id} id="card-container" className="card">
      <div id="card-grid">
        <div className="card">
          <img src={image} className="card-img" alt="..." onError={(e) => e.target.src = fallbackImage}/>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <div>
                <CircularProgressbar
                  className="circularprogressbar"
                  styles={buildStyles({
                    textSize: "45px",
                    pathColor: `${props.pathcolor}`,
                    textColor: "#fff",
                    trailColor: "black",
                    backgroundColor: "black"
                  })}
                  strokeWidth={10}
                  background
                  backgroundPadding={6}
                  value={roundedVoteAverage}
                  text={
                    <DetectBrowser>
                      {({ browser }) =>
                        browser ? (
                          <tspan dy={browser.name === ("edge" || "safari" || "ios") ? 15 : 2.5}>
                            {roundedVoteAverage}
                          </tspan>
                        ) : (
                          <tspan dy={2.5}>{roundedVoteAverage}</tspan>
                        )
                      }
                    </DetectBrowser>
                  }
                />
              </div>
              <div>{item.title || item.name}</div>
            </div>
            <p className="card-text">
              { item.overview }
            </p>
          </div>
          <div id="footer-container" className={ item.vote_average >= 7 ? "card-footer text-muted border-success" : "card-footer text-muted border-warning"}>
            <div className="card-footer">
              <small className="text-muted">
                { dayjs(item.release_date || item.first_air_date).format("MMMM D, YYYY") }
              </small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CardItem;
