import { useState } from "react";

interface ActorsInputProps {
  actors: string[];
  onAddActor: (actorName: string) => void;
  onRemoveActor: (index: number) => void;
}

export const ActorsInput = ({
  actors,
  onAddActor,
  onRemoveActor,
}: ActorsInputProps) => {
  const [actorInput, setActorInput] = useState<string>("");

  const handleActorKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && actorInput.trim()) {
      e.preventDefault();
      if (!actors.includes(actorInput.trim())) {
        onAddActor(actorInput.trim());
        setActorInput("");
      }
    }
  };

  return (
    <div className="w-[75%]">
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
          {actors.length === 0 ? (
            <p className="text-gray-500 italic">No actors added yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {actors.map((actor, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-primary px-3 py-1 rounded-full"
                >
                  <span className="text-white">{actor}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveActor(idx)}
                    className="ml-2 text-white hover:white/10"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
