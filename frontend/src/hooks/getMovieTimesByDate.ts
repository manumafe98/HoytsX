import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const getMovieTimesByDate = async (id: number, date: string): Promise<string[]> => {
    const provider = getProvider();
    const contract = await getContract(provider);
    return contract.getMovieShowtimeTimesByDate(id, date);
}
