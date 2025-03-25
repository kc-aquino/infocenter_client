import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

type Header = {
  headerTitle?: string;
  Description?: string;
  image?: string;
  type?: string;
};

type AdvisoryItem = {
  advisoryName: string;
  advisoryDescription: string;
  advisoryStatus?: string;
  advisoryDate?: string;
};

interface AdvisoriesProps {
  header?: Header;
  title: string;
  description: string;
  advisories: AdvisoryItem[];
}

export function Advisories({
  title,
  description,
  advisories,
  header,
}: AdvisoriesProps) {
  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 sm:p-6">
      {header && (
        <div
          className={` ${
            header.image
              ? 'bg-orange-500 text-white flex justify-between items-center rounded-none md:rounded-xl'
              : header.type === 'garbage'
              ? 'bg-orange-500 text-white flex justify-between items-center rounded-none md:rounded-xl p-6'
              : ''
          }`}
        >
          {header.image ? (
            <div className="relative w-full">
              <img
                src={header.image}
                alt="Header"
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* Mobile Overlay Box */}
              <div className="sm:hidden absolute bottom-0 left-0 bg-gray-700/80 text-white p-4 w-full rounded-b-lg">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm">{description}</p>
              </div>
            </div>
          ) : header.type === 'garbage' && advisories.length > 0 ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div>
                <h2 className="text-xl font-semibold">
                  {advisories[0].advisoryName}
                </h2>
                <h3 className="text-sm text-white/90">
                  {advisories[0].advisoryDate}
                </h3>
                <p className="text-sm text-white/90">
                  {advisories[0].advisoryDescription}
                </p>
              </div>
              <span className="font-semibold text-lg sm:ml-4 sm:mt-0 mt-2">
                {(() => {
                  const advisoryDate = new Date(advisories[0].advisoryDate);
                  const currentDate = new Date();
                  const diffInHours = Math.ceil(
                    (advisoryDate.getTime() - currentDate.getTime()) /
                      (1000 * 60 * 60),
                  );
                  return diffInHours > 0
                    ? `${diffInHours} hours til next collection`
                    : 'Collection time passed';
                })()}
              </span>
            </div>
          ) : null}
        </div>
      )}

      <Card className="flex flex-col flex-1 overflow-hidden rounded-none md:rounded-xl border md:border-[1px] shadow-none md:shadow">
        <CardHeader className="hidden sm:block">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-2">
          {advisories.map((advisory, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg flex justify-between items-start shadow-sm ${
                index === 0 ? 'bg-orange-500 text-white' : 'bg-white'
              }`}
            >
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={index === 0 ? `item-${index}` : ''}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={`text-xs ${
                            index === 0
                              ? 'bg-white text-orange-500'
                              : 'bg-orange-500 text-white'
                          }`}
                        >
                          {advisory.advisoryStatus}
                        </Badge>
                        <h3
                          className={`font-semibold ${
                            index === 0 ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {advisory.advisoryName}
                        </h3>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          index === 0 ? 'text-white/80' : 'text-gray-500'
                        }`}
                      >
                        {advisory.advisoryDate}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      className={`text-sm ${
                        index === 0 ? 'text-white/90' : 'text-gray-600'
                      }`}
                    >
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
  );
}

export default Advisories;
