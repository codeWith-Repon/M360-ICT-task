import { getKnex } from "../../../config/knex";
import ApiError from "../../errors/ApiError";
import { IEmployee } from "./employee.interface";

class EmployeeService {
    private knex = getKnex();

    public async createEmployee(payload: IEmployee) {
        const [result] = await this.knex("employees").insert(payload).returning("*");
        return result;
    }

    public async getAllEmployees(query: any) {
        const { search, page = 1, limit = 10 } = query;
        const knexQuery = this.knex("employees").where({ is_deleted: false });

        if (search) {
            knexQuery.where("name", "ILIKE", `%${search}%`);
        }

        const data = await knexQuery
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit))
            .orderBy("id", "desc");

        return data;
    }

    public async getEmployeeById(id: string) {
        const result = await this.knex("employees").where({ id, is_deleted: false }).first();
        if (!result) {
            throw new ApiError(404, "Employee not found");
        }
        return result;
    }

    public async updateEmployee(id: string, payload: Partial<IEmployee>) {

        const [result] = await this.knex("employees")
            .where({ id, is_deleted: false })
            .update(payload)
            .returning("*");

        if (!result) {
            throw new ApiError(404, "Employee not found");
        }

        return result;
    }


    public async softDeleteEmployee(id: string) {
        const [deletedUser] = await this.knex("employees")
            .where({ id })
            .update({ is_deleted: true })
            .returning("*");

        if (!deletedUser) {
            throw new ApiError(404, "Employee not found");
        }

        return deletedUser
    }
}

export const employeeService = new EmployeeService();