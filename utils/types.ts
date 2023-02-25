// Interface to defining our object of response functions
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}

// Interface to define our Task model on the frontend
export interface Task {
    _id?: number
    taskName: string
    desc: string
    dateDue: Date
    isTextAlert: boolean
}
// Interface to define our Class model on the frontend
export interface Class {
    _id?: number
    className: string
    tasks: Task[]
}

// Interface to define our User model on the frontend
export interface User {
    _id?: number
    fName: string
    lName: string
    classes: Class[]
}
