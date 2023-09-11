import "./index.css";
import {
  profileLinks1,
  profileLinks2,
  profileLinks3,
  profileLinks4,
} from "../../About";

const About = () => {
  const { linkedin: linkedin1, github: github1, email: email1 } = profileLinks1;
  const { linkedin: linkedin2, github: github2, email: email2 } = profileLinks2;
  const { linkedin: linkedin3, github: github3, email: email3 } = profileLinks3;
  const { linkedin: linkedin4, github: github4, email: email4 } = profileLinks4;

  return (
    <footer className="about-footer">
      <div className="about-containers">
        <span className="about-text">Created by Brandon Vang </span>
        <span className="About1">
          <a href={github1} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href={linkedin1} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={`mailto:${email1}`}>
            <i className="fas fa-envelope"></i>
          </a>
        </span>
      </div>

      <div className="about-containers">
        <span className="about-text">Makoto Doi </span>
        <span className="About2">
          <a href={github2} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href={linkedin2} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={`mailto:${email2}`}>
            <i className="fas fa-envelope"></i>
          </a>
        </span>
      </div>

      <div className="about-containers">
        <span className="about-text">Richard Lee </span>
        <span className="About3">
          <a href={github3} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href={linkedin3} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={`mailto:${email3}`}>
            <i className="fas fa-envelope"></i>
          </a>
        </span>
      </div>

      <div className="about-containers">
        <span className="about-text">Jimmy Xu</span>
        <span className="About4">
          <a href={github4} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href={linkedin4} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={`mailto:${email4}`}>
            <i className="fas fa-envelope"></i>
          </a>
        </span>
        <span className="about-text"> @2023</span>
      </div>
    </footer>
  );
};

export default About;
