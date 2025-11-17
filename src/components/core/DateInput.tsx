import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

function isValidDate(day: number, month: number, year: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export default function DateInput({ value, onChange }: any) {
  const [rawValue, setRawValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const getFormatted = (raw: string): string => {
    if (!raw) return "";
    let f = raw.slice(0, 2);
    if (raw.length > 2) f += "/" + raw.slice(2, 4);
    if (raw.length > 4) f += "/" + raw.slice(4, 8);
    return f;
  };

  const getCursorPos = (length: number): number => {
    if (length <= 2) return length;
    if (length <= 4) return 3 + (length - 2);
    return 6 + (length - 4);
  };

  useEffect(() => {
    if (value) {
      const [yyyy, mm, dd] = value.split("-");
      setRawValue(dd.padStart(2, "0") + mm.padStart(2, "0") + yyyy);
    } else {
      setRawValue("");
    }
  }, [value]);

  useEffect(() => {
    if (rawValue.length === 8) {
      const dd = rawValue.substring(0, 2);
      const mm = rawValue.substring(2, 4);
      const yyyy = rawValue.substring(4, 8);
      const dayNum = parseInt(dd);
      const monthNum = parseInt(mm);
      const yearNum = parseInt(yyyy);
      if (yearNum > 0 && isValidDate(dayNum, monthNum, yearNum)) {
        const newDateValue = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        if (newDateValue !== value) {
          onChange(newDateValue);
        }
      }
    }
  }, [rawValue, value, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    const pos = rawValue.length;
    if (key >= "0" && key <= "9") {
      e.preventDefault();
      const digit = parseInt(key);
      let newRaw = rawValue;
      let cursorAfter = getCursorPos(pos + 1);

      if (pos < 2) { // Day
        if (pos === 0) {
          if (digit >= 0 && digit <= 3) {
            newRaw += key;
            cursorAfter = 1;
          } else if (digit >= 4 && digit <= 9) {
            newRaw = "0" + key;
            cursorAfter = 3; // Move to month
          } else {
            return;
          }
        } else if (pos === 1) {
          const d1 = parseInt(rawValue[0]);
          let maxD2 = 9;
          if (d1 === 3) maxD2 = 1;
          if (digit <= maxD2) {
            newRaw += key;
            cursorAfter = 3; // Day complete, move to month
          } else {
            return;
          }
        }
      } else if (pos < 4) { // Month
        if (pos === 2) {
          if (digit === 0 || digit === 1) {
            newRaw += key;
            cursorAfter = 3;
          } else if (digit >= 2 && digit <= 9) {
            newRaw += "0" + key;
            cursorAfter = 6; // Move to year
          } else {
            return;
          }
        } else if (pos === 3) {
          const m1 = parseInt(rawValue[2]);
          let maxM2 = 9;
          if (m1 === 1) maxM2 = 2;
          if (digit <= maxM2) {
            newRaw += key;
            cursorAfter = 6; // Month complete, move to year
          } else {
            return;
          }
        }
      } else if (pos < 8) { // Year
        newRaw += key;
        cursorAfter = getCursorPos(pos + 1);
      } else {
        return;
      }

      newRaw = newRaw.slice(0, 8);
      setRawValue(newRaw);
      setTimeout(() => {
        inputRef.current?.setSelectionRange(cursorAfter, cursorAfter);
      }, 0);
    } else if (key === "Backspace") {
      e.preventDefault();
      if (pos > 0) {
        const newRaw = rawValue.slice(0, -1);
        setRawValue(newRaw);
        setTimeout(() => {
          const newCursor = getCursorPos(newRaw.length);
          inputRef.current?.setSelectionRange(newCursor, newCursor);
        }, 0);
      }
    } else if (key === "ArrowRight") {
      e.preventDefault();
      let newRaw = rawValue;
      let targetCursor = getCursorPos(pos);
      if (pos === 1) { // Pad day
        newRaw += "0";
        targetCursor = 3;
      } else if (pos === 3) { // Pad month
        newRaw += "0";
        targetCursor = 6;
      } else {
        targetCursor = Math.min(getCursorPos(pos), 10);
      }
      setRawValue(newRaw);
      setTimeout(() => {
        inputRef.current?.setSelectionRange(targetCursor, targetCursor);
      }, 0);
    }
    // Allow other keys like ArrowLeft, Tab, etc.
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle paste: extract digits, validate, set if partial valid
    const newRaw = e.target.value.replace(/\D/g, "").slice(0, 8);
    // Simple: set it, but since keydown handles main, for paste assume user pastes valid
    setRawValue(newRaw);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Input
        ref={inputRef}
        type="text"
        value={getFormatted(rawValue)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="dd/mm/yyyy"
        maxLength={10}
        className="
          bg-(--input-bg)
          border border-zinc-800/50
          text-white
          text-sm
          h-10
          px-2
          rounded-md
          w-[200px]
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
        <div className="flex-1 text-center border-r border-zinc-700 text-zinc-400 text-sm">
          DD
        </div>
        <div className="flex-1 text-center border-r border-zinc-700 text-zinc-400 text-sm">
          MM
        </div>
        <div className="flex-1 text-center text-zinc-400 text-sm">YYYY</div>
      </div>
    </div>
  );
}