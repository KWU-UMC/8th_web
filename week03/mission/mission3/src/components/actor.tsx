import { CreditsData } from "../types/credit_type";

export default function Actor({ credit }: { credit: CreditsData }) {
  return (
    <div className="w-[128px] h-[200px] flex flex-col justify-start items-center gap-2">
      <div className="w-[128px] h-[128px]">
        {credit.profile_path != null ? (
          <img
            className="w-[128px] h-[128px] rounded-full object-cover"
            src={`https://image.tmdb.org/t/p/w185/${credit.profile_path}`}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <span>No profile</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-center text-lg font-bold leading-4">
          {credit.name}
        </h3>
        <h4 className="text-center text-sm text-gray-100">
          {credit.character ? credit.character : credit.job}
        </h4>
      </div>
    </div>
  );
}
