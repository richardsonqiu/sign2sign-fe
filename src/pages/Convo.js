import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Loading from "../components/Loading";

import { getConversation } from "../api";
import { ConvoPractice } from "../components/ConvoPractice";
import { ConvoQuiz } from "components/ConvoQuiz";

const Convo = () => {
  const { lessonId, convoIndex } = useParams(); // to fetch which lesson and which vocab
  const history = useHistory();
  const [mode, setMode] = useState("practice");
  // const [mode, setMode] = useState("quiz");

  const [convo, setConvo] = useState(null);

  useEffect(() => {
    const fetchConvo = async () => {
      const res = await getConversation(lessonId, convoIndex);
      const convo = res.data;

      // console.log(convo);

      setConvo(convo);
      console.log(convo)
    };

    fetchConvo();
  }, []);

  if (!convo) {
    return <Loading />;
  }

  switch (mode) {
    case "practice":
      return <ConvoPractice
        title={convo.title}
        dialogues={convo.dialogue}
        onPrevSection={() => history.push(`/lesson/${lessonId}`)}
        onNextSection={() => setMode("quiz")}
      />
    case "quiz":
      return <ConvoQuiz 
        title={convo.title}
        dialogue={convo.dialogue}
        onPrevSection={() => setMode("practice")}
        onNextSection={() => history.push(`/lesson/${lessonId}`)}
      />
    default:
      return <>Oof</>
  }
};

export default Convo;
