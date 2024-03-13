'use client'

import _ from "lodash"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { ChangeEvent } from "react"
import CustomInput from "./CustomInput"

type SearchProps = {
    statuses: Status[]
}
const Search = ({statuses}: SearchProps) => {
    const pathname = usePathname()
    const searchparams = useSearchParams()
    const {replace} = useRouter()
    
    const handleChangeTextSearch = _.debounce(( e : ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchparams)
        if(!e.target.value){
            params.delete('query')
        }else{
            params.set('query',e.target.value)
        }
        replace(`${pathname}?${params}`)
    },2000)
    const handleChangeSelectSearch = (e: ChangeEvent<HTMLSelectElement>) =>{
        const params = new URLSearchParams(searchparams)
        params.set('status', e.target.value)
        replace(`${pathname}?${params}`)
    }
    return ( 
        <div className="flex flex-col gap-2">
                    <input className="rounded-lg w-full border border-solid border-cyan-600  focus:outline focus:outline-cyan-600 focus:outline-3 h-8 col-span-5 row-span-1 pl-2 text-sm"   onChange={handleChangeTextSearch} />
                    <select name="status" id="status" className="rounded-lg w-full border border-solid border-cyan-600 focus:outline focus:outline-cyan-600 focus:outline-3 h-8 pl-2 text-sm align-middle " onChange={handleChangeSelectSearch}>
                        <option key="all" value="0" >All</option>
                        {statuses.map((status)=><option key={status.id} value={status.id}>{status.name}</option>)}
                    </select>
                </div>
     );
}
 
export default Search;