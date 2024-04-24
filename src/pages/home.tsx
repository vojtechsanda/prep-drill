import { Banana, Bird } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

import { Button } from "@/components/ui/button";

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
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {floatingHelloes.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{ top: `${item.top}vh`, left: `${item.left}vw` }}
          >
            {intl.locale === "en" ? <Banana /> : <Bird />}
          </div>
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
    </>
  );
}
