import CreateTables from '../../scripts/createtables';
import DropTables from '../../scripts/droptables';
import { SeedRoles, UnseedRoles } from '../../scripts/seedrolestable';
import Role from '../../models/role.model';


describe('Tests that tables are created', () => {
  beforeAll((done) => {
    CreateTables(done);
  });

  beforeEach((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    SeedRoles(done);
  });

  afterEach((done) => {
    UnseedRoles(done);
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterAll((done) => {
    DropTables(done);
  });

  it('should seed the roles database', (done) => {
    Role.findAll()
      .then((roles) => {
        expect(roles.length).toBe(2);
        expect(roles[0].title).toBe('admin');
        expect(roles[1].title).toBe('regular');
        done();
      })
      .catch(() => {
        done();
      });
  });
});
