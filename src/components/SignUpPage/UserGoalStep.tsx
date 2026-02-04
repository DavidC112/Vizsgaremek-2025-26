import type { UserGoalsType } from "../../context/UserSignUpContext";
import { Step } from "../Stepper";

type UserGoalsStepProps = {
  details: {
    targetweight: number;
    deadline: string;
  };
  onChange: <K extends keyof UserGoalsType>(
    field: K,
    value: UserGoalsType[K],
  ) => void;
  errors?: Partial<Record<keyof UserGoalsType, string>>;
};

const UserGoalStep = ({
  details,
  onChange,
  errors = {},
}: UserGoalsStepProps) => {
  return (
    <Step>
      <section className="space-y-5 py-2">
        <div className="relative z-0">
          <input
            type="number"
            id="height"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.targetweight}
            onChange={(e) => onChange("targetweight", Number(e.target.value))}
          />
          <label
            htmlFor="targetweight"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Target Weight (kg)
          </label>
          {errors.targetweight && (
            <p className="mt-1 text-sm text-red-600">{errors.targetweight}</p>
          )}
        </div>
      </section>
      <section className="space-y-5 py-2">
        <div className="relative z-0">
          <input
            type="date"
            id="height"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.deadline}
            onChange={(e) => onChange("deadline", e.target.value)}
          />
          <label
            htmlFor="height"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Deadline
          </label>
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
          )}
        </div>
      </section>
    </Step>
  );
};
export default UserGoalStep;
