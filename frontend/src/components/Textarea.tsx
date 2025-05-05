export const Textarea = () => {
  return (
    <div className="flex flex-col w-[75%]">
      <label className="text-primary font-bold text-xl mb-1">Description</label>
      <textarea
        name="description"
        className="bg-white resize-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        rows={4}
      />
    </div>
  );
};
