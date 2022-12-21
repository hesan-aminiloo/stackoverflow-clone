import { Link } from "react-router-dom";

const AskQuestion = ({ total }) => {
  return (
    <div className="flex justify-between py-10 border-b border-gray-300 mb-10 items-center">
      <div className="flex flex-col">
        <div className='text-sm mb-2'>
          <span className='text-gray-500'>Total questions: </span>
          <span>{total}</span>
        </div>
        <div className='text-sm'>
          <span className='text-gray-500'>Your questions: </span>
          <span>3</span>
        </div>
      </div>
      <div>
        <Link to="/ask" className="bg-blue-500 border border-blue-400 text-white rounded p-4 text-sm hover:bg-blue-600 transition-colors">
          Ask Question
        </Link>
      </div>
    </div>
  );
}

export default AskQuestion;