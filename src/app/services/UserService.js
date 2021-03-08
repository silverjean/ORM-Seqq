import { QueryTypes } from 'sequelize';

import BaseService from './BaseService';

export default class UserService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  async get() {
    const result = await this.execute('select * from user', QueryTypes.SELECT);

    return result;
  }

  async getById(uid) {
    const result = await this.execute(
      `select * from user where uid = ${uid}`,
      QueryTypes.SELECT
    );

    return result;
  }

  async create(name, email) {
    const result = await this.execute(
      `insert into users (name, email)
      values ('${name}', '${email}')
      returning *`,
      QueryTypes.INSERT
    );

    return result;
  }

  async update(uid, name, email) {
    const result = await this.execute(
      `update users set
      name = '${name}'
      email = '${email}'
      where uid = ${uid}
      returning *`,
      QueryTypes.UPDATE
    );

    return result;
  }

  async delete(uid) {
    await this.execute(
      `delete from post where users_uid = ${uid}`,
      QueryTypes.DELETE
    );
    await this.execute(
      `delete from users where uid = ${uid}`,
      QueryTypes.DELETE
    );
  }
}
