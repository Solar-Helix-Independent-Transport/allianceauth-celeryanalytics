import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { WorkerDivs } from './components/Workers'
import { QueueDivs } from './components/Queues'
import { ActiveDivs } from './components/Actives'
import { ETADivs } from './components/etaTasks'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <WorkerDivs/>
        <ActiveDivs/>
        <QueueDivs/>
        <ETADivs/>
    </QueryClientProvider>
  )
}

export default App
