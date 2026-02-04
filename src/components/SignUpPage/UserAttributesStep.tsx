import type { UserAttributesType } from "../../context/UserSignUpContext";
import { Step } from "../Stepper";

type UserAttributesStepProps = {
  details: {
    height: number;
    weight: number;
    measuredAt: string;
  };
  onChange: <K extends keyof UserAttributesType>(
    field: K,
    value: UserAttributesType[K],
  ) => void;
  errors?: Partial<Record<keyof UserAttributesType, string>>;
};

const UserAttributesStep = ({
  details,
  onChange,
  errors = {},
}: UserAttributesStepProps) => {
  return (
    <Step>
      <section className="space-y-5 py-2">
        <div className="relative z-0">
          <input
            type="number"
            id="height"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.height}
            onChange={(e) => onChange("height", Number(e.target.value))}
          />
          <label
            htmlFor="height"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Height (cm)
          </label>
          {errors.height && (
            <p className="mt-1 text-sm text-red-600">{errors.height}</p>
          )}
        </div>
      </section>
      <section className="space-y-5 py-2">
        <div className="relative z-0">
          <input
            type="number"
            id="weight"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.weight}
            onChange={(e) => onChange("weight", Number(e.target.value))}
          />
          <label
            htmlFor="weight"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Weight (kg)
          </label>
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
          )}
        </div>
      </section>
      <section className="space-y-5 py-2">
        <div className="relative z-0">
          <input
            type="date"
            id="measuredAt"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.measuredAt}
            onChange={(e) => onChange("measuredAt", e.target.value)}
          />
          <label
            htmlFor="measuredAt"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Measured At
          </label>
          {errors.measuredAt && (
            <p className="mt-1 text-sm text-red-600">{errors.measuredAt}</p>
          )}
        </div>
      </section>
    </Step>
  );
};
export default UserAttributesStep;
