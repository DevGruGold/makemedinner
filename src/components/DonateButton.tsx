import { useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useConnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export const DonateButton = () => {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { toast } = useToast()
  const [showThankYou, setShowThankYou] = useState(false)

  const handleDonateClick = async () => {
    if (!isConnected) {
      await open()
    } else {
      try {
        // Here you would typically call your donation contract
        // For now, we'll just show the thank you message
        setShowThankYou(true)
        toast({
          title: "Thank you!",
          description: "Your support means a lot to us!",
        })
        setTimeout(() => setShowThankYou(false), 3000)
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong with the donation.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="relative">
      <Button
        onClick={handleDonateClick}
        className="bg-pink-500 hover:bg-pink-600 transition-all duration-300"
      >
        <Heart className={`mr-2 ${showThankYou ? 'animate-bounce' : ''}`} />
        {isConnected ? 'Donate' : 'Connect Wallet'}
      </Button>
      
      {showThankYou && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap animate-fade-in">
          <span className="text-pink-500 font-bold">Thank you! ❤️</span>
        </div>
      )}
    </div>
  )
}