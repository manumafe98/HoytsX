import { HoytsX } from "../typechain-types";
import { expect } from "chai";
import { Signer } from "ethers";
import hre from "hardhat";

type DateShowtimesStruct = HoytsX.DateShowtimesStruct;
type ShowtimeStruct = HoytsX.ShowtimeStruct;

const NAME = "HoytsX";
const SYMBOL = "HX";

const ID = 1;
const MOVIE_NAME = "Interstellar";
const MOVIE_DESCRIPTION =
  "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.";
const MOVIE_IPFS_HASH = "QmS19pYnHKRhhJWH7GJy7KqALHggxiVPiTMWJNbmMfvmH2";
const MOVIE_GENRE = "Sci-Fi";
const MOVIE_DIRECTOR = "Christopher Nolan";
const MOVIE_ACTORS = [
  "Matthew McConaughey",
  "Ann Hathaway",
  "Jessica Chastain",
];
const MOVIE_TIME = "10:00PM";
const MOVIE_COST = hre.ethers.parseUnits("1", "ether");
const MOVIE_MAX_TICKETS = 100;
const MOVIE_SHOWTIME: ShowtimeStruct = {
  time: MOVIE_TIME,
  cost: MOVIE_COST,
  tickets: MOVIE_MAX_TICKETS,
  maxTickets: MOVIE_MAX_TICKETS,
};
const MOVIE_DATE_SHOWTIMES: DateShowtimesStruct[] = [
  {
    date: "Monday",
    showtimes: [MOVIE_SHOWTIME]
  }
];
const MOVIE_DURATION = 169;
const SEAT = 50;

describe("HoytsX", () => {
  let hoytsX: HoytsX;
  let deployer: Signer, buyer: Signer;
  let balanceBefore: bigint;

  beforeEach(async () => {
    [deployer, buyer] = await hre.ethers.getSigners();

    const HoytsXFactory = hre.ethers.getContractFactory("HoytsX");
    hoytsX = await (await HoytsXFactory).deploy(NAME, SYMBOL);

    const transaction = await hoytsX
      .connect(deployer)
      .listMovie(
        MOVIE_NAME,
        MOVIE_DESCRIPTION,
        MOVIE_IPFS_HASH,
        MOVIE_GENRE,
        MOVIE_DIRECTOR,
        MOVIE_ACTORS,
        MOVIE_DURATION,
        MOVIE_DATE_SHOWTIMES,
      );

    await transaction.wait();
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await hoytsX.name()).to.equal(NAME);
    });

    it("Sets the symbol", async () => {
      expect(await hoytsX.symbol()).to.equal(SYMBOL);
    });

    it("Sets the owner", async () => {
      expect(await hoytsX.owner()).to.equal(await deployer.getAddress());
    });
  });

  describe("Movie", () => {
    it("Returns movie attributes", async () => {
      const movie = await hoytsX.getMovieDetails(1);
      expect(movie.name).to.be.equal(MOVIE_NAME);
      expect(movie.actors[0]).to.be.equal("Matthew McConaughey");
    });

    it("Updates movie count", async () => {
      const totalOccasions = await hoytsX.totalMovies();
      expect(totalOccasions).to.be.equal(1);
    });
  });

  describe("Minting", () => {
    beforeEach(async () => {
      const transaction = await hoytsX
        .connect(buyer)
        .mintMovieTicket(ID, MOVIE_DATE_SHOWTIMES[0].date, MOVIE_DATE_SHOWTIMES[0].showtimes[0].time, SEAT, { value: MOVIE_COST });
      await transaction.wait();
    });

    it("Updates ticket count", async () => {
      const movie = await hoytsX.getMovieShowtimeByDateAndTime(
        ID,
        MOVIE_DATE_SHOWTIMES[0].date,
        MOVIE_DATE_SHOWTIMES[0].showtimes[0].time,
      );
      expect(movie.tickets).to.be.equal(MOVIE_MAX_TICKETS - 1);
    });

    it("Updates buying status", async () => {
      const status = await hoytsX.hasBought(ID, buyer.getAddress());
      expect(status).to.be.equal(true);
    });

  //   it("Updates seat status", async () => {
  //     const owner = await hoytsX.seatTaken(ID, SEAT);
  //     expect(owner).to.equal(await buyer.getAddress());
  //   });

  //   it("Updates overall seating status", async () => {
  //     const seats = await hoytsX.getSeatsTaken(ID);
  //     expect(seats.length).to.equal(1);
  //     expect(seats[0]).to.equal(SEAT);
  //   });
  // });

  // describe("Withdrawing", () => {
  //   beforeEach(async () => {
  //     balanceBefore = await hre.ethers.provider.getBalance(
  //       deployer.getAddress(),
  //     );

  //     const mintTransction = await hoytsX
  //       .connect(buyer)
  //       .mintMovieTicket(ID, SEAT, { value: MOVIE_COST });
  //     await mintTransction.wait();

  //     const withdrawTransaction = await hoytsX.connect(deployer).withdraw();
  //     await withdrawTransaction.wait();
  //   });

  //   it("Updates the owner balance", async () => {
  //     const balanceAfter = await hre.ethers.provider.getBalance(
  //       deployer.getAddress(),
  //     );
  //     expect(balanceAfter).to.be.greaterThan(balanceBefore);
  //   });

  //   it("Updates the contract balance", async () => {
  //     const balance = await hre.ethers.provider.getBalance(hoytsX.getAddress());
  //     expect(balance).to.equal(0);
  //   });
  });
});
