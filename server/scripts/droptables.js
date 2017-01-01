import { dropTables } from '../database/manageTables';

export default (done) => {
  dropTables(done);
};
