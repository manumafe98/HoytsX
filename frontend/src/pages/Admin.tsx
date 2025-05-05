import {
  ImageUploader,
  Input,
  Layout,
  ShowtimesInput,
  Textarea,
} from "@/components";
import { ActorsInput } from "@/components/ActorsInput";

export const Admin = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-full bg-gradient-to-t from-background-gradiant-start to-background-gradiant-end p-5">
        <form className="flex flex-col justify-center items-center w-2/5 max-xl:w-3/5 max-lg:w-4/5 h-11/12 border-2 border-solid border-primary gap-y-5 p-5">
          <h1 className="text-3xl font-bold text-primary">Add Movie</h1>
          <ImageUploader handleImageChange={() => {}} />
          <Input
            label="Name"
            type="text"
            placeholder="Avatar"
            handleOnChange={() => {}}
          />
          <Textarea />
          <Input
            label="Genre"
            type="text"
            placeholder="Horror"
            handleOnChange={() => {}}
          />
          <Input
            label="Director"
            type="text"
            placeholder="Christopher Nolan"
            handleOnChange={() => {}}
          />
          <Input
            label="Duration"
            type="number"
            placeholder="120"
            handleOnChange={() => {}}
          />
          <ActorsInput
            actors={["Matthew"]}
            onAddActor={() => {}}
            onRemoveActor={() => {}}
          />
          <ShowtimesInput
            showtimes={[]}
            onDayChange={() => {}}
            onShowtimeChange={() => {}}
            onAddShowtime={() => {}}
            onRemoveShowtime={() => {}}
            onAddDay={() => {}}
          />
        </form>
      </div>
    </Layout>
  );
};
