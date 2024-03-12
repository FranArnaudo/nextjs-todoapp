type Task = {
    title: string;
    description: string | null | undefined;
    status: Status | null
}

type Status = {
    id: number,
    name: string,
    color: string
}