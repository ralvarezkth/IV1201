/**
 * This class handles all user-specific communication with the database.
 */
class UserDAO {
    /**
     * if they are non-existent. 
     * @throws Throws an exception if unable to connect to the database.
            dialect: 'postgres',
            define: {
                freezeTableName: true
            },
            dialectOptions: {
