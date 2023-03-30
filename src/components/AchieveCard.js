import React from "react";

const AchieveCard = ({ iconImg, progress, title, number }) => {
  var isStreak = false;
  if (title === "day") {
    isStreak = true;
  }

  return (
    <>
      <div className="achieve-card row">
        <div className="col-xs-1">
          <img src={iconImg} className="icon" />
        </div>
        <div className="col-xs-9">
          <h3 className="">{number}</h3>
          <div className="">
            <span>
              total <strong>{`${title}(s)`}</strong>{" "}
            </span>
            {isStreak ? <p>streak</p> : <p>learned</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AchieveCard;
