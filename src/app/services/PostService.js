import { QueryTypes } from 'sequelize';

import BaseService from './BaseService';

export default class PostService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  async get() {
    const result = await this.execute('select * from posts', QueryTypes.SELECT);

    return result;
  }

  async getById(usersUid) {
    const result = await this.execute(
      `select * from posts where usersUid = ${usersUid}`,
      QueryTypes.SELECT
    );

    return result;
  }

  async create(content) {
    const result = await this.execute(
      `insert into posts (content)
      values ('${content}')
      returning *`,
      QueryTypes.INSERT
    );

    return result;
  }

  async update(uid, usersUid, content) {
    const result = await this.execute(
      `update posts set
      content = '${content}'
      where users_uid = ${usersUid} and uid = ${uid}
      returning *`,
      QueryTypes.UPDATE
    );

    return result;
  }

  async delete(uid) {
    await this.execute(
      `delete from posts where uid = ${uid}`,
      QueryTypes.DELETE
    );
  }
}
