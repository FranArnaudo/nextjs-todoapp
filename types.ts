type Task = {
    title: string;
    description: string;
    status: Status
}

type Status = 'To do' | 'In progress' | 'Done'