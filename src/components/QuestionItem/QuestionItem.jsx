
// Utils
import clsx from 'clsx';

// Components
import { Link } from 'react-router-dom';
import RenderWhen from '../RenderWhen/RenderWhen';
import Tags from '../Tags';

const QuestionInfoItem = ({ title, value }) => {
  return (
    <div className="mb-2 w-full text-right">
      <span className='text-slate-900 text-sm'>{value}</span>
      <span className="px-2 text-gray-500 text-sm">{title}</span>
    </div>
  )
};

const QuestionItem = ({ className = '', id, title, date, tags, author, description, views, rate, answers }) => {
  console.log({date});
  return (
    <div className={clsx('rounded p-4 border border-gray-200 mb-4 flex flex-col w-full', className)}>
      <div className="flex">
        <div className="flex items-center justify-center w-1/4 flex-col px-8">
          <QuestionInfoItem
            title={'Views'}
            value={views}
          />
          <QuestionInfoItem
            title={`Vote${rate?.total === 1 ? '' : 's'}`}          
            value={rate?.total}
          />
          <QuestionInfoItem
            title={`Answer${answers?.total === 1 ? '' : 's'}`}
            value={answers?.total?.toString()}
          />
        </div>
        <div className='w-full'> 
          <Link to={`/questions/${id}`}>
            <h2 className="w-3/4 mb-2 text-lg text-slate-900">{title}</h2>
          </Link>
          <RenderWhen condition={tags && tags.length}>
            <div className='mb-4'>
              <Tags tags={tags} />
            </div>
          </RenderWhen>
          <p className='text-sm text-gray-500'>
            {description.slice(0, 20)}...
          </p>
        </div>
      </div>
      <div className="text-right pt-2 text-xs">
        <span className="text-gray-400">Asked by </span>
        <span>{author}</span>
        <span className="text-gray-400"> on </span>
        <span>{date}</span>
      </div>
    </div>
  )
};

export default QuestionItem;