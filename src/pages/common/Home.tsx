import { Badge } from "@/components/ui/badge"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-3">
        <Badge variant="pending" className="w-20">Pending</Badge>
        <Badge variant="processing" className="w-20">Processing</Badge>
        <Badge variant="shipped" className="w-20">Shipped</Badge>
        <Badge variant="delivered" className="w-20">Delivered</Badge>
    </div>
  )
}

export default Home
