
const RenderWhen = ({ children, condition }) => {
  return (
    <>
      {condition ? children : null}
    </>
  )
};

export default RenderWhen;