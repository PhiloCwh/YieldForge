import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { tokenFarmerABI } from "./app/abi/tokenFarmerABI"

export default defineConfig({
  out: 'app/abi/tokenFarmer.ts',
  contracts: [
    {
      name: 'tokenFarmer',
      abi: tokenFarmerABI,
      address: {
        11155111: '0x248BAD6F606a62F328855847c891C1c5b010e041'
      }
    },
  ],
  plugins: [
    react(),
  ],
})