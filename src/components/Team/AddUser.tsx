import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  createUserAPI,
  editUserProfileAPI,
  getAllDepartmentsAPI,
  getUserProfileAPI,
} from "@/http/services/team";
import AddUserForm from "../an/Team/AddUserForm";
import { toast } from "sonner";
import { useNavigate, useParams } from "@tanstack/react-router";
import { formatDateToPayload } from "@/lib/interfaces/core";
import { profile } from "console";

interface FormData {
  personal: {
    fullName: string;
    gender: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    profile_pic?: string;
    languages: { name: string }[];
  };
  professional: {
    department: string;
    roleType: string;
    experience: number;
    unionMembership: string;
    status: string;
    blockFrom: string;
    blockTo: string;
  };
  payment: {
    rateType: string;
    currency: string;
    amount: string;
    paymentMethod: string;
    gstPan: string;
    documents: File[];
  };
}

const initialFormData: FormData = {
  personal: {
    fullName: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    profile_pic: "",
    languages: [],
  },
  professional: {
    department: "",
    roleType: "",
    experience: 0,
    unionMembership: "",
    status: "",
    blockFrom: "",
    blockTo: "",
  },
  payment: {
    rateType: "",
    currency: "",
    amount: "",
    paymentMethod: "",
    gstPan: "",
    documents: [],
  },
};

