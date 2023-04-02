const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
    constructor() {
        this._pool = new Pool();
    }

    async addRefreshToken(token) {
        const result = await this._pool.query({
            text: 'INSERT INTO authentication VALUES($1)',
            values: [token],
        });
        return result.rows;
    }

    async verifyRefreshToken(token) {
        const result = await this._pool.query({
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        });
        if (!result.rowCount) {
            throw new InvariantError('Refresh Token tidak valid');
        }
    }

    async deleteRefreshToken(token) {
        const result = await this._pool.query({
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token],
        });
        return result.rows;
    }
}

module.exports = AuthenticationsService;
