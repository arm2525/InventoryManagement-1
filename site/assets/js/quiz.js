function gradeQuiz(formId, resultId, answerKey) {
  const form = document.getElementById(formId);
  const resultContainer = document.getElementById(resultId);

  if (!form || !resultContainer) {
    return;
  }

  const formData = new FormData(form);
  let score = 0;
  const feedback = [];

  Object.entries(answerKey).forEach(([question, answer]) => {
    const response = formData.get(question);
    if (response === answer) {
      score += 1;
      feedback.push(`✔️ ${question}: Correct`);
    } else if (response) {
      feedback.push(`❌ ${question}: Expected ${answer}`);
    } else {
      feedback.push(`⚠️ ${question}: No answer submitted`);
    }
  });

  const total = Object.keys(answerKey).length;
  resultContainer.innerHTML = `You scored <strong>${score}</strong> out of <strong>${total}</strong>.<br>${feedback.join('<br>')}`;
}

function attachQuizHandlers() {
  document.querySelectorAll('[data-quiz-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formId = form.getAttribute('id');
      const resultId = form.dataset.resultTarget;
      const answerKey = JSON.parse(form.dataset.answers);
      gradeQuiz(formId, resultId, answerKey);
    });
  });
}

document.addEventListener('DOMContentLoaded', attachQuizHandlers);
