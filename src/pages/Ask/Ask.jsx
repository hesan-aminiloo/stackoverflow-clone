import { useId, useState, forwardRef } from 'react';
import clsx from 'clsx';

// Hooks
import useSubmitQuestion from './hooks/useSubmitQuestion';

// Components
import { Error, RenderWhen } from '../../components';
import { useNavigate } from 'react-router-dom';

const QuestionTitle = ({ value, onChange, disabled, errorMsg, name }) => {
  const id = useId();

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="font-bold text-sm mb-2">Question</label>
      <input
        type="text"
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={clsx('p-2 border rounded w-1/2', {
          'border-red-400': errorMsg
        })}
        placeholder='How to use a computer...'
        name={name}
        // ref={ref}
      />
      <RenderWhen condition={errorMsg}>
        <div className='py-1 text-xs text-red-500'>{errorMsg}</div>
      </RenderWhen>
    </div>
  )
}

const Description = ({ value, onChange, disabled, errorMsg, name }) => {
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="font-bold text-sm mb-2">Description</label>
      <textarea
        className={clsx('min-h-[250px] border rounded p-2', {
          'border-red-400': errorMsg
        })} 
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        placeholder="I want my computer to answer whatever I want to know"
      ></textarea>
      <RenderWhen condition={errorMsg}>
        <div className='py-1 text-xs text-red-500'>{errorMsg}</div>
      </RenderWhen>
    </>
  )
}

const Ask = () => {
  const navigate = useNavigate();
  const { isLoading, error, errors, onSubmit, values, onChange } = useSubmitQuestion({ afterSubmission: () => {
    navigate('/')
  } });

  return (
    <div className="py-8 flex flex-col">
      <h1 className="text-xl font-bold mb-8">Ask your question</h1>

      <RenderWhen condition={error}>
        <Error />
      </RenderWhen>

      <form onSubmit={onSubmit} className="flex flex-col">

        <QuestionTitle
          value={values.title}
          onChange={onChange}
          disabled={isLoading}
          errorMsg={errors.title}
          name="title"
        />

        <Description
          value={values.description}
          onChange={onChange}
          disabled={isLoading}
          errorMsg={errors.description}
          name="description"
        />

        <div className='py-4 flex justify-end'>
          <div>
            <button className="py-2 px-4 mr-2 text-red-500 rounded" onClick={() => navigate(-1)}>Cancel</button>
            <button className="py-2 px-4  text-white rounded border bg-blue-500 border-blue-600 hover:bg-blue-600 transition-colors" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default Ask;