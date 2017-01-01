import config from '../../config/config';

describe('App Configuration', () => {
  it('should load the connection config', () => {
    expect(config.test).toBeDefined();
    expect(config.test.username).toBe(process.env.TEST_DB_USER);
    expect(config.test.password).toBe(process.env.TEST_DB_PASS);
    expect(config.test.database).toBe(process.env.TEST_DB_NAME);
  });
});
