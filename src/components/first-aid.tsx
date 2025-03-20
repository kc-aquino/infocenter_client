import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useEffect, useState } from 'react';

type FirstAidItems = {
    itemTitle: string
    itemDescription: string
    itemLink: string
}

interface FirstAidProps {
    title: string
    description: string
    firstAidItems: FirstAidItems[]
}

export function Advisories({ title, description, firstAidItems }: FirstAidProps) {
    const [ selectedLink, setSelectedLink ] = useState();

    useEffect 


    return (
      <div className="h-screen flex flex-col space-y-4">
        <div>
            <video src=""></video>
        </div>

        <Card className="flex flex-col flex-grow overflow-hidden rounded-none md:rounded-xl border-0 md:border-1 shadow-none md:shadow">
          <CardHeader className="hidden sm:block">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent className="flex-grow overflow-y-auto space-y-2">
            {advisories.map((advisory, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg flex justify-between items-start shadow-sm ${
                  index === 0 ? 'bg-orange-500 text-white' : 'bg-white'
                }`}
              >
                <Accordion type="single" collapsible className="w-full" defaultValue={index === 0 ? `item-${index}` : undefined}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                            <div>
                                <h3 className={`font-semibold ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                                    {advisory.advisoryName}
                                </h3>
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
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className={`text-sm ${index === 0 ? 'text-white/90' : 'text-gray-600'}`}>
                        {advisory.advisoryDescription}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }
