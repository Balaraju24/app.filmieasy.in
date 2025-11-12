import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Location  from "../../Icons/Projects/Location";
import OutDoor  from "../../Icons/Projects/OutDoor";
import Clock  from "../../Icons/Projects/Clock";
import  Member from "../../Icons/Projects/Member.svg";

export default function SceneDashboard() {
  const [scene] = useState(
    {
    id: 1,
    title: "The Urban Trial – Final Draft v3",
    excerpt: "A dimly lit room. Inspector Rao (Main Lead) sits across the table from a nervous suspect.",
    location: "EXT. MUMBAI STREET – NIGHT",
    datTime: "Date Time",
    time: "Night",
    indoorOutdoor: "Outdoor",
    weather: "Yes",
    description:
      "Rain pours heavily as Meera (Main Lead) runs barefoot through the deserted street, chasing the kidnapper’s car. A sudden lightning flash illuminates the street, revealing the car turning sharply into a narrow alley.",
    members: [
      { name: "Name", role: "Role" },
      { name: "Name", role: "Role" },
    ],
  },
);

  return (
    <div className="min-h-screen text-gray-100 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4  p-4 space-y-3">

        <div className="border bg-[#FFFFFF40] border-white rounded-lg p-2 hover:border-white rounded-lg p-2 transition-all">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-normal text-[14px]">The Urban Trial – Final Draft v3</h3>
            <span className="text-xs bg-[#FFFFFFCC] px-2 py-[2px] text-[11px] rounded-sm text-[#303030]">Date Time</span>
          </div>
          <p className="text-xs text-[#FFFFFFCC] text-[11px] line-clamp-2">
            A dimly lit room. Inspector Rao (Main Lead) sits across the table from a nervous suspect.
          </p>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-white flex gap-1"><Location /> Location</span>
            <span className="text-xs text-[#F2994A] flex gap-1"><OutDoor /> Outdoor</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-[#EB5757] flex gap-1"><Clock /> Pending</span>
            <span className="text-white rounded-sm px-4 py-1 cursor-pointer bg-[#FFFFFF4D]">Edit</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF0D] hover:bg-[#FFFFFF40] hover:border-white rounded-lg p-2 transition-all">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-normal text-[14px]">Scene 1</h3>
            <span className="text-xs bg-[#FFFFFFCC] px-2 py-[2px] text-[11px] rounded-sm text-[#303030]">Date Time</span>
          </div>
          <p className="text-xs text-[#FFFFFFCC] text-[11px] line-clamp-2">
            A dimly lit room. Inspector Rao (Main Lead) sits across the table from a nervous suspect.
          </p>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-white flex gap-1"><Location /> Location</span>
            <span className="text-xs text-[#F2994A] flex gap-1"><OutDoor /> Outdoor</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-[#EB5757] flex gap-1"><Clock /> Pending</span>
            <span className="text-white rounded-sm px-4 py-1 cursor-pointer bg-[#FFFFFF4D]">Edit</span>
          </div>
        </div>
      </div>

      {/* Middle Content */}
      <div className="flex-1">
        <div className="mb-0 mt-5  bg-[#FFD31B66] text-white px-3 py-2 rounded-sm text-sm">
          ⚠️ Warning
          <p className="text-white pt-2">Rain alert for Scene #12 at 4PM. Suggested indoor replacement:
          Scene #24.</p>
        </div>
        <div className="border border-gray-800 rounded-lg mt-0 p-6 min-h-screen">
        <h1 className="text-center text-[16px] font-normal mb-5">Scene 5 – Outdoor Rain Sequence</h1>
        <h2 className="text-[14px] font-normal mb-1">EXT. MUMBAI STREET – NIGHT</h2>
        <p className="text-sm text-gray-300 mb-6">Rain pours heavily as Meera (Main Lead) runs barefoot through the deserted street, chasing the kidnapper’s car. Water splashes with each frantic step. A sudden lightning flash illuminates the street, revealing the car turning sharply into a narrow alley.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/3  p-4 space-y-4">
        <div className="bg-[#FFFFFF14] rounded-lg p-3 text-normal text-[12px] space-y-1">
          <p>
            Location: EXT. MUMBAI STREET – NIGHT
          </p>
          <p>
            Time of Day: Night
          </p>
          <p>
            Indoor/Outdoor: Outdoor
          </p>
          <p className="flex items-center gap-1">
            Weather Dependency:
            <span className="text-green-400">✅ Yes</span>
          </p>
        </div>

        <div className="bg-[#FFFFFF14] rounded-lg p-2 text-xs space-y-1">
             <p className="flex gap-2"><span>🎭 </span>Main Lead: Meera – Deepika Padukone</p>
             <p className="flex gap-2"><span>🎭 </span> Antagonist / Kidnapper: [TBD Actor]</p>
             <p className="flex gap-2"><span>🎭 </span>Stunt Double (for Meera): Priya Nair</p>
             <p className="flex gap-2"><span>🎥</span> Director: Rohan Mehta</p>
             <p className="flex gap-2"><span>🎥</span> Director of Photography (DOP): Aarav Kapoor</p>
             <p className="flex gap-2"><span>🎧</span> Sound Recordist: Sita Iyer</p>
            <p className="flex gap-2"><span>💡&nbsp;</span>Lighting Crew: Night Rain Lighting Setup Team</p>
             <p className="flex gap-2"><span>🧑</span> Stunt Coordinator: Raj Malhotra</p>
        </div>

        <div className="bg-[#FFFFFF14] rounded-lg p-2">
          {scene.members.map((m, i) => (
            <div
              key={i}
              className="flex items-center border mb-1 rounded-lg border-gray-700 justify-between px-3 py-2 text-sm"
            >
              <div className="flex gap-2">
        <img src={Member} alt={Member} className="w-full h-full object-cover transition-transform duration-300" />
                <div>
                    <p className="font-medium">{m.name}</p>
                <p className="text-gray-400 text-xs">{m.role}</p>
                </div>
              </div>
              <MoreVertical size={16} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
