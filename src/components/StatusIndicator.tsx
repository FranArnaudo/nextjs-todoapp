

type StatusIndicatorProps = {status: Status}
const STATUS_COLOR_DICTIONARY : Record<string,string>= {
    'To do': 'bg-slate-200',
    'In progress': 'bg-sky-200',
    'Done': 'bg-emerald-200'
}
const StatusIndicator = ({status}:StatusIndicatorProps ) => {
    if (!status){
        return <></>
    }
    return ( 
        <div className="flex justify-center content-center">
            <span className={`rounded-lg p-1 ${STATUS_COLOR_DICTIONARY[status]}`}>
                {status}
            </span>
        </div>
     );
}
 
export default StatusIndicator;