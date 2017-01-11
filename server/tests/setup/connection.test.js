import { currentEnvironment, sequelizeInstance } from '../../database/connection';


describe('Test the database connection', () => {
  it('should have the correct environment', () => {
    expect(currentEnvironment).toBe('test');
    if (!process.env.NODE_ENV) {
      expect(currentEnvironment).toBe('development');
    }
  });

  it('should connect to the database', (done) => {
    sequelizeInstance.authenticate()
      .then((err) => {
        expect(err).toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });
  });
});
