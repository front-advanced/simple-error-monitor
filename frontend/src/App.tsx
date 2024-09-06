
function App() {
  const testError = () => {
    try {
      throw new Error("This is a test error");
    } catch (error) {
      if (error instanceof Error) {
        window.errorSDK.captureError(error);
      }
    }
  };

  return (
      <div className="App">
        <h1>Error Monitoring Platform</h1>
        {/* @ts-expect-error ignore*/}
        <h1>{{}.a.b}</h1>
        <button onClick={testError}>Test Error</button>
      </div>
  );
}

export default App;
