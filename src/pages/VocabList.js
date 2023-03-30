import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
import { getVocabs } from "../api";

const VocabList = () => {
  const { lessons } = useGlobalContext();
  var [vocabsGroup, setVocabsGroup] = useState([]);

  useEffect(() => {
    const fetchVocabs = async() => {
      const res = await getVocabs();
      const vocabs = res.data.vocabularies;

      const vocabsGroupByLesson = vocabs.reduce((r, item) => {
        r[item.lessonId] = [...(r[item.lessonId] || []), item];
        return r;
      }, {});

      setVocabsGroup(vocabsGroupByLesson);
    }
    
    fetchVocabs();
  }, []);

  if (!vocabsGroup) {
    return <Loading />;
  }

  return (
    <section className="container section">
      <h3 className="section-title">Vocabularies</h3>
      {Object.entries(vocabsGroup).map(([lessonId, vocabs]) => {
        let lesson = lessons.find(x => x.lessonId == lessonId);
        return (
          <div key={lessonId}>
            <h3 className="lesson-title">
              Lesson {lessonId}: {lesson.title}
            </h3>
            <div className="cards-center">
              {vocabs.map((item) => {
                return (
                  <Card
                    key={item.vocabIndex}
                    url={`lesson/${lessonId}/vocabulary/${item.vocabIndex}`}
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

export default VocabList;
