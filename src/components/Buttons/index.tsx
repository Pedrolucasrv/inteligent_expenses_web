import ClipLoader from "react-spinners/ClipLoader";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode,
    loading?: boolean
}

export const Button = (props:Props) => {
    return(
        <button disabled={props.loading || props.disabled} className="hover:-translate-y-1 transition-all bg-main w-full mt-5 py-3 rounded-md text-black font-semibold uppercase">{props.loading ? <ClipLoader size={15} color="#f9f9f9"/>  : <>{props.children}</>}</button>
    )
}