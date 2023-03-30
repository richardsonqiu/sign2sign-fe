import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
import { getConversations } from "../api";

const ConvoList = () => {
  const { lessons } = useGlobalContext();
  var [convosGroup, setConvosGroup] = useState([]);

  useEffect(() => {
    const fetchVocabs = async() => {
      const res = await getConversations();
      const convos = res.data.conversations;

      const convosGroupByLesson = convos.reduce((r, item) => {
        r[item.lessonId] = [...(r[item.lessonId] || []), item];
        return r;
      }, {});

      setConvosGroup(convosGroupByLesson);
    }
    
    fetchVocabs();
  }, []);

  if (!convosGroup) {
    return <Loading />;
  }

  return (
    <section className="container section">
      <h3 className="section-title">Conversations</h3>
      {Object.entries(convosGroup).map(([lessonId, convos]) => {
        let lesson = lessons.find(x => x.lessonId == lessonId);
        return (
          <div key={lessonId}>
            <h3 className="lesson-title">
              Lesson {lessonId}: {lesson.title}
            </h3>
            <div className="cards-center">
              {convos.map((item) => {
                return (
                  <Card
                    key={item.convoIndex}
                    url={`lesson/${lessonId}/conversation/${item.convoIndex}`}
                    title={`${item.title}`}
                    img={item.img}
                    desc={item.desc}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ConvoList;
