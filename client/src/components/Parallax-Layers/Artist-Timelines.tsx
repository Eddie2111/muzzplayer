import { Image } from '@nextui-org/react';

import { AuroraBackground } from '../Aurora-Backgrounds';
import {
  LeftFramingAnimation,
  RightFramingAnimation,
} from '../Framers';

export function ParallaxingLayer() {
  return (
    <div>
      <img
        src="/ffflurry.svg"
        className="bg-cover h-[140vh] w-[100vw] absolute"
        alt="text"
      />
      <div className="flex flex-row justify-center items-center gap-6 my-24">
        <LeftFramingAnimation>
          <Image
            src="https://www.billboard.com/wp-content/uploads/2022/07/One-Direction-2013-billboard-1548.jpg?w=942&h=623&crop=1"
            height="600"
            width="800"
            alt="image sleeper"
          />
        </LeftFramingAnimation>

        <RightFramingAnimation speed={1}>
          <AuroraBackground className="px-6 py-16 w-[32rem] h-52 text-xl font-semibold items-left rounded-lg">
            Enjoy the vibe in any direction, with{" "}
            <span className="font-bold text-2xl itallic hover:underline hover:text-blue-500 duration-300 my-2">
              One Direction
            </span>
          </AuroraBackground>
        </RightFramingAnimation>
      </div>
    </div>
  );
}
