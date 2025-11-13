import { getProjectScenesAPI } from "@/http/services/projects";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import ScriptUi from "src/components/an/projects/ScriptUi";

export default function ScriptTab() {
  const { project_id } = useParams({ strict: false });

  const {
    data: getSceneData,
    isLoading: isSceneLoading,
    error: isSceneError,
    isError,
  } = useQuery({
    queryKey: ["scene", project_id],
    queryFn: async () => {
      if (!project_id) throw new Error("Project ID is required");
      const response = await getProjectScenesAPI(project_id);
      return response.data?.data?.project_scenes || [];
    },
  });

  if (isError) {
    toast.error(isSceneError?.message);
    return <div className="flex items center justify-center h-full">Error Loading scenes</div>;
  }

  if (isSceneLoading) {
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
    <ScriptUi
      getSceneData={getSceneData}
    />
  );
}
