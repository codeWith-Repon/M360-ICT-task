export interface IAttendance {
    id: number;
    employee_id: number;
    date: string;
    check_in_time: string; // 'HH:mm:ss'
    created_at: Date;
    updated_at: Date;
}

export interface IAttendanceCreateInput {
    employee_id: number;
    date: string;
    check_in_time: string;
}

export interface IAttendanceUpdateInput {
    check_in_time?: string;
}

export interface IAttendanceQueryFilter {
    employee_id?: number | undefined;
    from?: string | undefined; // 'YYYY-MM-DD'
    to?: string | undefined;   // 'YYYY-MM-DD'
    page?: number | undefined;
    limit?: number | undefined;
}