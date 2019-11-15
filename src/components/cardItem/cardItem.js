import React from "react";
import DetectBrowser from "react-detect-browser";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import "./cardItem.scss";
const CardItem = props => {
  const needDominantBaselineFix = true;
  console.log(needDominantBaselineFix);
  return (
    <Link
      to={`/details/${props.type.toLowerCase()}/${props.item.id}`}
      key={props.item.id}
      id="card-container"
      className="card"
    >
      <div id="card-grid">
        <div className="card">
          <img src={props.image} className="card-img" alt="..." />
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
                  value={props.item.vote_average * 10}
                  text={
                    <DetectBrowser>
                      {({ browser }) =>
                        browser ? (
                          <tspan
                            dy={
                              browser.name === ("edge" || "safari") ? 15 : 2.5
                            }
                          >
                            {props.item.vote_average * 10}
                          </tspan>
                        ) : (
                          <tspan dy={2.5}>{props.item.vote_average * 10}</tspan>
                        )
                      }
                    </DetectBrowser>
                  }
                />
              </div>
              <div>{props.item.title || props.item.name}</div>
            </div>
            <p
              className="card-text"
              style={({ minHeight: "85px" }, { maxHeight: "85px" })}
            >
              {props.item.overview.length > 200
                ? `${props.item.overview.substring(0, 200)}...`
                : props.item.overview}
            </p>
          </div>
          <div
            id="footer-container"
            className={
              props.item.vote_average >= 7
                ? "card-footer text-muted border-success"
                : "card-footer text-muted border-warning"
            }
          >
            <div className="card-footer">
              <small className="text-muted">
                {dayjs(
                  props.item.release_date || props.item.first_air_date
                ).format("MMMM D, YYYY")}
              </small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CardItem;
