import Loading from "components/Loading";
import React from "react";
import Card from "../components/Card";
import { useGlobalContext } from "../context";

const LessonList = () => {
  const { lessons } = useGlobalContext();

  if (!lessons) {
    return <Loading />
  }

  return (
    <section className="container section">
      <h1 className="section-title">Lessons</h1>
      <div className="cards-center">
        {lessons.map((item) => {
          return (
            <Card
              key={item.lessonId}
              url={`lesson/${item.lessonId}`}
              title={`Lesson ${item.lessonId}`}
              img={item.img}
              desc={item.title}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LessonList;
