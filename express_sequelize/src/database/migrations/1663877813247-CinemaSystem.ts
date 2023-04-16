// import { QueryInterface } from 'sequelize';

// export default {
//   /**
//    # ToDo: Create a migration that creates all tables for the following user stories

//    For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
//    To not introduce additional complexity, please consider only one cinema.

//    Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

//    ## User Stories

//    **Movie exploration**
//    * As a user I want to see which films can be watched and at what times
//    * As a user I want to only see the shows which are not booked out

//    **Show administration**
//    * As a cinema owner I want to run different films at different times
//    * As a cinema owner I want to run multiple films at the same time in different showrooms

//    **Pricing**
//    * As a cinema owner I want to get paid differently per show
//    * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

//    **Seating**
//    * As a user I want to book a seat
//    * As a user I want to book a vip seat/couple seat/super vip/whatever
//    * As a user I want to see which seats are still available
//    * As a user I want to know where I'm sitting on my ticket
//    * As a cinema owner I don't want to configure the seating for every show
//    */
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   up: (queryInterface: QueryInterface): Promise<void> => {
//     throw new Error('TODO: implement migration in task 4');
//   },

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   down: (queryInterface: QueryInterface) => {
//     // do nothing
//   },
// };

import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Movies', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('Showtimes', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('Showrooms', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('ShowroomSchedules', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      showroom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Showrooms',
          key: 'id',
        },
      },
      showtime_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Showtimes',
          key: 'id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('SeatTypes', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      premium_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('Seats', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      showroom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Showrooms',
          key: 'id',
        },
      },
      seat_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'SeatTypes',
          key: 'id',
        },
      },
      row: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      column: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('Bookings', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      showroom_schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ShowroomSchedules',
          key: 'id',
        },
      },
      seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Seats',
          key: 'id',
        },
      },
      amount_paid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('Showtimes', ['movie_id']);
    await queryInterface.addIndex('ShowroomSchedules', ['showroom_id', 'showtime_id']);
    await queryInterface.addIndex('Seats', ['showroom_id']);
    await queryInterface.addIndex('Seats', ['seat_type_id']);
    await queryInterface.addIndex('Bookings', ['showroom_schedule_id', 'seat_id']);
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Bookings');
    await queryInterface.dropTable('Seats');
    await queryInterface.dropTable('SeatTypes');
    await queryInterface.dropTable('ShowroomSchedules');
    await queryInterface.dropTable('Showrooms');
    await queryInterface.dropTable('Showtimes');
    await queryInterface.dropTable('Movies');
  },
};