import CreateTables from '../../scripts/createtables';
import DropTables from '../../scripts/droptables';
import Role from '../../models/role.model';
import User from '../../models/user.model';
import Document from '../../models/document.model';


describe('Tests that tables are created', () => {
  beforeAll((done) => {
    CreateTables(done);
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterAll((done) => {
    DropTables(done);
  });

  it('should create the roles database', (done) => {
    Role.count()
      .then((count) => {
        expect(count).toBe(0);
        done();
      });
  });

  it('should create the users database', (done) => {
    User.count()
      .then((count) => {
        expect(count).toBe(0);
        done();
      });
  });

  it('should create the documents database', (done) => {
    Document.count()
      .then((count) => {
        expect(count).toBe(0);
        done();
      });
  });
});
