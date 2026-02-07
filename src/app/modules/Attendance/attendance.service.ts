import { getKnex } from '../../../config/knex';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import {
    IAttendance,
    IAttendanceCreateInput,
    IAttendanceQueryFilter,
} from './attendance.interface';

class AttendanceService {
    private knex = getKnex();

    public async upsertAttendance(payload: IAttendanceCreateInput): Promise<IAttendance> {
        const { employee_id, date, check_in_time } = payload;

        const employeeExists = await this.knex('employees')
            .where({ id: employee_id, is_deleted: false })
            .first();

        if (!employeeExists) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found or deleted');
        }

        const existing = await this.knex('attendance')
            .where({ employee_id, date })
            .first();

        let result;

        if (existing) {
            [result] = await this.knex('attendance')
                .where({ id: existing.id })
                .update({ check_in_time, updated_at: this.knex.fn.now() })
                .returning(['id', 'employee_id', 'date', 'check_in_time', 'created_at', 'updated_at']);
        } else {
            [result] = await this.knex('attendance')
                .insert({
                    employee_id,
                    date,
                    check_in_time,
                })
                .returning(['id', 'employee_id', 'date', 'check_in_time', 'created_at', 'updated_at']);
        }

        return result;
    }

    public async getAllAttendance(query: IAttendanceQueryFilter): Promise<IAttendance[]> {
        let qb = this.knex('attendance');

        if (query.employee_id) {
            qb = qb.where('employee_id', query.employee_id);
        }

        if (query.from) {
            qb = qb.where('date', '>=', query.from);
        }

        if (query.to) {
            qb = qb.where('date', '<=', query.to);
        }

        if (query.page && query.limit) {
            const offset = (query.page - 1) * query.limit;
            qb = qb.offset(offset).limit(query.limit);
        }

        return qb.select(
            'id',
            'employee_id',
            'date',
            'check_in_time',
            'created_at',
            'updated_at'
        );
    }

    public async getAttendanceById(id: number): Promise<IAttendance> {
        const record = await this.knex('attendance')
            .where({ id })
            .first();

        if (!record) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Attendance record not found');
        }

        return record;
    }

    public async updateAttendance(id: number, payload: Partial<IAttendanceCreateInput>): Promise<IAttendance> {
        const [updated] = await this.knex('attendance')
            .where({ id })
            .update({
                ...payload,
                updated_at: this.knex.fn.now(),
            })
            .returning(['id', 'employee_id', 'date', 'check_in_time', 'created_at', 'updated_at']);

        if (!updated) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Attendance record not found');
        }

        return updated;
    }

    public async deleteAttendance(id: number): Promise<void> {
        const deletedCount = await this.knex('attendance').where({ id }).del();

        if (deletedCount === 0) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Attendance record not found');
        }
    }
}

export const attendanceService = new AttendanceService();