// import React from "react";
// import { useLocation } from "react-router-dom";

// export default function blogDetail() {
//   const location = useLocation();
//   const blog = location.state?.blog;

//   const tipsString = blog.body?.content || "";
//   const tipsArray = tipsString.split(/(?=\d+\.\s)/g).map((tip) => tip.trim());
//   const isoString = blog.updatedAt;
//   const date = new Date(isoString);
//   const randomImages = [
//     "https://images.unsplash.com/photo-1742995917580-becb015f088d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1745172366995-a55968e94797?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1745294279347-e1bcbcb30f8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1744043176705-6f61f70f1646?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1743878206228-5f36b5f5c830?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://plus.unsplash.com/premium_photo-1742559848715-9dffac6e65ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUyfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
//     "https://plus.unsplash.com/premium_photo-1669748151567-f2c4c55be354?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwOHw2c01WalRMU2tlUXx8ZW58MHx8fHx8",
//     "https://images.unsplash.com/photo-1743092440250-201d62342ae4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
//     "https://images.unsplash.com/photo-1737587653765-94bc8fe7b541?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNnw2c01WalRMU2tlUXx8ZW58MHx8fHx8",
//     "https://plus.unsplash.com/premium_photo-1719930222484-86600f8c74da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyMHw2c01WalRMU2tlUXx8ZW58MHx8fHx8",
//     "https://plus.unsplash.com/premium_photo-1696839222555-39c55f77fe3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDk2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",

//   ];

//   function getRandomImage() {
//     const randomIndex = Math.floor(Math.random() * randomImages.length);
//     return randomImages[randomIndex];
//   }

//   const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
//     date.getMonth() + 1
//   ).padStart(2, "0")}/${date.getFullYear()}`;
//   return (
//     <div className="flex flex-col  px-20 ">
//       <div className="flex flex-row justify-between flex-wrap">
//         <div className="w-[700px] uppercase text-2xl">
//           <h2 className="font-semibold leading-11 mb-10 uppercase">
//             {blog.title}
//           </h2>
//           <p className="mb-24 uppercase">{blog.introduction?.content}</p>
//           <p>Written by: ADMIN</p>
//           <p> Published: {formattedDate}</p>
//           <p className="mt-14">
//             {blog.introduction?.title} <br />
//             {blog.introduction?.content}
//           </p>
//         </div>
//         <img
//           className="w-[540px] h-[900px]"
//           src={getRandomImage()}
//         />
//       </div>
//       <div className="flex flex-row flex-wrap items-end mt-40">
//         <img
//           className="w-[340px] h-[500px]"
//           src={getRandomImage()}
//         />
//         <img
//           className="w-[320px] h-[365px]"
//           src={getRandomImage()}
//         />
//         <img
//           className="w-[312px] h-[500px]"
//           src={getRandomImage()}
//         />
//         <img
//           className="w-[380px] h-[304px]"
//           src={getRandomImage()}
//         />
//       </div>
//       <div className="inline pt-5">
//         <span className="text-[#979797] font-semibold text-[22px] ">
//           Reference of Symmetrical Balance, Asymmetrical Balance, Radial Balance
//           in photography.
//         </span>
//         <span className="text-[#C6C6C6] text-[17px] ">
//           {" "}
//           Image credit: Nikolas Behrendt, Luis Eusebio , Jiangxulei, Parrish
//           Freeman
//         </span>
//       </div>
//       <strong className="text-[24px] py-10">{blog.body?.title}</strong>

