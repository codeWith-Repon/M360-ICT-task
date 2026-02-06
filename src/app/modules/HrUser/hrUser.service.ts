import { getKnex } from "../../../config/knex";
import ApiError from "../../errors/ApiError";
import { IHRUserCreateInput, IHRUserResponse } from "./hrUser.interface";
import HttpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../../config";

const knex = getKnex();

const createHrUser = async (payload: IHRUserCreateInput): Promise<IHRUserResponse> => {
    const existingUser = await knex("hr_users")
        .where({ email: payload.email })
        .first();

    if (existingUser) {
        throw new ApiError(HttpStatus.CONFLICT, "User already exists");
    }

    const password_hash = await bcrypt.hash(payload.password, Number(config.bcryptSaltRounds))

    const [newUser] = await knex("hr_users")
        .insert({
            name: payload.name,
            email: payload.email,
            password_hash
        })
        .returning(["id", "name", "email", "created_at", "updated_at"]);

    return newUser;
}

const getUserByEmail = async (email: string): Promise<IHRUserResponse | null> => {
    const [user] = await knex("hr_users")
        .where('email', email)
        .select("id", "name", "email", "created_at", "updated_at");

    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
    }

    return user
}

const getMe = async (email: string): Promise<IHRUserResponse | null> => {
    const [user] = await knex("hr_users")
        .where('email', email)
        .select("id", "name", "email", "created_at", "updated_at");

    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
    }

    return user
}

const getAllHrUser = async (): Promise<IHRUserResponse[]> => {
    const users = await knex("hr_users")
        .select("id", "name", "email", "created_at", "updated_at");

    return users
}

const updateHrUser = async (email: string, payload: IHRUserCreateInput): Promise<IHRUserResponse | null> => {

    const existingUser = await knex("hr_users")
        .where({ email: email })
        .first();

    if (!existingUser) {
        throw new ApiError(HttpStatus.NOT_FOUND, "User not found!!");
    }

    if (payload.email) {
        const user = await knex("hr_users")
            .where({ email: payload.email })
            .first();

        if (user) {
            throw new ApiError(HttpStatus.CONFLICT, "This email already exists. Please use another email.");
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, Number(config.bcryptSaltRounds))
    }

    const [user] = await knex("hr_users")
        .where("email", email)
        .update({
            name: payload.name || existingUser.name,
            email: payload.email || existingUser.email,
            password_hash: payload.password || existingUser.password_hash
        })
        .returning(["id", "name", "email", "created_at", "updated_at"]);

    return user;
}

const deleteHrUser = async (email: string): Promise<IHRUserResponse> => {
    const [user] = await knex("hr_users")
        .where("email", email)
        .del()
        .returning(["id", "name", "email", "created_at", "updated_at"]);

    return user;
}

export const HrUserService = {
    createHrUser,
    getUserByEmail,
    getMe,
    getAllHrUser,
    updateHrUser,
    deleteHrUser
}