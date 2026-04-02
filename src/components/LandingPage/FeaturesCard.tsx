import type { LucideProps } from "lucide-react";

export type FeaturesCardProps = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
};

const FeaturesCard = (props: FeaturesCardProps) => {
  const Icon = props.icon;
  return (
    <>
      <div className="group hover:border-primary-green-200 relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
        <div className="from-primary-green-100 mb-6 inline-flex items-center justify-center self-start rounded-xl bg-linear-to-br to-blue-100 p-3 transition-transform group-hover:scale-110">
          <Icon className="text-primary-green-700 h-6 w-6"></Icon>
        </div>

        <h3 className="mb-3 text-xl">{props.title}</h3>

        <p className="flex-1 font-extralight">{props.description}</p>
      </div>
    </>
  );
};
export default FeaturesCard;
