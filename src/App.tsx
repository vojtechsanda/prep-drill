import { useIntl } from "react-intl";

function App() {
  const intl = useIntl();

  return (
    <h1>
      {intl.formatMessage({
        id: "hello-world-test",
        defaultMessage: "Hello, world!",
      })}
    </h1>
  );
}

export default App;
