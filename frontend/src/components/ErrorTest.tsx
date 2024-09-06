import { useErrorReporting } from '../hooks/useErrorReporting';

function ErrorTest() {
  const reportError = useErrorReporting();

  const handleClick = () => {
    try {
      throw new Error('This is a test error from ErrorTest component');
    } catch (error) {
      if (error instanceof Error) {
        reportError(error, 'medium');
      }
    }
  };

  return (
    <div>
      <h2>Error Test Component</h2>
      <button onClick={handleClick}>Trigger Error</button>
    </div>
  );
}

export default ErrorTest;