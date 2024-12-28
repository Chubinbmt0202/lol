import React from "react";

import PracticeTab from "./_components/Tab";
import Link from "next/link";
import Image from "next/image";
interface PracticePageProps {
  searchParams: Promise<{
    type: string;
  }>;
}

const PracticePage = async ({ searchParams }: PracticePageProps) => {
  const { type } = await searchParams;

  const practiceCards = [
    {
      id: 1,
      title: "Read and Select",
      progress: 33,
      image: require("@/public/images/1.svg"),
      type: "reading",
      totalExercises: 24,
      completedExercises: 8,
    },
    {
      id: 2,
      title: "Fill in the Blanks",
      progress: 25,
      image: require("@/public/images/2.svg"),
      type: "grammar",
      totalExercises: 32,
      completedExercises: 8,
    },
    {
      id: 3,
      title: "Read and Complete",
      progress: 50,
      image: require("@/public/images/3.svg"),
      type: "reading",
      totalExercises: 20,
      completedExercises: 10,
    },
    {
      id: 4,
      title: "Listen and Type",
      progress: 40,
      image: require("@/public/images/4.svg"),
      type: "listening",
      totalExercises: 30,
      completedExercises: 12,
    },
    {
      id: 5,
      title: "Read Aloud",
      progress: 25,
      image: require("@/public/images/5.svg"),
      type: "speaking",
      totalExercises: 16,
      completedExercises: 4,
    },
    {
      id: 6,
      title: "Write About the Photo",
      progress: 33,
      image: require("@/public/images/6.svg"),
      type: "reading",
      totalExercises: 24,
      completedExercises: 8,
    },
    {
      id: 7,
      title: "Speak About the Photo",
      progress: 60,
      image: require("@/public/images/7.svg"),
      type: "speaking",
      totalExercises: 20,
      completedExercises: 12,
    },
    {
      id: 8,
      title: "Read, Then Speak",
      progress: 45,
      image: require("@/public/images/8.svg"),
      type: "speaking",
      totalExercises: 40,
      completedExercises: 18,
    },
    {
      id: 9,
      title: "Listen, Then Speak",
      progress: 15,
      image: require("@/public/images/9.svg"),
      type: "listening",
      totalExercises: 20,
      completedExercises: 3,
    },
    {
      id: 10,
      title: "Interactive Reading",
      progress: 70,
      image: require("@/public/images/10.svg"),
      type: "reading",
      totalExercises: 30,
      completedExercises: 21,
    },
    {
      id: 11,
      title: "Interactive Listening",
      progress: 55,
      image: require("@/public/images/11.svg"),
      type: "listening",
      totalExercises: 40,
      completedExercises: 22,
    },
    {
      id: 12,
      title: "Writing Sample",
      progress: 65,
      image: require("@/public/images/12.svg"),
      type: "writing",
      totalExercises: 50,
      completedExercises: 32,
    },
    {
      id: 13,
      title: "Speaking Sample",
      progress: 65,
      image: require("@/public/images/13.svg"),
      type: "speaking",
      totalExercises: 50,
      completedExercises: 32,
    },
  ];

  const filteredCards = type
    ? practiceCards.filter((card) => card.type === type)
    : practiceCards;

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="mb-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Luyện tập nhanh</h2>
          <p className="text-base-content/70 text-lg max-w-2xl">
            Cải thiện các kỹ năng nhất định bằng cách luyện tập riêng các câu
            hỏi theo từng chủ đề
          </p>
        </div>

        {/* Tab buttons */}
        <PracticeTab type={type} />

        {/* Practice cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {filteredCards.map((card) => (
            <Link
              key={card.id}
              href={`/practice/${card.type}`}
              className="card card-side border-[2px] border-base-200 card-compact bg-base-100 cursor-pointer transition-shadow py-8"
            >
              <figure className="w-48">
                <div className="w-full h-full  flex items-center justify-center">
                  <Image src={card.image} alt={card.title} />
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl">{card.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex-1 w-full bg-base-200 rounded-full h-3 flex items-center justify-between">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center flex-[0.2]">
                    <span className=" text-base-content/70 font-semibold">
                      0 / {card.totalExercises}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
