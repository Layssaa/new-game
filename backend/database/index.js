const Redis = require("ioredis");

class RedisDB {
  constructor(_args) {
    if (_args) {
      this.redis = new Redis(..._args);
    } else {
      this.redis = new Redis();
    }

    this.redis.on("error", (err) => {
      console.error(err);
    });
  }

  async getDataRedis(_search) {
    return JSON.parse(await this.redis.get(_search));
  }

  async setDataRedis(_key, _send) {
    return await this.redis.set(_key, JSON.stringify(_send));
  }

  async setWinner(_send) {
    return await this.redis.set("winner", JSON.stringify(_send), 10);
  }

  async setMazeGame(_send) {
    return await this.redis.set("maze", JSON.stringify(_send), "EX", 3600);
  }

  async deleteSessionRedis(_key) {
    return await this.redis.del(_key);
  }
}

module.exports = {
  RedisDB,
};
