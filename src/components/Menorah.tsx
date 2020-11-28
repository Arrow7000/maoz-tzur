import React, { FC } from "react";
import styled, { css } from "styled-components";

const MenorahSvg = () => (
  <svg
    fill="#ddddc8"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="-345 257 100 100"
    enableBackground="new -345 257 100 100"
    xmlSpace="preserve"
  >
    <path
      className="candle one two three four five six seven eight"
      d="M-253.2,264.5c0,0-3.2,2.8-3.2,6.2  s1.4,6.2,3.2,6.2c1.8,0,3.2-2.8,3.2-6.2S-253.2,264.5-253.2,264.5z"
    ></path>
    <path
      className="candle two three four five six seven eight"
      d=" M-257.4,270.8c0,3.4-1.4,6.2-3.2,6.2c-1.8,0-3.2-2.8-3.2-6.2s3.2-6.2,3.2-6.2S-257.4,267.3-257.4,270.8z"
    ></path>
    <path
      className="candle three four five six seven eight"
      d="M-268.1,264.5  c0,0-3.2,2.8-3.2,6.2s1.4,6.2,3.2,6.2s3.2-2.8,3.2-6.2S-268.1,264.5-268.1,264.5z"
    ></path>
    <path
      className="candle four five six seven eight"
      d="M-275.5,264.5c0,0-3.2,2.8-3.2,6.2  s1.4,6.2,3.2,6.2c1.8,0,3.2-2.8,3.2-6.2S-275.5,264.5-275.5,264.5z"
    ></path>
    <path
      className="candle five six seven eight"
      d="M-313.4,264.5c0,0-3.2,2.8-3.2,6.2s1.4,6.2,3.2,6.2  c1.8,0,3.2-2.8,3.2-6.2S-313.4,264.5-313.4,264.5z"
    ></path>
    <path
      className="candle six seven eight"
      d="M-321.2,264.5c0,0-3.2,2.8-3.2,6.2s1.4,6.2,3.2,6.2s3.2-2.8,3.2-6.2  S-321.2,264.5-321.2,264.5z"
    ></path>
    <path
      className="candle seven eight"
      d="M-329,264.5c0,0-3.2,2.8-3.2,6.2s1.4,6.2,3.2,6.2c1.8,0,3.2-2.8,3.2-6.2S-329,264.5-329,264.5z"
    ></path>
    <path
      className="candle eight"
      d="M-336.8,264.5c0,0-3.2,2.8-3.2,6.2s1.4,6.2,3.2,6.2s3.2-2.8,3.2-6.2S-336.8,264.5-336.8,264.5z"
    ></path>
    <path
      className="shamash"
      d="M-294.5,262.3c0,0-3.2,2.8-3.2,6.2c0,3.4,1.4,6.2,3.2,6.2  c1.8,0,3.2-2.8,3.2-6.2C-291.3,265.1-294.5,262.3-294.5,262.3z"
    ></path>
    <path
      className="menorah__body"
      d="M-250.7,279.8h-4.4c0,22.7-16.5,41.3-37.2,42.6v-3.7  c19-1.2,34.2-18.2,34.2-38.9h-4.4c0,18.3-13.2,33.3-29.8,34.6v-3.7c14.9-1.2,26.7-14.6,26.7-30.9h-4.4c0,13.9-9.9,25.3-22.4,26.5  v-3.7c10.8-1.2,19.3-11,19.3-22.9h-4.4c0,9.5-6.5,17.3-14.9,18.5v-21.1h-4.4v21.1c-8.4-1.2-14.9-9-14.9-18.5h-4.4  c0,11.9,8.5,21.7,19.3,22.9v3.7c-12.5-1.2-22.4-12.6-22.4-26.5h-4.4c0,16.3,11.8,29.7,26.7,30.9v3.7c-16.6-1.2-29.8-16.3-29.8-34.6  h-4.4c0,20.7,15.1,37.7,34.2,38.9v3.7c-20.7-1.2-37.2-19.9-37.2-42.6h-4.4c0,25.1,18.5,45.7,41.6,46.9v20.6  c-5.6,0.4-9.8,2.2-9.8,4.4h24.1c0-2.2-4.2-4.1-9.8-4.4v-20.6C-269.1,325.5-250.7,304.9-250.7,279.8z"
    ></path>
  </svg>
);

const MenorahContainer = styled.div`
  width: 150px;
  margin: 0 auto;
`;

type Day =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight";

interface MenorahProps {
  day: Day | null;
}

const MenorahImg = styled.div<MenorahProps>`
  display: block;
  width: 200px;
  margin-right: auto;
  margin-left: auto;
  padding: 20px 0 0;
  max-width: 100%;

  ${({ day }) =>
    day &&
    css`
      .candle {
        fill: #223;
      }

      .shamash,
      .${day} {
        fill: #ff0;
      }
    `}

  @media (min-width: 600px) {
    width: 100px;
    padding: 20px 0 0;
  }

  @media (min-width: 850px) {
    width: 200px;
    padding: 20px 0 0;
  }
`;

export const Menorah: FC<MenorahProps> = ({ day }) => (
  <MenorahContainer>
    <MenorahImg day={day}>
      <MenorahSvg />
    </MenorahImg>
    {false && <canvas className="Menorah__canvas" id="menorah" />}
  </MenorahContainer>
);

export const numToDayMap: Record<number, Day> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
};
