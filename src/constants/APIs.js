
const BASE_API = process.env.REACT_APP_BASE_URL;

const Endpoints = {
  postQuestion: () => `${BASE_API}/questions`,
  getQuestions: (q) => `${BASE_API}/questions${q ? `?${q}` : ''}`,
  getQuestionById: (id) => `${BASE_API}/questions/${id}`,
};

export default Endpoints;