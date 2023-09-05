interface Props extends React.ComponentPropsWithoutRef<"input">{

}

export function Input(props:Props){
    return(
        <>
            <input {...props} className="h-[55px] px-3 text-black w-full rounded-md bg-zinc-300" />
        </>
    )
}