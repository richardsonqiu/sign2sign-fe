import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";
import Card from "../components/Card";
import AllCard from "../components/AllCard";
import { getProgress } from "../api";

const Home = () => {
  const { user } = useGlobalContext();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await getProgress();
      setProgress(res.data);
    };
    
    fetchProgress();
  }, []);

  if (!progress) {
    return <Loading />;
  }

  const { lesson, vocabulary, conversation } = progress;

  return (
    <section className="container section">
      <h1 className="section-title">Hi {user.username}</h1>
      <div className="cards-center">
        <div className="section-material">
          <Card
            url={`lesson/${lesson.lessonId}`}
            progress={lesson.lessonId}
            title="My current lesson"
            desc={lesson.title}
            img={lesson.img}
            isHome="home"
          />
          <AllCard url="lessons" />
        </div>

        <div className="section-material">
          <Card
            url={`lesson/${vocabulary.lessonId}/vocabulary/${vocabulary.vocabIndex}`}
            progress={vocabulary.lessonId}
            title="My current vocabulary"
            desc={vocabulary.title}
            img={vocabulary.img}
            isHome="home"
          />
          <AllCard url="vocabularies" />
        </div>

        <div className="section-material">
          <Card
            url={`lesson/${conversation.lessonId}/conversation/${conversation.convoIndex}`}
            progress={conversation.lessonId}
            title="My current conversation"
            desc={conversation.title}
            img={conversation.img}
            isHome="home"
          />
          <AllCard url="conversations" />
        </div>
      </div>
    </section>
  );
};

export default Home;
