import { expect } from "chai";
import hre from "hardhat";
import { HoytsX } from "../typechain-types";
import { Signer } from "ethers";

const NAME = "HoytsX";
const SYMBOL = "HX";

const MOVIE_NAME = "Interstellar"
const MOVIE_DESCRIPTION = "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."
const MOVIE_IPFS_HASH = ""
const MOVIE_GENRE = "Sci-Fi"
const MOVIE_DIRECTOR = "Christopher Nolan"
const MOVIE_ACTORS = ["Matthew McConaughey", "Ann Hathaway", "Jessica Chastain"]
const MOVIE_DATE = "Feb 27"
const MOVIE_TIME = "10:00PM"
const MOVIE_DURATION = 169
const MOVIE_COST = hre.ethers.parseUnits("1", "ether")
const MOVIE_MAX_TICKETS = 100

describe("HoytsX", () => {
    let hoytsX: HoytsX;
    let deployer: Signer, buyer: Signer;

    beforeEach(async () => {

        [deployer, buyer] = await hre.ethers.getSigners();

        const HoytsXFactory  = hre.ethers.getContractFactory("HoytsX");
        hoytsX = await (await HoytsXFactory).deploy(NAME, SYMBOL);

        const transaction = await hoytsX.connect(deployer).listMovie(
            MOVIE_NAME,
            MOVIE_DESCRIPTION,
            MOVIE_IPFS_HASH,
            MOVIE_GENRE,
            MOVIE_DIRECTOR,
            MOVIE_ACTORS,
            MOVIE_DATE,
            MOVIE_TIME,
            MOVIE_COST,
            MOVIE_DURATION,
            MOVIE_MAX_TICKETS
        )

        await transaction.wait();
    })

    describe("Deployment", () => {
        it("Sets the name", async () => {
            expect(await hoytsX.name()).to.equal(NAME)
        })
    
        it("Sets the symbol", async () => {
            expect(await hoytsX.symbol()).to.equal(SYMBOL)
        })

        it("Sets the owner", async () => {
            expect(await hoytsX.owner()).to.equal(await deployer.getAddress())
        })
    })

    describe("Movie", () => {
        it("Returns movie attributes", async () => {
            const movie = await hoytsX.getMovie(1);
            expect(movie.id).to.be.equal(1);
            expect(movie.name).to.be.equal(MOVIE_NAME);
        })
    })
})
