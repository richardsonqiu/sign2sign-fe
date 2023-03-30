import React from "react";

const About = () => {
  return (
    <section className="section about-section">
      <h3 className="section-title">About Sign2Sign</h3>
      <p style={{textAlign: "center"}}>
        Sign2Sign is a hands-on sign language learning app for users to learn
        signing vocabularies and practice them in conversations. Our app
        leverages on interactive 3D avatar and AI for sign recognition.
        With our app, we aim to bridge the language barrier between people of
        the deaf community who rely on sign language as their main mode of
        communication and their hearing family members.
      </p>
      <h3 className="section-title" style={{marginTop: "2rem"}}>View our demo video</h3>
      <div style={{overflow: "hidden", paddingBottom: "56.25%", position: "relative", height: 0}}>
        <iframe src='https://www.youtube.com/embed/IPWyFW4Y7Iw'
          frameborder='0'
          allow='autoplay; encrypted-media'
          allowfullscreen
          title='Sign2Sign Demo Video'
          style={{left: 0, top: 0, height: "100%", width: "100%", position: "absolute"}}
        />
      </div>
    </section>
  );
};

export default About;
