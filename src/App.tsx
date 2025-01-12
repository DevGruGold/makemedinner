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
        <div className="min-h-screen flex flex-col">
          <MainNav />
          <main className="flex-grow">
            <Index />
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </Web3Provider>
  )
}

export default App