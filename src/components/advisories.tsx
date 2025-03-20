import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Header = {
    image?: string // Optional image URL
}

type AdvisoryItem = {
    advisoryName: string
    advisoryDescription: string
    advisoryStatus: string
    advisoryDate: string
}

interface AdvisoriesProps {
    header?: Header
    title: string
    description: string
    advisories: AdvisoryItem[]
}

export function Advisories({ title, description, advisories, header }: AdvisoriesProps) {
    return (
      <div className="h-screen flex flex-col space-y-4">
        {/* Header Section */}
        {header && (
          <div
            className={`bg-orange-500 text-white flex justify-between items-center rounded-xl ${
              header.image ? '' : 'p-6'
            }`}
          >
            {header.image ? (
              <img src={header.image} alt="Header" className="w-full h-40 object-cover rounded-lg" />
            ) : (
                <>
                    <div>
                        <h2 className="text-xl font-semibold">{advisories[0].advisoryName}</h2>
                        <h3 className="text-sm text-white/90">{advisories[0].advisoryDate}</h3>
                        <p className="text-sm text-white/90">{advisories[0].advisoryDescription}</p>
                    </div>
                    <span className="font-semibold text-lg">
                        {(() => {
                            const advisoryDate = new Date(advisories[0].advisoryDate);
                            const currentDate = new Date();
                            const diffInHours = Math.ceil((advisoryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60));
                            return diffInHours > 0 ? `${diffInHours} hours til next collection` : 'Collection time passed';
                        })()}
                    </span>
                </>
            )}
          </div>
        )}

        {/* Advisories Section */}
        <Card className="flex flex-col flex-grow overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          {/* Scrollable Advisory List */}
          <CardContent className="flex-grow overflow-y-auto space-y-2">
            {advisories.map((advisory, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg flex justify-between items-start shadow-sm ${
                  index === 0 ? 'bg-orange-500 text-white' : 'bg-white'
                }`}
              >
                <div>
                  <h3 className={`font-semibold ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                    {advisory.advisoryName}
                  </h3>
                  <p className={`text-sm ${index === 0 ? 'text-white/90' : 'text-gray-600'}`}>
                    {advisory.advisoryDescription}
                  </p>
                  <Badge
                    className={`mt-2 text-xs ${
                      index === 0 ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'
                    }`}
                  >
                    {advisory.advisoryStatus}
                  </Badge>
                </div>
                <span className={`text-sm font-medium ${index === 0 ? 'text-white/80' : 'text-gray-500'}`}>
                  {advisory.advisoryDate}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }
