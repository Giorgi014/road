import { USER_INFO } from "@/data";
import { Mail, MapPin, Phone, UserRound } from "lucide-react";

export const UserInfo = () => {
  return (
    <section className="relative flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6">
      <div className="w-full flex justify-between items-center">
        <ol>
          <li>Personal Information</li>
        </ol>
        <button type="button" className="cursor-pointer">
          Edit
        </button>
      </div>
      <div className="w-full flex justify-start items-center gap-3">
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
      <div className="w-full flex justify-start items-center gap-3">
        <Mail />
        <div>
          <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
            Email Address
          </p>
          <p>{USER_INFO.email}</p>
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-3">
        <Phone />
        <div>
          <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
            Phone Number
          </p>
          <p>{USER_INFO.number}</p>
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-3">
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
