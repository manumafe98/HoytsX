import { Close } from "@/icons";
import { useState } from "react";

interface ActorsInputProps {
  actors: string[];
  onAddActor: (actorName: string) => void;
  onRemoveActor: (actor: string) => void;
}

export const ActorsInput = ({
  actors,
  onAddActor,
  onRemoveActor,
}: ActorsInputProps) => {
  const [actorInput, setActorInput] = useState<string>("");

  const handleActorKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && actorInput) {
      e.preventDefault();
      if (!actors.includes(actorInput)) {
        onAddActor(actorInput);
        setActorInput("");
      }
    }
  };

  return (
    <div className="w-[75%] max-md:w-[85%]">
      <label className="text-xl font-bold mb-1 text-primary">Actors</label>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center mb-2">
          <div className="flex-1">
            <input
              type="text"
              value={actorInput}
              onChange={(e) => setActorInput(e.target.value)}
              onKeyDown={handleActorKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Matthew McConaughey"
            />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {actors.map((actor, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-primary px-4 py-2 rounded-full"
              >
                <span className="text-white">{actor}</span>
                <button
                  type="button"
                  onClick={() => onRemoveActor(actor)}
                  className="ml-2 hover:opacity-75"
                >
                  <Close className="fill-current text-white size-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
