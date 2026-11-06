import { USER_INFO } from "@/data";
import { Mail, MapPin, PenLine, Phone, UserRound } from "lucide-react";

export const UserInfo = () => {
  return (
    <section className="relative flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6">
      <div className="w-full flex justify-between items-center">
        <ol className="list-disc pl-5 marker:text-electric-300">
          <li>Personal Information</li>
        </ol>
        <button
          type="button"
          className="flex justify-between items-center gap-2 cursor-pointer rounded-full border border-electric-500/30 bg-electric-600/10 px-3 py-1.5 text-[10px] uppercase tracking-ultra text-white"
        >
          <PenLine size={14} strokeWidth={1.6} />
          Edit
        </button>
      </div>
      <div className="w-full flex justify-start items-center gap-3 border-b-[1px] border-b-white/40 pb-5">
        <UserRound />
        <div>
          <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
            Full Name
          </p>
          <p>
            {USER_INFO.firstName} {USER_INFO.lastName}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-3 border-b-[1px] border-b-white/40 pb-5">
        <Mail />
        <div>
          <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
            Email Address
          </p>
          <p>{USER_INFO.email}</p>
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-3 border-b-[1px] border-b-white/40 pb-5">
        <Phone />
        <div>
          <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
            Phone Number
          </p>
          <p>{USER_INFO.number}</p>
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-3 border-b-[1px] border-b-white/40 pb-5">
        <MapPin />
        <div>
          <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
            Full Name
          </p>
          <p>
            {USER_INFO.location.city}, {USER_INFO.location.country}
          </p>
        </div>
      </div>
    </section>
  );
};
