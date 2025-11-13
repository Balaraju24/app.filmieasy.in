import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Location  from "../../Icons/Projects/Location";
import OutDoor  from "../../Icons/Projects/OutDoor";
import Clock  from "../../Icons/Projects/Clock";
import  Member from "../../Icons/Projects/Member.svg";

 function ScriptUi({ getSceneData }: { getSceneData: any }) {
  const [selectedScene, setSelectedScene] = useState<any>(getSceneData?.[0] || null);

  if (!getSceneData || getSceneData.length === 0) {
    return <div className="text-center text-gray-400 p-10">No scenes found.</div>;
  }

  return (
    <div className="min-h-screen text-gray-100 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4  p-4 space-y-3">{getSceneData.map((scene: any, index: number) => (
          <div
            key={scene.id}
            onClick={() => setSelectedScene(scene)}
            className={`border rounded-lg p-2 cursor-pointer transition-all ${
              selectedScene?.id === scene.id
                ? "bg-[#FFFFFF40] border-white"
                : "bg-[#FFFFFF0D] hover:bg-[#FFFFFF20] border-[#ffffff33]"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-normal text-[14px]">
                Scene {index + 1}: {scene.name}
              </h3>
              <span className="text-xs bg-[#FFFFFFCC] px-2 py-[2px] text-[11px] rounded-sm text-[#303030]">
                Date Time
              </span>
            </div>
            <p className="text-xs text-[#FFFFFFCC] text-[11px] line-clamp-2">
              {scene.description || "No description available."}
            </p>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-white flex gap-1">
                <Location /> Location
              </span>
              <span className="text-xs text-[#F2994A] flex gap-1">
                <OutDoor /> Outdoor
              </span>
            </div>
           <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-[#EB5757] flex gap-1">
                <Clock /> Pending
              </span>
              <span className="text-white rounded-sm px-4 py-1 cursor-pointer bg-[#FFFFFF4D]">
                Edit
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1">
        {selectedScene && (
          <>
        <div className="mb-0 mt-5  bg-[#FFD31B66] text-white px-3 py-2 rounded-sm text-sm">
          ⚠️ Warning
          <p className="text-white pt-2">Rain alert for Scene #{selectedScene.id} at 4PM. Suggested indoor replacement:
          Scene #24.</p>
        </div>
        <div className="border border-gray-800 rounded-lg mt-0 p-6 min-h-screen">
        <h1 className="text-center text-[16px] font-normal mb-5">{selectedScene.id} – {selectedScene.name}</h1>
        <h2 className="text-[14px] font-normal mb-1">EXT. MUMBAI STREET – NIGHT</h2>
        <p className="text-sm text-gray-300 mb-6">{selectedScene.description ||"No available description"}</p>
        </div>
        </>
        )}
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

        {selectedScene?.artistScenes?.length > 0 && (
          <div className="bg-[#FFFFFF14] rounded-lg p-2">
            {selectedScene.artistScenes.map((artistScene: any, i: number) => (
              <div
                key={i}
                className="flex items-center border mb-1 rounded-lg border-gray-700 justify-between px-3 py-2 text-sm"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={artistScene.artist.profile_pic || Member}
                    alt="artist"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {artistScene.artist.full_name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {artistScene.artist.role_type}
                    </p>
                  </div>
                </div>
                <MoreVertical size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default ScriptUi;


