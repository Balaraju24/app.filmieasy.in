import React from "react";
import { MessageSquare, ThumbsUp, Edit2, Trash2 } from "lucide-react";

export default function FinanceTeamCards() {
  const cards = [
    {
      title: "Finance Team",
      date: "July 9, 2025 at 4:00PM",
      desc: "Our organization is dedicated to making a positive impact on the environment through our carbon offset program. By committing to a monthly donation, you can help support initiatives that reduce carbon emissions and promote sustainability. Join us in our mission to create a greener future!",
    },
    {
      title: "Finance Team",
      date: "July 9, 2025 at 4:00PM",
      desc: "Our organization is dedicated to making a positive impact on the environment through our carbon offset program. By committing to a monthly donation, you can help support initiatives that reduce carbon emissions and promote sustainability. Join us in our mission to create a greener future!",
    },
    {
      title: "Finance Team",
      date: "July 9, 2025 at 4:00PM",
      desc: "Our organization is dedicated to making a positive impact on the environment through our carbon offset program. By committing to a monthly donation, you can help support initiatives that reduce carbon emissions and promote sustainability. Join us in our mission to create a greener future!",
    },
    {
      title: "Finance Team",
      date: "July 9, 2025 at 4:00PM",
      desc: "Our organization is dedicated to making a positive impact on the environment through our carbon offset program. By committing to a monthly donation, you can help support initiatives that reduce carbon emissions and promote sustainability. Join us in our mission to create a greener future!",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex justify-center items-start p-6">
      <div className="grid grid-cols-4 gap-4 w-full max-w-7xl">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-neutral-800 border border-neutral-700 rounded-lg flex flex-col justify-between overflow-hidden"
          >
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="text-xs text-gray-400 mb-3">{card.date}</p>
                <p className="text-sm text-gray-200 leading-snug">
                  {card.desc}
                </p>
              </div>
            </div>

            <div className="bg-neutral-700/60 border-t border-neutral-600 flex justify-end gap-4 px-4 py-2">
              <Edit2 className="h-4 w-4 text-gray-300 cursor-pointer hover:text-white transition" />
              <Trash2 className="h-4 w-4 text-gray-300 cursor-pointer hover:text-red-500 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}