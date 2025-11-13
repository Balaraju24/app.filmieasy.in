import { getProjectAPI, getProjectUsersAPI } from "@/http/services/projects";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import ProjectDetailsUi from "../an/projects/ProjectDetailsUi";
import { toast } from "sonner";

function ProjectView() {
  const { project_id } = useParams({ strict: false });

  const {
    data: projectData,
    isLoading: projectLoading,
    error: projectError,
    isError,
  } = useQuery({
    queryKey: ["project", project_id],
    queryFn: async () => {
      if (!project_id) throw new Error("Project ID is required");
      const response = await getProjectAPI(project_id.toString());
      return response?.data?.data;
    },
    enabled: !!project_id,
  });

  const {
    data: projectUsersData,
    isLoading: projectUsersLoading,
    error: projectUsersError,
    isError: projectUsersIsError,
  } = useQuery({
    queryKey: ["projectUsers", project_id],
    queryFn: async () => {
      if (!project_id) throw new Error("Project ID is required");
      const response = await getProjectUsersAPI(project_id.toString());
      return response?.data?.data?.records || [];
    },
    enabled: !!project_id,
  });

  if (isError) {
    toast.error(projectError?.message);
    return <div className="flex items-center justify-between h-full">Error Loading Project</div>;
  }

  if (projectUsersIsError) {
    toast.error(projectUsersError?.message);
    return <div>Error Loading Project Users</div>;
  }

  if (projectLoading || projectUsersLoading) {
    return (
      <div className="flex items-center justify-center h-full">
       <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-zinc-600 border-t-white rounded-full animate-spin mb-4" />
          <div className="text-zinc-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <ProjectDetailsUi
      projectData={projectData}
      projectUsersData={projectUsersData}
      selectedDate={null}
      setSelectedDate={() => {}}
      selectedStatus={""}
      setSelectedStatus={() => {}}      
      searchValue={""}
      setSearchValue={() => {}}
    />
  );
}

export default ProjectView;
