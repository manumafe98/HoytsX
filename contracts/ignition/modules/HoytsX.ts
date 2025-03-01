import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";

const tokens = (n: number) => hre.ethers.parseUnits(n.toString(), "ether");

const movieData = [
    {
        name: "Interstellar",
        description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
        ipfsHash: "QmS19pYnHKRhhJWH7GJy7KqALHggxiVPiTMWJNbmMfvmH2",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
        actors: ["Matthew McConaughey", "Ann Hathaway", "Jessica Chastain"],
        date: "Feb 27",
        time: "10:00PM",
        cost: tokens(1),
        duration: 169,
        maxTickets: 100
    },
    {
        name: "The Dark Knight",
        description: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
        ipfsHash: "QmdgZoLeViMbhxgpTBs9FyiYgQWAfJYaPCcnqPwr59fwo7",
        genre: "Action",
        director: "Christopher Nolan",
        actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        date: "Mar 15",
        time: "08:00PM",
        cost: tokens(2),
        duration: 152,
        maxTickets: 100
    },
    {
        name: "Avatar",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        ipfsHash: "QmWw1Jp5Y7DRePCtghpJFCM52LVDbgaWs94GScVJ5ZeqUz",
        genre: "Action",
        director: "James Cameron",
        actors: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver"],
        date: "Apr 1",
        time: "11:00PM",
        cost: tokens(3),
        duration: 162,
        maxTickets: 100
    },
    {
        name: "Gladiator",
        description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        ipfsHash: "QmWuHWnchEgPJaQ2ys2zuVVypHKqJPX1gvUszCrNbNoGww",
        genre: "Action",
        director: "Ridley Scott",
        actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
        date: "Apr 10",
        time: "07:00PM",
        cost: tokens(4),
        duration: 155,
        maxTickets: 100
    },
    {
        name: "Spider-Man: Into the Spider-Verse",
        description: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
        ipfsHash: "QmZ5SVapVsvtZCdycrLseP6QBAmX9CfdFXR1X3ycqhnKpX",
        genre: "Animation",
        director: "Bob Persichetti",
        actors: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
        date: "May 1",
        time: "06:00PM",
        cost: tokens(5),
        duration: 117,
        maxTickets: 100 
    }
];


export default buildModule("HoytsX", (m) => {
    const hoytsX = m.contract("HoytsX", ["HoytsX", "HX"]);

    for (let index = 0; index < movieData.length; index++) {
        const movie = movieData[index];

        m.call(hoytsX, "listMovie", [
            movie.name,
            movie.description,
            movie.ipfsHash,
            movie.genre,
            movie.director,
            movie.actors,
            movie.date,
            movie.time,
            movie.cost,
            movie.duration,
            movie.maxTickets
        ], {id: `listMovie${index}`});
    }

    return { hoytsX };
});
