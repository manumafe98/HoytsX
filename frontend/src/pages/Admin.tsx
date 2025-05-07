import {
  ImageUploader,
  Input,
  Layout,
  ShowtimesInput,
  Textarea,
} from "@/components";
import { ActorsInput } from "@/components/ActorsInput";
import { listMovie, uploadToPinata } from "@/hooks";
import { DateShowtime } from "@/types/dateShowtime.type";
import { Showtime } from "@/types/showtime.type";
import { ChangeEvent, useState } from "react";

export const Admin = () => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [actors, setActors] = useState<string[]>([]);
  const [dateShowtimes, setDateShowtimes] = useState<DateShowtime[]>([]);

  const handleImageChange = (file: File | undefined) => {
    setImage(file);
  };

  const handleChange = (
    label: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value: string = event.target.value;
    switch (label) {
      case "Name":
        setName(value);
      case "Description":
        setDescription(value);
      case "Genre":
        setGenre(value);
      case "Director":
        setDirector(value);
      case "Duration":
        setDuration(value);
    }
  };

  const handleAddActor = (actor: string) => {
    setActors((previous) => {
      if (previous.length >= 3) {
        console.log("Maximum amount of actors reached");
        return previous;
      } else {
        return [...previous, actor];
      }
    });
  };

  const handleRemoveActor = (actorToRemove: string) => {
    setActors((previous) =>
      previous.filter((actor) => actor !== actorToRemove),
    );
  };

  const handleDayChange = (dayIndex: number, value: string) => {
    const updated = [...dateShowtimes];
    updated[dayIndex].date = value;
    setDateShowtimes(updated);
  };

  const handleShowtimeChange = (
    dayIndex: number,
    showtimeIndex: number,
    field: keyof Showtime,
    value: string,
  ) => {
    const updated = [...dateShowtimes];

    if (field === "time") {
      updated[dayIndex].showtimes[showtimeIndex].time = value;
    } else if (field === "maxTickets") {
      const num = parseInt(value) || 0;
      updated[dayIndex].showtimes[showtimeIndex].maxTickets = num;
      updated[dayIndex].showtimes[showtimeIndex].tickets = num;
    } else {
      updated[dayIndex].showtimes[showtimeIndex][field] = parseInt(value) || 0;
    }

    setDateShowtimes(updated);
  };

  const handleAddShowtime = (dayIndex: number) => {
    const updated = [...dateShowtimes];
    updated[dayIndex].showtimes.push({
      time: "",
      cost: 0,
      tickets: 0,
      maxTickets: 0,
    });
    setDateShowtimes(updated);
  };

  const handleRemoveShowtime = (dayIndex: number, showtimeIndex: number) => {
    const updated = [...dateShowtimes];
    updated[dayIndex].showtimes.splice(showtimeIndex, 1);

    if (updated[dayIndex].showtimes.length === 0) {
      updated.splice(dayIndex, 1);
    }

    setDateShowtimes(updated);
  };

  const handleAddDay = () => {
    setDateShowtimes((prev) => [
      ...prev,
      {
        date: "",
        showtimes: [
          {
            time: "",
            cost: 0,
            tickets: 0,
            maxTickets: 0,
          },
        ],
      },
    ]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) return;
    const cid = await uploadToPinata(image);
    const success = await listMovie(
      name,
      description,
      cid,
      genre,
      director,
      actors,
      Number(duration),
      dateShowtimes,
    );
    console.log(success);
  };

  return (
    <Layout showFooter={false}>
      <div className="h-auto flex justify-center items-center bg-gradient-to-t from-background-gradiant-start to-background-gradiant-end p-5">
        <form
          className="flex flex-col justify-center items-center w-2/5 max-xl:w-3/5 max-lg:w-4/5 h-11/12 border-2 border-solid border-primary gap-y-5 p-5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-primary">Add Movie</h1>
          <ImageUploader handleImageChange={handleImageChange} />
          <Input
            label="Name"
            type="text"
            placeholder="Avatar"
            handleOnChange={handleChange}
          />
          <Textarea label="Description" handleOnChange={handleChange} />
          <Input
            label="Genre"
            type="text"
            placeholder="Horror"
            handleOnChange={handleChange}
          />
          <Input
            label="Director"
            type="text"
            placeholder="Christopher Nolan"
            handleOnChange={handleChange}
          />
          <Input
            label="Duration"
            type="number"
            placeholder="120"
            min={0}
            handleOnChange={handleChange}
          />
          <ActorsInput
            actors={actors}
            onAddActor={handleAddActor}
            onRemoveActor={handleRemoveActor}
          />
          <ShowtimesInput
            showtimes={dateShowtimes}
            onDayChange={handleDayChange}
            onShowtimeChange={handleShowtimeChange}
            onAddShowtime={handleAddShowtime}
            onRemoveShowtime={handleRemoveShowtime}
            onAddDay={handleAddDay}
          />
          <button
            type="submit"
            className="rounded-md w-[75%] bg-primary h-12 text-white hover:opacity-85 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};
