// PersonalDetails.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import OthersIcon from "@/components/Icons/Team/OthersIcon";
import FemaleIcon from "@/components/Icons/Team/FemaleIcon";
import MaleIcon from "@/components/Icons/Team/MaleIcon";
import BasicInfo from "@/components/Icons/Team/BasicInfo";
interface PersonalFormData {
  fullName: string;
  gender: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  profileImage?: string;
  languages: { name: string }[];
}

interface PersonalDetailsProps {
  formData: PersonalFormData;
  onUpdate: (updates: Partial<PersonalFormData>) => void;
  onAddLanguage: (name: string) => void;
  onRemoveLanguage: (index: number) => void;
  errors: Record<string, string>;
}

function PersonalDetails({
  formData,
  onUpdate,
  onAddLanguage,
  onRemoveLanguage,
  errors,
}: PersonalDetailsProps) {
  return (
    <div className="w-[85%] mx-auto flex max-w-7xl mx-auto">
      <div className="space-y-4 w-[60%]">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <BasicInfo /> Basic Info
          </h3>
          <div className="space-y-3.5">
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Full Name
              </Label>
              <Input
                value={formData.fullName}
                onChange={(e) => onUpdate({ fullName: e.target.value })}
                className="bg-(--input-bg) border-zinc-800/50 !text-gray-300 h-10 text-sm placeholder:text-zinc-300 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none"
                placeholder="Enter full name"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Gender
              </Label>
              <RadioGroup value={formData.gender} onValueChange={(v) => onUpdate({ gender: v })} className="flex gap-4">

                <div className="flex flex-1 justify-between items-center gap-2 bg-(--input-bg) border-zinc-800/50 rounded px-3 py-2 w-full">
                  <Label htmlFor="r2" className="text-xs text-zinc-300 cursor-pointer font-normal flex items-center gap-1.5">
                    <MaleIcon /> Male
                  </Label>
                  <RadioGroupItem value="Male" id="r2" className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:border-white" />
                </div>
                <div className="flex flex-1 justify-between items-center gap-2 bg-(--input-bg) border-zinc-800/50 rounded px-3 py-2">
                  <Label htmlFor="r1" className="text-xs text-zinc-300 cursor-pointer font-normal flex items-center gap-1.5">
                    <FemaleIcon /> Female
                  </Label>
                  <RadioGroupItem value="Female" id="r1" className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:border-white" />
                </div>
                <div className="flex flex-1 justify-between items-center gap-2 bg-(--input-bg) border-zinc-800/50 rounded px-3 py-2">
                  <Label htmlFor="r3" className="text-xs text-zinc-300 cursor-pointer font-normal flex items-center gap-1.5">
                    <OthersIcon /> Others
                  </Label>
                  <RadioGroupItem value="Others" id="r3" className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:border-white" />
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Date of Birth
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  maxLength={2}
                  value={formData.dob.slice(0, 2)}
                  onChange={(e) => {
                    let val = e.target.value.slice(0, 2);
                    if (!/^\d*$/.test(val)) val = "";
                    const newDob = val + formData.dob.slice(2);
                    onUpdate({ dob: newDob });
                  }}
                  placeholder="DD"
                  className="w-16 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm text-center !placeholder:text-zinc-300 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none"
                />
                <Input
                  type="text"
                  maxLength={2}
                  value={formData.dob.slice(2, 4)}
                  onChange={(e) => {
                    let val = e.target.value.slice(0, 2);
                    if (!/^\d*$/.test(val)) val = "";
                    const newDob = formData.dob.slice(0, 2) + val + formData.dob.slice(4);
                    onUpdate({ dob: newDob });
                  }}
                  placeholder="MM"
                  className="w-16 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm text-center !placeholder:text-zinc-300 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none"
                />
                <Input
                  type="text"
                  maxLength={4}
                  value={formData.dob.slice(4)}
                  onChange={(e) => {
                    let val = e.target.value.slice(0, 4);
                    if (!/^\d*$/.test(val)) val = "";
                    const newDob = formData.dob.slice(0, 4) + val;
                    onUpdate({ dob: newDob });
                  }}
                  placeholder="YYYY"
                  className="w-24 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm text-center !placeholder:text-zinc-300 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none"
                />
              </div>
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => onUpdate({ address: e.target.value })}
                className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm !placeholder:text-zinc-300 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none"
                placeholder="Enter address"
              />
            </div>
            <div>
              {/* <Label className="text-xs text-zinc-300 mb-2 block">
                Upload User Image
              </Label> */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onUpdate({ profileImage: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden bg-(--input-bg) border-zinc-800/50 text-white text-sm placeholder:text-zinc-300 "
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="w-32 h-18 bg-zinc-700/30 rounded-lg border-zinc-800/50 flex items-center justify-center cursor-pointer hover:bg-zinc-700/50 "
                >
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Project" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-zinc-400 text-sm text-center justify-center font-medium">+ Upload Image</span>
                  )}
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">
                  Email
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onUpdate({ email: e.target.value })}
                  className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm !placeholder:text-zinc-300 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none"
                  placeholder="Enter Email Id"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      onUpdate({ phone: value });
                    }
                  }}
                  className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm !placeholder:text-zinc-300 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-shadow-none focus-visible:border-zinc-700 focus-visible:shadow-none"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 w-[40%]">
        <div className="border h-full border-zinc-800/50 rounded-lg">
          <h3 className="text-sm font-medium  text-zinc-300 flex items-center gap-2 p-4 border-b border-zinc-800/50">
            # languages Known
          </h3>
          <div className="space-y-1.75 max-h-[420px] overflow-y-auto">
            {!formData.languages.some(l => l.name === 'English') && (
              <div className="flex items-center gap-3 px-4 mt-2">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">English</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('English')}
                  className="text-zinc-400 hover:text-white bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {!formData.languages.some(l => l.name === 'Hindi') && (
              <div className="flex items-center gap-3 px-4">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">Hindi</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('Hindi')}
                  className="text-zinc-400 hover:text-white bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {!formData.languages.some(l => l.name === 'Telugu') && (
              <div className="flex items-center gap-3 px-4">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">Telugu</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('Telugu')}
                  className="text-zinc-400 hover:text-white bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {!formData.languages.some(l => l.name === 'Tamil') && (
              <div className="flex items-center gap-3 px-4 mb-2">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">Tamil</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('Tamil')}
                  className="text-zinc-400 hover:text-white bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {formData.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">{lang.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveLanguage(index)}
                  className="text-red-400 hover:text-red-300 h-8 px-3 text-xs"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages}</p>}
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;