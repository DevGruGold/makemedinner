import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/MainNav"
import { Footer } from "@/components/Footer"
import { Web3Provider } from "@/lib/web3Config"
import Index from "@/pages/Index"

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col relative">
          {/* Mobile-optimized navigation */}
          <MainNav />
          
          {/* Main content area with mobile-first design */}
          <main className="flex-1 pb-20 sm:pb-6">
            <Index />
          </main>
          
          {/* Footer positioned for mobile */}
          <Footer />
          
          {/* Toast notifications optimized for mobile */}
          <Toaster />
        </div>
      </Router>
    </Web3Provider>
  )
}

export default App