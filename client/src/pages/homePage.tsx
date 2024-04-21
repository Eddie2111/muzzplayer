/* eslint-disable */

import React from 'react';

import { toast } from 'sonner';

import {
  Button,
  Input,
} from '@nextui-org/react';
import { ReactLenis } from '@studio-freight/react-lenis';

import {
  BackgroundGradientAnimation,
} from '../components/Background-Gradient-Animation';
import {
  LeftFramingAnimation,
  RightFramingAnimation,
} from '../components/Framers';
import {
  ParallaxingLayer,
} from '../components/Parallax-Layers/Artist-Timelines';
import {
  TypographyHeading,
  TypographyMedium,
  TypographySmall,
  TypographyTitle,
} from '../components/typographies/Typography';
import Footer from '../components/ui/Footer';
import { VideoPlayer } from '../components/Video-Player';

export default function Home() {
  return (
    <ReactLenis root>
      <div>
        <TypographyHeading>MUZZPLAYER</TypographyHeading>
      </div>

      <VideoPlayer />

      <div>
        <TypographyTitle>
          MUZZPLAYER has a huge collections of albums, songs, recordings,
          mashups, mix-tapes and nearly all the musics that a mind would seek
          for. Why seeking for video when only music that hits the heart?
          MUZZPLAYER provides the music from the cloud to fill your heart's
          requirement.
        </TypographyTitle>
      </div>
      <ParallaxingLayer />

      <BackgroundGradientAnimation>
        <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            LET&apos;S MAKE MUSIC FREE
          </p>
        </div>
      </BackgroundGradientAnimation>
      <SoulSection />
      <AboutSection />
      <Footer />
    </ReactLenis>
  );
}

function SoulSection() {
  return (
    <div className="relative h-[98vh] my-20">
      {/* Image as background */}
      <img
        src="/about.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />

      {/* Container for text with higher z-index */}
      <div className="absolute inset-0 flex flex-col z-10 w-42">
        {/* Text on left */}
        <LeftFramingAnimation>
          <TypographyTitle className="text-white text-left backdrop-blur-sm px-16 py-24 w-[42rem] mx-24">
            Music touches soul
          </TypographyTitle>
        </LeftFramingAnimation>
        <div className="h-72">&nbsp;</div>
        {/* Text on right */}
        <RightFramingAnimation>
          <TypographyTitle className="text-white text-right backdrop-blur-sm px-16 py-24 mt-[320px] w-[42rem] ml-[60vw]">
            Music touches Heart
          </TypographyTitle>
        </RightFramingAnimation>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="flex justify-center items-center">
      <div className="container bg-white mx-20 shadow-md shadow-slate-400 items-center justify-center w-full p-5 my-20">
        <TypographyTitle>Subscribe to our newsletter?</TypographyTitle>
        <TypographyMedium>
          Sign up to get the updates about your favourite artists, albums,
          bands, celeb gossips and many more!
        </TypographyMedium>
        <TypographySmall>
          Unsubscribing is included in the mail body, so you can cancel anytime
        </TypographySmall>
        <AboutSectionForm />
      </div>
    </div>
  );
}

function AboutSectionForm() {
  const [email, setEmail] = React.useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success(
      "Thank you for signing up, you will be recieving celeb gossips soon!"
    );
    setEmail("");
    console.log(email);
  }
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={submitHandle} className="flex flex-row gap-4">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="joe@email.com"
          className="w-52 h-12"
          value={email}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
        <Button type="submit" color="primary" className="my-1">
          Submit{" "}
        </Button>
      </form>
    </div>
  );
}
