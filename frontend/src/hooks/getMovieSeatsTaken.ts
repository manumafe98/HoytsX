import { getContract } from "./getContract";

export const getMovieSeatsTaken = async (movieId: number): Promise<number[]> => {
    const contract = await getContract();
    return await contract.getSeatsTaken(movieId);
}
