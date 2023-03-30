import React from "react";
import { useGlobalContext } from "../context";
import AchieveCard from "../components/AchieveCard";

import bookIcon from "img/icons/book-icon.png";
import convoIcon from "img/icons/convo-bubble-icon.png";
import signIcon from "img/icons/sl-icon.png";
import fireIcon from "img/icons/fire-icon.png";

const Profile = () => {
  const { user } = useGlobalContext();

  const userAchievement = user.achievement;

  const monthChoice = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const userJoinDate = new Date(user.joinDate);
  const month = monthChoice[userJoinDate.getMonth()];
  const year = userJoinDate.getFullYear();

  return (
    <section className="section profile-section container">
      <div className="row">
        <div className="col-xs-1">
          <img src={user.img} className="rounded" />
        </div>
        <div className="col-xs-10 justify-center">
          <h3 className="">{user ? user.username : `My Profile`}</h3>
          <p>{user ? `Joined since ${month} ${year}` : `You need to log in`}</p>
        </div>
      </div>

      <div className="row section">
        <h3>Achievements</h3>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div className="achieve-cards-center">
            <AchieveCard
              iconImg={bookIcon}
              title="lesson"
              number={userAchievement.noLesson}
            />
            <AchieveCard
              iconImg={convoIcon}
              title="conversation"
              number={userAchievement.noConversation}
            />
            <AchieveCard
              iconImg={signIcon}
              title="sign"
              number={userAchievement.noVocabulary}
            />
            <AchieveCard
              iconImg={fireIcon}
              title="day"
              number={userAchievement.noStreak}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