function AddUserContainer() {
  const queryClient = useQueryClient();
  const { id } = useParams({ strict: false });
  const isEditMode = Boolean(id);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const { data: departmentsData, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await getAllDepartmentsAPI();
      return response?.data?.data?.records;
    },
  });

  const departments = (departmentsData || []).map((dept: any) => ({
    ...dept,
    count: 0,
  }));

  const { mutate: createUserProfile, isPending: isCreatePending } = useMutation(
    {
      mutationFn: async (data: any) => {
        const isEmpty = (value: any): boolean => {
          return (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          );
        };

        const dobFormatted =
          data.personal?.dob && typeof data.personal.dob === "string"
            ? (() => {
                const [year, month, day] = data.personal.dob.split("-");
                return `${day}-${month}-${year}`;
              })()
            : null;

        const languages = !isEmpty(data.personal?.languages)
          ? data.personal.languages
              .map((lang: any) => lang?.name)
              .filter((name: any) => !isEmpty(name))
          : null;

        const departmentId = !isEmpty(data.professional?.department)
          ? parseInt(data.professional.department, 10)
          : null;

        const payload = {
          email: isEmpty(data.personal?.email) ? null : data.personal.email,
          phone: isEmpty(data.personal?.phone) ? null : data.personal.phone,
          full_name: isEmpty(data.personal?.fullName)
            ? null
            : data.personal.fullName,
          gender: isEmpty(data.personal?.gender) ? null : data.personal.gender,
          role_type: isEmpty(data.professional?.roleType)
            ? null
            : data.professional.roleType,
          department_id: isNaN(data.professional?.department)
            ? null
            : departmentId,
          DOB: dobFormatted,
          languages: isEmpty(languages) ? undefined : languages,
          address: isEmpty(data.personal?.address)
            ? null
            : data.personal.address,
          experience: isNaN(data.professional?.experience)
            ? null
            : Number(data.professional?.experience),
          profile_pic: data.personal.profile_pic||null,
        };

        return createUserAPI(payload);
      },
      onSuccess: (response: any) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setCurrentStep(1);
        toast.success(response?.data?.message);
        setFormData(initialFormData);
        setErrors({});
        navigate({ to: "/team" });
      },
      onError: (error: any) => {
        setCurrentStep(1);
        if (error?.data?.status === 422) {
          const errData = error.data.errData;
          const transformedErrors: Record<string, string> = {};
          Object.entries(errData).forEach(([key, message]) => {
            let fieldKey: string;
            switch (key) {
              case "full_name":
                fieldKey = "fullName";
                break;
              case "role_type":
                fieldKey = "roleType";
                break;
              case "department_id":
                fieldKey = "department";
                break;
              case "DOB":
                fieldKey = "dob";
                break;
              case "languages":
                fieldKey = "languages";
                break;
              default:
                fieldKey = key;
            }
            transformedErrors[fieldKey] = message as string;
          });
          setErrors(transformedErrors);
        } else {
          toast.error(error?.data?.message);
        }
      },
    }
  );

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID required");
      const res = await getUserProfileAPI(id.toString());
      return res?.data?.data;
    },
    enabled: isEditMode,
  });
  console.log(userData, "userData");

  useEffect(() => {
    if (userData && isEditMode) {
      let formattedDOB = "";
      if (userData.DOB) {
        const [year, month, day] = userData.DOB.split("-");
        formattedDOB = `${day}-${month}-${year}`;
      }
      setFormData({
        personal: {
          fullName: userData.full_name || "",
          gender:
            userData.gender?.toUpperCase() === "MALE"
              ? "Male"
              : userData.gender?.toUpperCase() === "FEMALE"
                ? "Female"
                : "",
          dob: userData.DOB || "",
          address: userData.address || "",
          phone: userData.phone || "",
          email: userData.email || "",
          languages: (userData.languages || []).map((lang: string) => ({
            name: lang,
          })),
          profile_pic: userData.profile_pic || "",
        },
        professional: {
          department: userData.department_id
            ? String(userData.department_id)
            : "",

          roleType: userData.role_type || "",
          experience: userData.experience || 0,
          unionMembership: userData.association_membership || "",
          status: userData.availability_status || "",
          blockFrom: userData.block_from || "",
          blockTo: userData.block_to || "",
        },
        payment: {
          rateType: userData.rate_type || "",
          currency: userData.currency || "",
          amount: userData.amount?.toString() || "",
          paymentMethod: userData.payment_method || "",
          gstPan: userData.gst_pan || "",
          documents: [],
        },
      });
      console.log(formData, "formData");
    }
  }, [userData, isEditMode]);

  const { mutate: editUserProfile, isPending: isEditPending } = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        email: data.personal.email,
        phone: data.personal.phone,
        full_name: data.personal.fullName,
        gender: data.personal.gender,
        department_id: parseInt(data.professional.department, 10) || null,
        role_type: data.professional.roleType,
        DOB: data.personal.dob,
        languages: data.personal.languages.map((l: any) => l.name),
        address: data.personal.address,
        experience: data.professional.experience,
        association_membership: data.professional.unionMembership,
        availability_status: data.professional.status,
        block_from: data.professional.blockFrom,
        block_to: data.professional.blockTo,
        rate_type: data.payment.rateType,
        currency: data.payment.currency,
        amount: data.payment.amount,
        payment_method: data.payment.paymentMethod,
        gst_pan: data.payment.gstPan,
      };

      return isEditMode
        ? editUserProfileAPI(id!.toString(), payload)
        : createUserAPI(payload);
    },
    onSuccess: (res: any) => {
      toast.success(res?.data?.message || "Saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate({ to: "/team" });
    },
    onError: (error: any) => {
      toast.error(error?.data?.message || "Something went wrong");
    },
  });

  if (userLoading && isEditMode) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="inline-block w-8 h-8 border-4 border-zinc-600 border-t-white rounded-full animate-spin" />
        <span className="ml-2 text-zinc-400">Loading user...</span>
      </div>
    );
  }
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const clearFieldErrors = (fieldKeys: string[]) => {
    const newErrors = { ...errors };
    fieldKeys.forEach((key) => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const updatePersonal = (updates: Partial<FormData["personal"]>) => {
    const fieldKeys = Object.keys(updates) as (keyof FormData["personal"])[];
    clearFieldErrors(fieldKeys);
    updateFormData({ personal: { ...formData.personal, ...updates } });
  };

  const updateProfessional = (updates: Partial<FormData["professional"]>) => {
    const fieldKeys = Object.keys(
      updates
    ) as (keyof FormData["professional"])[];
    clearFieldErrors(fieldKeys);
    updateFormData({ professional: { ...formData.professional, ...updates } });
  };

  const updatePayment = (updates: Partial<FormData["payment"]>) => {
    const fieldKeys = Object.keys(updates) as (keyof FormData["payment"])[];
    clearFieldErrors(fieldKeys);
    updateFormData({ payment: { ...formData.payment, ...updates } });
  };

  const addSpecificLanguage = (name: string) => {
    clearFieldErrors(["languages"]);
    updatePersonal({ languages: [...formData.personal.languages, { name }] });
  };

  const removeLanguage = (index: number) => {
    clearFieldErrors(["languages"]);
    const languages = formData.personal.languages.filter((_, i) => i !== index);
    updatePersonal({ languages });
  };

  const updateLanguage = (index: number, name: string) => {};

  const addDocument = (file: File) => {
    clearFieldErrors(["documents"]);
    updatePayment({ documents: [...formData.payment.documents, file] });
  };

  const removeDocument = (index: number) => {
    clearFieldErrors(["documents"]);
    const documents = formData.payment.documents.filter((_, i) => i !== index);
    updatePayment({ documents });
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

 const handleSubmit = () => {
    if (isEditMode) {
      editUserProfile(formData);
    } else {
      createUserProfile(formData);
    }
  };

  const isLoading = isCreatePending || isEditPending;

  return (
    <AddUserForm
      currentStep={currentStep}
      formData={formData}
      departments={departments}
      onUpdatePersonal={updatePersonal}
      onUpdateProfessional={updateProfessional}
      onUpdatePayment={updatePayment}
      onAddLanguage={addSpecificLanguage}
      onRemoveLanguage={removeLanguage}
      onUpdateLanguage={updateLanguage}
      onAddDocument={addDocument}
      onRemoveDocument={removeDocument}
      onNext={nextStep}
      onPrev={prevStep}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errors={errors}
      isEditMode={isEditMode}
    />
  );
}

export default AddUserContainer;
