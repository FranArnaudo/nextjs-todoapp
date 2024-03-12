

type StatusIndicatorProps = {status?: Status | null}
const STATUS_COLOR_DICTIONARY : Record<string,string>= {
    'bg-slate-200': 'bg-slate-200',
    'bg-sky-200': 'bg-sky-200',
    'bg-emerald-200': 'bg-emerald-200'
}

const StatusIndicator = ({status}:StatusIndicatorProps ) => {
    if (!status){
        return <></>
    }
    return ( 
        <div className="flex justify-center content-center">
            <span className={`rounded-lg p-1 ${STATUS_COLOR_DICTIONARY[status.color]}`}>
                {status.name}
            </span>
        </div>
     );
}
 
export default StatusIndicator;