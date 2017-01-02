import CreateTables from '../../scripts/createtables';
import DropTables from '../../scripts/droptables';
import SeedRoles from '../../scripts/seedrolestable';
import Role from '../../models/role.model';
// import User from '../../models/user.model';
// import Document from '../../models/document.model';


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

  it('should seed the roles database', (done) => {
    SeedRoles((completed) => {
      Role.findAll()
        .then((roles) => {
          expect(roles.length).toBe(2);
          expect(roles[0].title).toBe('admin');
          expect(roles[1].title).toBe('regular');
          completed();
        })
        .catch(() => {
          completed();
        });
    }, done);
  });
});
