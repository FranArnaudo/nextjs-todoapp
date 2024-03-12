import Link from "next/link";

type ButtonProps = {
    text: string,
    href: string
}
const ButtonLink = ({text, href}:ButtonProps) => {
    return ( 
        <Link
        href={href}
        className="rounded-lg w-full bg-sky-300 p-2 flex justify-center items-center h-8"
        >
            <span className=" text-center text-sm">
                {text}
            </span>
        </Link>
     );
}
 
export default ButtonLink;