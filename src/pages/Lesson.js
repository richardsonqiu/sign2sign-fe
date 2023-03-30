import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { getLesson } from "../api";
import Loading from "components/Loading";

const Lesson = () => {
  const { lessonId } = useParams(); // get lesson id from URL
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const res = await getLesson(lessonId);
      setLesson(res.data);
    }

    fetchLesson();
  }, []);

  if (!lesson) {
    return <Loading />
  }

  return (
    <section className="container section">
      <h1 className="section-title">
        Lesson {lessonId}: {lesson.title}
      </h1>
      <div className="cards-center">
        {lesson.vocabularies.map((item, index) => {
          return (
            <Card
              key={index}
              {...item}
              url={`lesson/${lessonId}/vocabulary/${index}`}
              title={item.title}
              img={item.img}
              desc={item.desc} // count # words in vocab API
            />
          );
        })}

        {lesson.conversations.map((item, index) => {
          return (
            <Card
              key={index}
              url={`lesson/${lessonId}/conversation/${index}`}
              title="Conversation"
              img={item.img}
              desc={item.title}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Lesson;
