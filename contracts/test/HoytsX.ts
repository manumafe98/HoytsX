import { expect } from "chai";
import hre from "hardhat";
import { HoytsX } from "../typechain-types";

const NAME = "HoytsX";
const SYMBOL = "HX";

describe("HoytsX", () => {
    let hoytsX: HoytsX;

    beforeEach(async () => {
        const HoytsXFactory  = hre.ethers.getContractFactory("HoytsX");
        hoytsX = await (await HoytsXFactory).deploy(NAME, SYMBOL);
    })

    describe("Deployment", () => {
        it("Sets the name", async () => {
            expect(await hoytsX.name()).to.equal(NAME)
        })
    
        it("Sets the symbol", async () => {
            expect(await hoytsX.symbol()).to.equal(SYMBOL)
        })
    })
})