//       <div className="inline text-[24px]">
//         {tipsArray.map((tip, index) => (
//           <p key={index}>{tip}</p>
//         ))}
//       </div>
//       {/* <div className="inline text-[24px]">
//         <strong>Radial Balance:</strong> This occurs when elements radiate from
//         a central point in the image. It’s commonly seen in circular patterns or
//         shots where the eye is naturally drawn toward the center of the frame. A
//         close-up of a flower, with its petals radiating outward, is a perfect
//         example of radial balance.
//       </div>
//       <div className="text-[24px] py-10">
//         <strong>Why Balance Matters?</strong> <br /> Balance in photography is
//         not just about visual aesthetics—it’s about creating a sense of
//         coherence and flow. Balanced photos are easier to engage with because
//         the elements within them are arranged in a way that feels natural. A
//         well-balanced image directs the viewer’s gaze through the frame,
//         encouraging them to explore the photo’s details without feeling
//         overwhelmed.
//       </div>
//       <div className="text-[24px] py-10">
//         <strong>How to Achieve Balance</strong> <br />
//         <ol type="1" style={{ listStyleType: "decimal", paddingLeft: "40px" }}>
//           <li>
//             Use the Rule of Thirds: One of the simplest ways to achieve balance
//             is by following the rule of thirds. By dividing the frame into nine
//             equal parts using two horizontal and two vertical lines, you can
//             place key elements at the intersections. This technique often
//             results in a more naturally balanced composition.
//           </li>
//           <li>
//             Experiment with Framing: Consider how you frame your subject. You
//             can use leading lines, symmetry, or even the foreground and
//             background to balance your image. Think about how all the elements
//             in your scene interact with each other.
//           </li>
//           <li>
//             Play with Color and Light: Contrasting or complementary colors can
//             also be used to create balance. A bright spot in one corner of your
//             frame can be balanced by a darker area elsewhere, creating visual
//             harmony through light and shadow.
//           </li>
//         </ol>
//       </div> */}
//       <div className="flex flex-row justify-between items-center pt-14">
//         <img
//           className="w-[552px] h-[657px] object-cover"
//           src={getRandomImage()}
//         />
//         <div className="inline text-[24px] text-right w-[740px]">
//           <strong>{blog.conclusion?.title}</strong>
//           <br /> {blog.conclusion?.content}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function blogDetail() {
  const location = useLocation();
  const blog = location.state?.blog;

  const tipsString = blog.body?.content || "";
  const tipsArray = tipsString.split(/(?=\d+\.\s)/g).map((tip) => tip.trim());
  const isoString = blog.updatedAt;
  const date = new Date(isoString);

  const randomImages = [
    "https://images.unsplash.com/photo-1742995917580-becb015f088d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1745172366995-a55968e94797?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1745294279347-e1bcbcb30f8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1744043176705-6f61f70f1646?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1743878206228-5f36b5f5c830?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1742559848715-9dffac6e65ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUyfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1669748151567-f2c4c55be354?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwOHw2c01WalRMU2tlUXx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1743092440250-201d62342ae4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1737587653765-94bc8fe7b541?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNnw2c01WalRMU2tlUXx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1719930222484-86600f8c74da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyMHw2c01WalRMU2tlUXx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1696839222555-39c55f77fe3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDk2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
  ];

  function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const uniqueImages = useMemo(() => shuffleArray(randomImages), [blog.title]);

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;

  return (
    <div className="flex flex-col  px-20 ">
      <div className="flex flex-row justify-between flex-wrap">
        <div className="w-[700px] uppercase text-2xl">
          <h2 className="font-semibold leading-11 mb-10 uppercase">
            {blog.title}
          </h2>
          <p className="mb-24 uppercase">{blog.introduction?.content}</p>
          <p>Written by: ADMIN</p>
          <p> Published: {formattedDate}</p>
          <p className="mt-14">
            {blog.introduction?.title} <br />
            {blog.introduction?.content}
          </p>
        </div>
        <img className="w-[540px] h-[900px]" src={uniqueImages[0]} />
      </div>
      <div className="flex flex-row flex-wrap items-end mt-40">
        <img className="w-[340px] h-[500px]" src={uniqueImages[1]} />
        <img className="w-[320px] h-[365px]" src={uniqueImages[2]} />
        <img className="w-[312px] h-[430px]" src={uniqueImages[3]} />
        <img className="w-[380px] h-[304px]" src={uniqueImages[4]} />
      </div>
      <div className="inline pt-5">
        <span className="text-[#C6C6C6] text-[17px] ">
          {" "}
          Nguồn: Nikolas Behrendt, Luis Eusebio , Jiangxulei, Parrish Freeman
        </span>
      </div>
      <strong className="text-[24px] py-10">{blog.body?.title}</strong>
      <div className="inline text-[24px]">
        {tipsArray.map((tip, index) => (
          <p key={index}>{tip}</p>
        ))}
      </div>
      <div className="flex flex-row justify-between items-center pt-14">
        <img
          className="w-[552px] h-[657px] object-cover"
          src={uniqueImages[5]}
        />
        <div className="inline text-[24px] text-right w-[740px]">
          <strong>{blog.conclusion?.title}</strong>
          <br /> {blog.conclusion?.content}
        </div>
      </div>
    </div>
  );
}
