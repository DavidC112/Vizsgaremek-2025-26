import { Step } from "../Stepper";
import type { UserDetailsType } from "../../context/UserSignUpContext";

type UserDetailsStepProps = {
  details: UserDetailsType;
  onChange: <K extends keyof UserDetailsType>(
    field: K,
    value: UserDetailsType[K],
  ) => void;
  errors?: Partial<Record<keyof UserDetailsType, string>>;
};

const UserDetailsStep = ({
  details,
  onChange,
  errors = {},
}: UserDetailsStepProps) => {
  return (
    <Step>
      <section className="space-y-5 py-2">
        <div className="grid grid-cols-2 gap-5">
          {/* First Name */}
          <div className="relative z-0">
            <input
              autoComplete="off"
              type="text"
              id="firstName"
              className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
              placeholder=""
              value={details.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
            />
            <label
              htmlFor="firstName"
              className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              First Name
            </label>
            {errors.firstName && (
              <p className="my-1 text-[10px] text-red-600">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative z-0">
            <input
              autoComplete="off"
              type="text"
              id="lastName"
              className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
              placeholder=""
              value={details.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
            />
            <label
              htmlFor="lastName"
              className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Last Name
            </label>
            {errors.lastName && (
              <p className="my-1 text-[10px] text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="relative z-0">
          <input
            type="text"
            id="email"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          <label
            htmlFor="email"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Email Address
          </label>
          {errors.email && (
            <p className="my-1 text-[10px] text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative z-0">
          <input
            type="password"
            id="password"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
          <label
            htmlFor="password"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Password
          </label>
          {errors.password && (
            <p className="my-1 text-[10px] text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Gender Select */}
        <form className="mx-auto max-w-sm">
          <label htmlFor="underline_select" className="sr-only">
            Underline select
          </label>
          <div className="relative">
            <select
              id="underline_select"
              className="text-body border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent py-2.5 ps-0 text-sm focus:ring-0 focus:outline-none"
              defaultValue=""
              value={details.gender}
              onChange={(e) =>
                onChange("gender", e.target.value as "" | "male" | "female")
              }
            >
              <option disabled value="">
                Choose your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="my-1 text-[10px] text-red-600">{errors.gender}</p>
            )}
          </div>
        </form>
        {/* Birth Date */}
        <div className="relative z-0">
          <input
            type="date"
            id="birthDate"
            className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
            placeholder=""
            value={details.birthDate}
            onChange={(e) => onChange("birthDate", e.target.value)}
          />
          <label
            htmlFor="birthDate"
            className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Birth Date
          </label>
          {errors.birthDate && (
            <p className="my-1 text-[10px] text-red-600">{errors.birthDate}</p>
          )}
        </div>
      </section>
    </Step>
  );
};
export default UserDetailsStep;
