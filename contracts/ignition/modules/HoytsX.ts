import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("HoytsX", (module) => {
  const hoytsX = module.contract("HoytsX", ["HoytsX", "HX"]);

  return { hoytsX };
});
