import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  onUpdateTeamMember: (
    index: number,
    updates: Partial<{ department: string; role: string }>
  ) => void;
  errors: Record<string, string>;
}

function CrewArtists({
  formData,
  availableUsers,
  onAddTeamMember,
  onRemoveTeamMember,
  errors,
}: CrewArtistsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = availableUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto h-full">
      <div className="space-y-4 h-full">
        <div className="border border-zinc-800/50 rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-sm font-medium mb-4 text-zinc-300">
            Available Users
          </h3>

          <div className="relative mb-3.5 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFFFFF66] h-4 w-4" />
            <Input
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-[#FFFFFF66]"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-45vh)]">
            {filteredUsers.map((user) => {
              const isAdded = formData.members.some(
                (m) => m.userId === user.id
              );

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 mb-3 bg-black/40 border border-zinc-800/50 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="text-white text-sm font-medium">
                        {user.name}
                      </p>
                      <p className="text-zinc-400 text-xs">{user.department}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (isAdded) {
                        const index = formData.members.findIndex(
                          (m) => m.userId === user.id
                        );
                        if (index !== -1) onRemoveTeamMember(index);
                      } else {
                        onAddTeamMember(user.id);
                      }
                    }}
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 text-sm font-light transition
                    ${
                      isAdded
                        ? "bg-gray-700/50 text-gray-400 "
                        : "bg-[#FFFFFF26]  "
                    }
                  `}
                  >
                    {isAdded ? "Added" : "+ Add"}
                  </Button>
                </div>
              );
            })}
          </ScrollArea>
        </div>
      </div>

      <div className="space-y-4 h-full">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-sm font-medium mb-4 text-zinc-300">
            Project Team ({formData.members.length})
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3">
            {formData.members.map((member, index) => {
              const teamMember = availableUsers.find(
                (u) => u.id === member.userId
              );

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-black/40 border border-zinc-800/50 rounded"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center text-white text-sm font-medium">
                    {teamMember?.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {teamMember?.name}
                    </p>
                    <p className="text-zinc-400 text-xs">
                      {teamMember?.department}
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

            {errors.team && (
              <p className="px-1 text-red-500 text-xs">{errors.team}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrewArtists;
