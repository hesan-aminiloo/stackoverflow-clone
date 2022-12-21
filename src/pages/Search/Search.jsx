
// Hooks
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";

// Components
import { Error, RenderWhen } from "../../components";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import useQuestions from "../../hooks/useQuestions";

const Search = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useQuestions(searchParams.get('query'));

  return (
    <div className="py-8">
      <RenderWhen condition={isLoading}>
        <Skeleton count={3} className='h-36 mb-6' />
      </RenderWhen>

      <RenderWhen condition={error}>
        <Error />
      </RenderWhen>

      <RenderWhen condition={!isLoading && data && data?.questions.length}>
        <h1 className='mb-8 text-lg font-bold'>Search Results</h1>
        {
          data.questions.map(({ id, title, views, rate, description, author, answers, tags }) => (
            <QuestionItem
              key={id}
              id={id}
              className="mb-4"
              title={title}
              rate={rate}
              views={views}
              description={description}
              author={author}
              answers={answers}
              tags={tags}
            />
          ))
        }
      </RenderWhen>
    </div>
  )
};

export default Search;