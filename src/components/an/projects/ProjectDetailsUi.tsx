import { useState,  useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Thermometer,
  Droplets,
  CalendarIcon,
  X,
  Search,
} from "lucide-react";
import UserTableContainer from "../../Team";
import backgroundImage from "@/assets/TeamBg.webp";
import Cloud from "@/components/Icons/Projects/Cloud";
import AddUserIcon from "@/components/Icons/Team/AddUserIcon";
import DownloadStorageIcon from "@/components/Icons/Team/DownloadStorage";
import ImportIcon from "@/components/Icons/Team/ImportIcon1";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "@tanstack/react-router";
import ScriptTab from "src/components/Projects/ScriptTab";
import PaymentInfo from "./PaymentInfo";
import Schedule from "./CallSheet";
import FileUpload from "./FileUploadDocument";
import Notes from "./Notes";


function ProjectDetailsUi({
  projectData,
  projectUsersData,
  selectedDate,
  setSelectedDate,
  selectedStatus,
  setSelectedStatus,
  searchValue,
  setSearchValue,
}: {
  projectData: any;
  projectUsersData: any;
  selectedDate: any;
  setSelectedDate: (date: any) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}) {
  const {tab}=useParams({strict:false})
  const [activeTab, setActiveTab] = useState(tab ||"crew");
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status === "all" ? "" : status);
  };

  const fullDescription = projectData?.description || "";
  const projectName = projectData?.name || "Untitled Project";
  const projectGenre = projectData?.genre || "N/A";
  const projectLanguages = projectData?.languages
    ? projectData.languages.join(", ")
    : "N/A";
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const startDate = projectData?.start_date
    ? formatDate(projectData.start_date)
    : "N/A";
  const endDate = projectData?.end_date
    ? formatDate(projectData.end_date)
    : "N/A";
  const timeline = `${startDate} - ${endDate}`;
  const budget = projectData?.estimated_budget
    ? `${projectData.estimated_budget.toLocaleString()} / TBD`
    : "N/A";
  const statusBadge =
    projectData?.status === "TODO"
      ? "Planning"
      : projectData?.status || "Unknown";
  const avatarFallback = projectName.charAt(0).toUpperCase();

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-64 bg-black/20 rounded-lg border border-gray-800/50">
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
 useEffect(() => {
  if (!activeTab) return;
  navigate({
    search: (prev) => ({ ...prev, tab: activeTab }),
    replace: true, 
  });
}, [activeTab, navigate]);


  return (
    <div
      className="h-screen bg-black text-white "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
      }}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <Card className="p-0 m-1 bg-transparent border-0 flex-shrink-0">
          <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-4 lg:gap-6 p-0 pb-3 lg:pb-4">
            <div className="flex items-center gap-4 flex-1 lg:flex-none">
              <div className="relative">
                <Avatar className="w-16 h-16 rounded-none">
                  <AvatarImage
                    src="https://example.com/urban-trial-poster.jpg"
                    alt="Project Avatar"
                  />
                  <AvatarFallback className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-3xl font-bold text-white">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <CardTitle className=" text-white">{projectName}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-400 border border-green-500/30 rounded-md px-2 py-0.5 text-xs font-normal"
                  >
                    {statusBadge}
                  </Badge>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CardDescription className="text-xs text-gray-400 font-light leading-relaxed cursor-help line-clamp-3 max-w-md lg:max-w-lg">
                        {fullDescription}
                      </CardDescription>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md bg-gray-900 text-white border-gray-700 p-3">
                      <p className="text-xs">{fullDescription}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 text-xs flex-1 lg:flex-none lg:flex-shrink-0 w-full lg:w-auto">
              <div className="flex items-center gap-6 lg:gap-8 text-xs flex-wrap lg:flex-nowrap">
                <div className="text-center lg:text-left min-w-[80px] lg:min-w-[100px]">
                  <span className="text-gray-500 block mb-0.5">Genre</span>
                  <div className="text-gray-300">{projectGenre}</div>
                </div>
                <div className="text-center lg:text-left min-w-[80px] lg:min-w-[100px]">
                  <span className="text-gray-500 block mb-0.5">Languages</span>
                  <div className="text-gray-300">{projectLanguages}</div>
                </div>
                <div className="text-center lg:text-left min-w-[120px] lg:min-w-[140px]">
                  <span className="text-gray-500 block mb-0.5">Timeline</span>
                  <div className="text-white whitespace-nowrap border border-zinc-600/50 bg-[#FFFFFF2E] rounded-md px-2 py-1">
                    {timeline}
                  </div>
                </div>
                <div className="text-center lg:text-left min-w-[80px] lg:min-w-[100px]">
                  <span className="text-gray-500 block mb-0.5">Budget</span>
                  <div className="text-white border border-zinc-600/50 bg-[#FFFFFF2E] rounded-md px-2 py-1">
                    {budget}
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0 w-full lg:w-auto">
              
              <div className="flex  items-center justify-between mr-4 gap-4 w-full lg:w-auto">
                <div className="flex flex-col">
                <div className="flex gap-1 text-xs text-gray-400 mb-1 w-full lg:w-auto">
                <span>Today, 12 September</span>
              </div>
                <div className="flex flex-col items-start">
                  <div className="text-3xl lg:text-4xl font-light text-white mb-0.5">
                    29°
                  </div>
                  <div className="flex items-center justify-start gap-2 text-xs text-gray-400 mb-0.5">
                    <span>Cloudy</span>
                  </div>
                </div>
                </div>
                <Cloud />
                <div className="flex flex-col items-start gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 flex-shrink-0" />
                    <span>temperature 20°</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 flex-shrink-0" />
                    <span>humidity 54%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="border-b border-zinc-800/50 overflow-x-auto flex-shrink-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-black border-0 h-10 p-[0px] lg:h-10 px-4 lg:px-6 inline-flex min-w-fit w-max gap-6 shadow-sm">
              <TabsTrigger
                value="crew"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 "
              >
                Crew
              </TabsTrigger>
              <TabsTrigger
                value="script"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 "
              >
                Script
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 "
              >
                Payment Info Snapshot
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 "
              >
                Expenses & Inventory (NEW)
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 "
              >
                Call Sheet & Scheduling
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 "
              >
                Documents & Files
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 "
              >
                Notes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 bg-black shadow-sm border-t border-gray-800/50 overflow-hidden flex flex-col">
          
          {activeTab === "crew" && (
            <div>
                <div ref={headerRef} className="h-[52px] border-b border-zinc-800/30 px-6 flex items-center justify-between bg-[#0a0a0a] flex-shrink-0">
              <div className="flex items-center">
                <span className="text-sm font-normal text-white">All</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Select
                    value={selectedStatus || "all"}
                    onValueChange={handleStatusSelect}
                  >
                    <SelectTrigger className="w-[160px] !py-1 !px-3 bg-zinc-900/50 border-2 border-zinc-700 text-xs">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="paused">Todo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[160px] h-8 justify-start text-left font-normal bg-zinc-900/50 border-2 border-zinc-700 text-xs",
                          !selectedDate && "text-zinc-600"
                        )}
                      >
                        {selectedDate ? (
                          <div className="flex items-center justify-between w-full">
                            <span className="truncate">{format(new Date(selectedDate), "MMM dd, yyyy")}</span>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDate("");
                                }}
                                className="h-3.5 w-3.5 p-0"
                              >
                                <X className="h-2.5 w-2.5 text-zinc-600 hover:text-white" />
                              </Button>
                              <CalendarIcon className="size-4 !text-[#00FFAB]" />
                            </div>
                          </div>
                        ) : (
                          <>
                            <span>Select a date</span>
                            <CalendarIcon className="ml-auto size-4 !text-[#00FFAB]" />
                          </>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate ? new Date(selectedDate) : undefined}
                        onSelect={(date) => {
                          setSelectedDate(date ? format(date, "yyyy-MM-dd") : "");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 size-4 !text-[#00FFAB] text-zinc-600" />
                  <Input
                    type="text"
                    placeholder="Search Projects"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="h-8 pl-8 pr-2.5 bg-zinc-900/50 border-2 border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none w-[160px]"
                  />
                </div>
                 <button className="h-8 flex items-center gap-1.5 px-3 bg-(--an-import-bg) border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800  cursor-pointer">
                  <ImportIcon />
                  Import
                </button>
                <button className="h-8 flex items-center gap-1.5 px-3 bg-(--an-import-bg) border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800  cursor-pointer">
                  <DownloadStorageIcon />
                  Download
                </button>
                <button onClick={()=>{navigate({to:"/projects/add-project"})}} className="h-8 flex items-center gap-1.5 px-3 bg-(--add-btn-bg) cursor-pointer hover:bg-blue-700 rounded-lg text-xs font-medium text-white ">
                  <AddUserIcon />
                  Add New Project
                </button>
              </div>
            </div>
            <UserTableContainer users={projectUsersData} isProjectView={true} />
            </div>
          )}
          {activeTab === "script" && (
            <ScriptTab />
          )}
          {activeTab === "payment" && (
            <PaymentInfo />
          )}
          {activeTab === "expenses" && (
            <EmptyState message="Expenses & Inventory content goes here" />
          )}
          {activeTab === "schedule" && (
            <Schedule />
          )}
          {activeTab === "documents" && (
            <FileUpload />
          )}
          {activeTab === "notes" && (
            <Notes />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsUi;