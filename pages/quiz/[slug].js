// pages/quiz/[slug].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import questions from '../data/questions.json';

export default function QuizQuestion() {
  const router = useRouter();
  const { slug } = router.query;
  const questionIndex = parseInt(slug) - 1;
  const questionData = questions[questionIndex];

  const [scores, setScores] = useState({});

  if (!questionData) return <p>Cargando...</p>;

  const handleAnswer = (answerScores) => {
    // Actualiza los puntajes
    const updatedScores = { ...scores };
    Object.entries(answerScores).forEach(([key, value]) => {
      updatedScores[key] = (updatedScores[key] || 0) + value;
    });
    setScores(updatedScores);

    // Navega a la siguiente pregunta o resultados
    if (questionIndex + 1 < questions.length) {
      router.push(`/quiz/${questionIndex + 2}`);
    } else {
      router.push({ pathname: '/results', query: { scores: JSON.stringify(updatedScores) } });
    }
  };

  return (
    <div>
      <div>Progreso: {`${questionIndex + 1} / ${questions.length}`}</div>
      <h1>{questionData.question}</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        {questionData.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer.scores)}>
            {answer.option}
          </button>
        ))}
      </div>

    </div>
    
  );
  
}
