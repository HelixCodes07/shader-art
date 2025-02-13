/* eslint-disable react/display-name */
import { memo, useEffect, useRef } from "react";
import { useSpring } from "framer-motion";

// Glyphs for animation
const glyphs = [
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "サ",
  "シ",
  "ス",
  "セ",
  "ソ",
];

const CharType = {
  Glyph: "glyph",
  Value: "value",
};

// Shuffle function for text animation
function shuffle(content, output, position) {
  return content.map((value, index) =>
    index < position
      ? { type: CharType.Value, value }
      : {
          type: CharType.Glyph,
          value: glyphs[Math.floor(Math.random() * glyphs.length)],
        }
  );
}

export const DecoderText = memo(
  ({ text, start = true, delay: startDelay = 0 }) => {
    const output = useRef([]);
    const container = useRef();
    const decoderSpring = useSpring(0, { stiffness: 10, damping: 6 }); // Adjust stiffness and damping for desired animation

    useEffect(() => {
      const content = text.split("");
      const renderOutput = () => {
        container.current.innerHTML = output.current
          .map(
            (item) =>
              `<span class="${
                item.type === CharType.Glyph
                  ? "glyph opacity-80 font-normal"
                  : "value opacity-100"
              }">${item.value}</span>`
          )
          .join("");
      };

      const unsubscribeSpring = decoderSpring.on("change", (value) => {
        output.current = shuffle(content, output.current, value);
        renderOutput();
      });

      const startAnimation = async () => {
        await new Promise((resolve) => setTimeout(resolve, startDelay)); // Inline delay function
        decoderSpring.set(content.length);
      };

      if (start) {
        startAnimation();
      }

      return () => {
        unsubscribeSpring?.();
      };
    }, [decoderSpring, start, startDelay, text]);

    return (
      <span className="relative">
        <span
          aria-hidden="true"
          ref={container}
          className="inline-block"
        ></span>
      </span>
    );
  }
);
