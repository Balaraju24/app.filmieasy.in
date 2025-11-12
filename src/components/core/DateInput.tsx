import { Input } from "@/components/ui/input";

export default function DateInput({ value, onChange }: any) {
  return (
    <div className="relative flex items-center gap-2">
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none
          bg-(--input-bg)
          border border-zinc-800/50
          text-white
          text-sm
          h-10
          px-2
          rounded-md
          w-[200px]
          [&::-webkit-calendar-picker-indicator]:opacity-0
          [&::-webkit-clear-button]:hidden
          relative
          z-10
        "
      />
      <div
        className="
          absolute left-0 top-0 w-full h-full
          flex justify-between items-center
          pointer-events-none
          px-2
        "
      >
        <div className="flex-1 text-center border-r border-zinc-700 text-zinc-400 text-sm">DD</div>
        <div className="flex-1 text-center border-r border-zinc-700 text-zinc-400 text-sm">MM</div>
        <div className="flex-1 text-center text-zinc-400 text-sm">YYYY</div>
      </div>
    </div>
  );
}
