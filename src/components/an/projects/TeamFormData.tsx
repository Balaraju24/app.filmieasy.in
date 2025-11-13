import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TeamFormData {
  members: { userId: string }[];
}

interface AvailableUser {
  id: string;
  name: string;
  department: string;
  image?: string;
}

interface CrewArtistsProps {
  formData: TeamFormData;
  availableUsers: AvailableUser[];
  onAddTeamMember: (userId: string) => void;
  onRemoveTeamMember: (index: number) => void;
  onUpdateTeamMember: (index: number, updates: Partial<{ department: string; role: string }>) => void;
  errors: Record<string, string>;
}

function CrewArtists({
  formData,
  availableUsers,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  errors,
}: CrewArtistsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto h-full">
      <div className="space-y-4 h-full">
        <div className="border border-zinc-800/50 rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            {/* <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> */}
            Available Users
          </h3>
          <div className="relative mb-3.5 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 !text-[#FFFFFF66] h-4 w-4" />
            <Input
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm !placeholder:text-[#FFFFFF66]"
            />
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            <ScrollArea className="h-[calc(100vh-45vh)]">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-black/40 border border-zinc-800/50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-zinc-400 text-xs">{user.department}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onAddTeamMember(user.id)}
                    variant="ghost"
                    size="sm"
                    className="text-white font-light bg-[#FFFFFF26] hover:text-green-300 h-8 px-3 text-sm"
                  >
                    + Add
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="space-y-4 h-full">
        <div className="bg-zinc-900/40 hidden backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2 flex-shrink-0">
            {/* <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> */}
            Project Team ({formData.members.length})
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3">
            {formData.members.map((member, index) => {
              const teamMember = availableUsers.find(u => u.id === member.userId);
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-black/40 border border-zinc-800/50 rounded">
                  <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center text-white text-sm font-medium">
                    {teamMember?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {teamMember?.name}
                    </p>
                  </div>
                  <Button
                    onClick={() => onRemoveTeamMember(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 h-8 px-3 text-xs"
                  >
                    ×
                  </Button>
                </div>
              );
            })}
            {errors.team && <p className="px-1 text-red-500 text-xs">{errors.team}</p>}
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-6 bg-[#FFFFFF14] rounded-sm  min-h-screen">
          <h3 className="text-white text-sm font-medium mb-4">Project Team (5)</h3>

          <div className="space-y-3 mb-2">
            <div className="border border-[#FFFFFF26] rounded-lg p-3 flex items-center gap-3 hover:bg-gray-750 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-2 border-dashed border-gray-600 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Baahubali 2: The Conclusion</p>
                <p className="text-gray-500 text-xs truncate">Department Name</p>
              </div>
              <div className="relative">
                <select className="bg-[#242424] text-gray-400 text-sm rounded-md px-4 py-2 pr-8 
    focus:outline-none focus:ring-0 focus:ring-blue-500 focus:bg-[#2a2a2a] transition-colors appearance-none cursor-pointer
    [&::-ms-expand]:hidden [-webkit-appearance:none]">
                  <option>Select Role</option>
                  <option value="Lead">Lead</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <button className="text-gray-500 hover:text-white p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Repeat for other members... */}
          </div>
          <div className="space-y-3 mb-2">
            <div className="border border-[#FFFFFF26] rounded-lg p-3 flex items-center gap-3 hover:bg-gray-750 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-2 border-dashed border-gray-600 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Baahubali 2: The Conclusion</p>
                <p className="text-gray-500 text-xs truncate">Department Name</p>
              </div>
              <div className="relative">
                <select className="bg-[#242424] text-gray-400 text-sm rounded-md px-4 py-2 pr-8 
    focus:outline-none focus:ring-0 focus:ring-blue-500 focus:bg-[#2a2a2a] transition-colors appearance-none cursor-pointer
    [&::-ms-expand]:hidden [-webkit-appearance:none]">
                  <option>Select Role</option>
                  <option value="Lead">Lead</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <button className="text-gray-500 hover:text-white p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Repeat for other members... */}
          </div>
          <div className="space-y-3 mb-2">
            <div className="border border-[#FFFFFF26] rounded-lg p-3 flex items-center gap-3 hover:bg-gray-750 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-2 border-dashed border-gray-600 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Baahubali 2: The Conclusion</p>
                <p className="text-gray-500 text-xs truncate">Department Name</p>
              </div>
              <div className="relative">
                <select className="bg-[#242424] text-gray-400 text-sm rounded-md px-4 py-2 pr-8 
    focus:outline-none focus:ring-0 focus:ring-blue-500 focus:bg-[#2a2a2a] transition-colors appearance-none cursor-pointer
    [&::-ms-expand]:hidden [-webkit-appearance:none]">
                  <option>Select Role</option>
                  <option value="Lead">Lead</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <button className="text-gray-500 hover:text-white p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>




      </div>
    </div>
  );
}

export default CrewArtists;