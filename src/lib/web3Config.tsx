import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { mainnet, type Chain } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const projectId = '69ce43d1338e0808445b17de7d1ac63c'

const metadata = {
  name: 'Make Me Dinner',
  description: 'AI-powered recipe suggestions from your ingredients',
  url: 'https://makemydinner.ai',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains: [Chain, ...Chain[]] = [mainnet]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({ 
  wagmiConfig,
  projectId,
})

export const queryClient = new QueryClient()

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}