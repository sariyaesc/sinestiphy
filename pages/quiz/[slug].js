import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import questions from "../data/questions.json";
import Background from "../../components/common/Background";
import Image from "next/image";


export default function QuizQuestion() {
  const router = useRouter();
  const { slug } = router.query;
  const questionIndex = parseInt(slug) - 1;
  const questionData = questions[questionIndex];

  const [scores, setScores] = useState({});
  
  if (!questionData) return <p>Loading...</p>;

  const handleAnswer = (answerScores) => {
    const updatedScores = { ...scores };
    Object.entries(answerScores).forEach(([key, value]) => {
      updatedScores[key] = (updatedScores[key] || 0) + value;
    });
    setScores(updatedScores);

    // Navega a la siguiente pregunta o resultados
    if (questionIndex + 1 < questions.length) {
      router.push(`/quiz/${questionIndex + 2}`);
    } else {
      router.push({
        pathname: "/results",
        query: {  scores: JSON.stringify(updatedScores) },
      });
    }
  };

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/global.css" />
      <section className="relative h-[100vh] flex flex-col p-16 justify-center items-center">
        <Background
          width="100%"
          height="100%"
          className="absolute top-0 left-0 z-0 brightness-90"
        />

        <div className="text-white z-10 ">{`${questionIndex + 1} / ${
          questions.length
        }`}</div>
        <h1 className="text-white mt-3 mb-5 text-3xl">
          {questionData.question}
        </h1>
        <div
          style={{ display: "flex", gap: "10px" }}
          className="text-white z-10"
        >
          <section
            className={`grid gap-7 ${questionData.answers.length === 3 ? "grid-rows-1 grid-cols-3" : "grid-rows-2 grid-flow-col"}`}
          >
            {questionData.answers.map((answer, index) => (
              <button
                className=""
                key={index}
                onClick={() => handleAnswer(answer.scores)}
              >
                <Image
                  src={`/${answer.option}.png`}
                  alt={`${answer.option}`}
                  width={160}
                  height={160}
                  className="rounded-xl drop-shadow-lg hover:brightness-75 transition duration-700"
                ></Image>
              </button>
            ))}
          </section>
        </div>
        
      </section>
    
    </div>
  );
}

