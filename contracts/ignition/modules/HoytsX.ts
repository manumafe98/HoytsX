import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";

const tokens = (n: number) => hre.ethers.parseUnits(n.toString(), "ether");

const movieData = [
  {
    name: "Interstellar",
    description:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    ipfsHash: "QmS19pYnHKRhhJWH7GJy7KqALHggxiVPiTMWJNbmMfvmH2",
    genre: "Sci-Fi",
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Ann Hathaway", "Jessica Chastain"],
    duration: 169,
    showtimes: [
      {
        date: "Monday",
        showtimes: [
          { time: "10:00PM", cost: tokens(1), tickets: 100, maxTickets: 100 },
        ],
      },
    ],
  },
  {
    name: "The Dark Knight",
    description:
      "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
    ipfsHash: "QmdgZoLeViMbhxgpTBs9FyiYgQWAfJYaPCcnqPwr59fwo7",
    genre: "Action",
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    duration: 152,
    showtimes: [
      {
        date: "Wednesday",
        showtimes: [
          { time: "08:00PM", cost: tokens(2), tickets: 100, maxTickets: 100 },
          { time: "10:00PM", cost: tokens(2), tickets: 100, maxTickets: 100 },
        ],
      },
    ],
  },
  {
    name: "Avatar",
    description:
      "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    ipfsHash: "QmWw1Jp5Y7DRePCtghpJFCM52LVDbgaWs94GScVJ5ZeqUz",
    genre: "Action",
    director: "James Cameron",
    actors: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver"],
    duration: 162,
    showtimes: [
      {
        date: "Thursday",
        showtimes: [
          { time: "10:00PM", cost: tokens(3), tickets: 100, maxTickets: 100 },
        ],
      },
      {
        date: "Friday",
        showtimes: [
          { time: "10:00PM", cost: tokens(3), tickets: 100, maxTickets: 100 },
        ],
      },
    ],
  },
  {
    name: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    ipfsHash: "QmWuHWnchEgPJaQ2ys2zuVVypHKqJPX1gvUszCrNbNoGww",
    genre: "Action",
    director: "Ridley Scott",
    actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    duration: 155,
    showtimes: [
      {
        date: "Friday",
        showtimes: [
          { time: "10:00PM", cost: tokens(4), tickets: 100, maxTickets: 100 },
        ],
      },
      {
        date: "Saturday",
        showtimes: [
          { time: "11:00PM", cost: tokens(4), tickets: 100, maxTickets: 100 },
        ],
      },
      {
        date: "Sunday",
        showtimes: [
          { time: "00:00AM", cost: tokens(4), tickets: 100, maxTickets: 100 },
        ],
      },
    ],
  },
  {
    name: "Spider-Man: Into the Spider-Verse",
    description:
      "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    ipfsHash: "QmZ5SVapVsvtZCdycrLseP6QBAmX9CfdFXR1X3ycqhnKpX",
    genre: "Animation",
    director: "Bob Persichetti",
    actors: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
    duration: 117,
    showtimes: [
      {
        date: "Sunday",
        showtimes: [
          { time: "04:00PM", cost: tokens(5), tickets: 100, maxTickets: 100 },
          { time: "06:00PM", cost: tokens(5), tickets: 100, maxTickets: 100 },
          { time: "08:00PM", cost: tokens(5), tickets: 100, maxTickets: 100 },
        ],
      },
    ],
  },
  {
    name: "Treasure Planet",
    description:
      "Jim Hawkins is a teenager who finds the map of a great treasure hidden by a space pirate. Together with some friends, he sets off in a large spaceship, shaped like a caravel, on his quest.",
    ipfsHash: "Qmdoh5Nb4963GbU9ipqHj4ked5yx6vhyEEN3drtj5Z1NQ8",
    genre: "Adventure",
    director: "Ron Clements",
    actors: ["Joseph Gordon-Levitt", "Emma Thompson", "Martin Short"],
    duration: 96,
    showtimes: [
      {
        date: "Sunday",
        showtimes: [
          { time: "02:00PM", cost: tokens(6), tickets: 100, maxTickets: 100 },
        ],
      },
    ],
  },
];

export default buildModule("HoytsX", (module) => {
  const hoytsX = module.contract("HoytsX", ["HoytsX", "HX"]);

  for (let index = 0; index < movieData.length; index++) {
    const movie = movieData[index];

    module.call(
      hoytsX,
      "listMovie",
      [
        movie.name,
        movie.description,
        movie.ipfsHash,
        movie.genre,
        movie.director,
        movie.actors,
        movie.duration,
        movie.showtimes,
      ],
      { id: `listMovie${index}` },
    );
  }

  return { hoytsX };
});
