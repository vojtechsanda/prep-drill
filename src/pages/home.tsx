import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useIntl } from "react-intl";

import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

type HelloHeadingInfo = {
  id: number;
  top: number;
  left: number;
};

export function Home() {
  const intl = useIntl();

  const [count, setCount] = useState(0);
  const [floatingHelloes, setFloatingHelloes] = useState<HelloHeadingInfo[]>(
    [],
  );

  const handleClick = () => {
    setCount((prev) => prev + 1);

    setFloatingHelloes((prev) => [
      ...prev,
      {
        id: Math.random(),
        top: Math.random() * 100,
        left: Math.random() * 100,
      },
    ]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {floatingHelloes.map((item) => (
          <h1
            className="absolute text-4xl whitespace-nowrap"
            key={item.id}
            style={{ top: `${item.top}%`, left: `${item.left}%` }}
          >
            {intl.formatMessage({
              id: "hello-world.title",
              defaultMessage: "Hello, world!",
            })}
          </h1>
        ))}
      </div>

      <div className="grid items-center h-full justify-items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl">
            {intl.formatMessage({
              id: "hello-world.title",
              defaultMessage: "Hello, world!",
            })}
          </h1>

          <Button onClick={handleClick}>
            {intl.formatMessage(
              {
                id: "hello-world.button",
                defaultMessage: "You clicked {count} times",
              },
              {
                count,
              },
            )}
          </Button>
        </div>
      </div>
    </QueryClientProvider>
  );
}
