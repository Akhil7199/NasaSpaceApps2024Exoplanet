import React, { useState } from 'react';
import './quiz.css';

const quizQuestions = {
    beginner: [
      {
        question: "What is an exoplanet?",
        options: [
          "A planet outside our solar system.",
          "A planet inside our solar system.",
          "A moon orbiting a planet",
          "None of the above"
        ],
        correct: "A planet outside our solar system."
      },
      {
        question: "How are exoplanets typically discovered?",
        options: [
          "Radial velocity",
          "Transit method",
          "Gravitational microlensing",
          "All of the above"
        ],
        correct: "All of the above"
      },
      {
        question: "What is the name of the first exoplanet discovered?",
        options: [
          "Proxima Centauri B",
          "51 Pegasi B",
          "Teegarden’s star D",
          "Kepler-186F"
        ],
        correct: "51 Pegasi B"
      },
      {
        question: "What is the closest star to our solar system?",
        options: [
          "Alpha Centauri",
          "Barnard’s star",
          "Proxima Centauri",
          "Lalande"
        ],
        correct: "Proxima Centauri"
      },
      {
        question: "What is the main source of energy for stars?",
        options: [
          "Nuclear fusion",
          "Nuclear fission",
          "Light energy",
          "All of the above"
        ],
        correct: "Nuclear fusion"
      },
      {
        question: "What is the name of our galaxy?",
        options: [
          "Spiral galaxy",
          "Comet galaxy",
          "Andromeda",
          "Milky way galaxy"
        ],
        correct: "Milky way galaxy"
      },
      {
        question: "What is the largest object in our solar system?",
        options: [
          "The Earth",
          "The moon",
          "Asteroids and comets",
          "None of the above"
        ],
        correct: "None of the above"
      },
      {
        question: "Which planet is referred to as the largest gas giant?",
        options: [
          "Jupiter",
          "Earth",
          "Saturn",
          "Venus"
        ],
        correct: "Jupiter"
      },
      {
        question: "Which planet is known as the red planet?",
        options: [
          "Mercury",
          "Uranus",
          "Mars",
          "Neptune"
        ],
        correct: "Mars"
      },
      {
        question: "Which planet is known as the dwarf planet?",
        options: [
          "Pluto",
          "Jupiter",
          "Saturn",
          "None of the above"
        ],
        correct: "Pluto"
      }
    ],
    intermediate: [
      {
        question: "What is the name of the telescope that has discovered thousands of exoplanets?",
        options: [
          "Hubble Space Telescope",
          "James Webb Space Telescope",
          "Kepler Space Telescope",
          "Spitzer Space Telescope"
        ],
        correct: "Kepler Space Telescope"
      },
      {
        question: "Which element is primarily produced in the core of a star during the main sequence phase?",
        options: [
          "Helium",
          "Carbon",
          "Oxygen",
          "Iron"
        ],
        correct: "Helium"
      },
      {
        question: "When was the first exoplanet discovered?",
        options: [
          "1990",
          "1992",
          "1994",
          "1995"
        ],
        correct: "1995"
      },
      {
        question: "Who discovered the first exoplanet?",
        options: [
          "Michel mayor and Didier Queloz",
          "Nicolaus Copernicus",
          "Edmond Halley",
          "Edwin hubble and ptolemy"
        ],
        correct: "Michel mayor and Didier Queloz"
      },
      {
        question: "What is the primary factor that determines the lifecycle of a star?",
        options: [
          "Its temperature",
          "Its mass",
          "Its distance from Earth",
          "Its colour"
        ],
        correct: "Its mass"
      },
      {
        question: "Which method of exoplanet detection involves observing the bending of light from a distant star due to the gravitational field of a planet?",
        options: [
          "Transit method",
          "Radial velocity method",
          "Direct imaging",
          "Gravitational microlensing"
        ],
        correct: "Gravitational microlensing"
      },
      {
        question: "What is the significance of the discovery of Proxima Centauri b?",
        options: [
          "It is the first exoplanet discovered",
          "It is the closest known exoplanet to Earth",
          "It is the largest exoplanet discovered",
          "It is the first exoplanet with confirmed water"
        ],
        correct: "It is the closest known exoplanet to Earth"
      },
      {
        question: "What is the name of the first artificial satellite launched into space?",
        options: [
          "Voyager 1",
          "Sputnik 1",
          "Hubble",
          "Apollo 11"
        ],
        correct: "Sputnik 1"
      },
      {
        question: "What is the term for a star that suddenly increases in brightness and then fades?",
        options: [
          "Supernova",
          "Nova",
          "Pulsar",
          "Quasar"
        ],
        correct: "Nova"
      },
      {
        question: "Which space mission was the first to land humans on the Moon?",
        options: [
          "Apollo 11",
          "Apollo 13",
          "Gemini 4",
          "Mercury-Atlas 6"
        ],
        correct: "Apollo 11"
      }
    ],
    advanced: [
      {
        question: "What is the primary challenge in detecting Earth-sized exoplanets using the radial velocity method?",
        options: [
          "Their small size and low mass",
          "Their distance from Earth",
          "The brightness of their parent stars",
          "The presence of multiple planets in the system"
        ],
        correct: "Their small size and low mass"
      },
      {
        question: "What is the significance of the discovery of the TRAPPIST-1 system?",
        options: [
          "It contains the first exoplanet discovered",
          "It has seven Earth-sized planets, three of which are in the habitable zone",
          "It is the closest exoplanetary system to Earth",
          "It contains the largest known exoplanet"
        ],
        correct: "It has seven Earth-sized planets, three of which are in the habitable zone"
      },
      {
        question: "What is the Roche limit, and why is it significant in the study of exoplanets?",
        options: [
          "The distance within which a planet will be tidally disrupted by its star",
          "The distance at which a planet can no longer retain an atmosphere",
          "The distance at which a planet’s magnetic field becomes ineffective",
          "The distance at which a planet’s orbit becomes unstable"
        ],
        correct: "The distance within which a planet will be tidally disrupted by its star"
      },
      {
        question: "What is the primary goal of the James Webb Space Telescope in the context of exoplanet research?",
        options: [
          "To discover new exoplanets",
          "To study the atmospheres of known exoplanets",
          "To measure the masses of exoplanets",
          "To detect gravitational waves from exoplanetary systems"
        ],
        correct: "To study the atmospheres of known exoplanets"
      },
      {
        question: "Which type of exoplanet is characterised by having a very short orbital period, often less than one day?",
        options: [
          "Hot Jupiter",
          "Super-Earth",
          "Ultra-short-period planet",
          "Rogue planet"
        ],
        correct: "Ultra-short-period planet"
      },
      {
        question: "What is the primary method used to determine the composition of an exoplanet’s atmosphere?",
        options: [
          "Direct imaging",
          "Radial velocity method",
          "Transit spectroscopy",
          "Gravitational microlensing"
        ],
        correct: "Transit spectroscopy"
      },
      {
        question: "What is the name of the first interstellar object detected passing through our solar system?",
        options: [
          "oumuamua",
          "Halley’s Comet",
          "Hale-Bopp",
          "Encke’s Comet"
        ],
        correct: "oumuamua"
      },
      {
        question: "What is the name of the effect that causes the apparent change in frequency of light from a star due to the motion of an orbiting planet?",
        options: [
          "Doppler Effect",
          "Gravitational Lensing",
          "Redshift",
          "Blueshift"
        ],
        correct: "Doppler Effect"
      },
      {
        question: "Which mission was the first to fly by Pluto and provide detailed images of its surface?",
        options: [
          "Voyager 2",
          "New Horizons",
          "Cassini",
          "Galileo"
        ],
        correct: "New Horizons"
      },
      {
        question: "Which moon in the solar system is believed to have a subsurface ocean beneath its icy crust?",
        options: [
          "Europa",
          "Titan",
          "Ganymede",
          "Enceladus"
        ],
        correct: "Europa"
      }
    ]
  };

  const Quiz = ({ onQuizFinish }) => {
    const [currentLevel, setCurrentLevel] = useState("beginner");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [quizEnded, setQuizEnded] = useState(false);
  
    const handleAnswerClick = (answer) => {
      setUserAnswer(answer);
      setAnswered(true);
      if (answer === quizQuestions[currentLevel][currentQuestionIndex].correct) {
        setScore(score + 1);
      }
    };
  
    const nextQuestion = () => {
        if (currentQuestionIndex === quizQuestions[currentLevel].length - 1) {
          setQuizEnded(true); // Ends quiz on last question
          return;
        }
        setAnswered(false);
        setUserAnswer("");
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      };
      
  
    const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswered(false);
      setUserAnswer("");
      setQuizEnded(false);
    };
  
    const changeLevel = (level) => {
      resetQuiz();
      setCurrentLevel(level);
    };
  
    const currentQuestion = quizQuestions[currentLevel][currentQuestionIndex];
  
    return (
      <div className="container mt-5">
        <h1 className="text-center">Exoplanet Quiz</h1>
        {quizEnded ? (
          <div className="text-center">
          <h2>Your Score: {score}/{quizQuestions[currentLevel].length}</h2>
          {score >= 8 ? (
            <div className="alert alert-success">Great job! You really know your exoplanets!</div>
          ) : (
            <div className="alert alert-warning">Good effort! Try again and see if you can improve!</div>
          )}
          <button className="btn btn-primary m-2" onClick={resetQuiz}>Restart Quiz</button>
          <button className="btn btn-secondary m-2" onClick={onQuizFinish}>Go Back to Exoplanets</button>
        </div>
        ) : (
          <>
            <div className="d-flex justify-content-center mb-3">
              <button className="btn btn-info mx-2" onClick={() => changeLevel("beginner")}>Beginner</button>
              <button className="btn btn-info mx-2" onClick={() => changeLevel("intermediate")}>Intermediate</button>
              <button className="btn btn-info mx-2" onClick={() => changeLevel("advanced")}>Advanced</button>
            </div>
  
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">{currentQuestion.question}</h2>
                <div className="d-grid gap-2">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`btn ${answered ? (option === currentQuestion.correct ? 'btn-success' : 'btn-danger') : 'btn-outline-primary'}`}
                      onClick={() => handleAnswerClick(option)}
                      disabled={answered}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {answered && (
                  <div className="mt-3 text-center">
                    {userAnswer === currentQuestion.correct ? (
                      <div className="text-success">Correct!</div>
                    ) : (
                      <div className="text-danger">Incorrect. The correct answer is: {currentQuestion.correct}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
  
            <div className="d-flex justify-content-between mt-3">
              <p>Score: {score}/{quizQuestions[currentLevel].length}</p>
              <p>Question {currentQuestionIndex + 1} of {quizQuestions[currentLevel].length}</p>
            </div>
  
            <button
  className="btn btn-primary btn-lg d-block mx-auto"
  onClick={nextQuestion}
  disabled={!answered} // Only disable if unanswered
>
  {currentQuestionIndex === quizQuestions[currentLevel].length - 1 ? "Finish Quiz" : "Next Question"}
</button>

  
            <div className="progress-bar mt-3">
           <div
           className="progress-bar-fill"
           style={{
           width: `${((currentQuestionIndex + 1) / quizQuestions[currentLevel].length) * 100}%`
           }}
           ></div>
           </div>
          </>
        )}
      </div>
    );
  };
  
  export default Quiz;
  
  
  