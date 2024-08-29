import { FC, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<Props> = (props) => {
    return (
        <div className="relative mb-4 flex items-center">
            <input
                className="relative size-[18px] cursor-pointer appearance-none
                            rounded bg-input outline-primary checked:border-primary
                            checked:bg-primary checked:outline-none 
                            checked:after:ml-1.5 
                            checked:after:mt-px checked:after:block 
                            checked:after:h-[0.8125rem] checked:after:w-1.5 checked:after:rotate-45 
                            checked:after:border-[0.125rem] 
                            checked:after:border-l-0 checked:after:border-t-0 checked:after:border-white 
                            checked:after:bg-transparent 
                            checked:after:content-[''] hover:outline"
                type="checkbox"
                {...props}
            />
            <label
                className="inline-block cursor-pointer pl-2 text-base font-normal text-white"
                htmlFor="remember"
            >
                Remember me
            </label>
        </div>
    );
};
