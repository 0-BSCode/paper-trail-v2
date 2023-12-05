import { Seeder } from "../../config/db.config";

const seedUsers = [
  {
    id: 1,
    email: "bryan.sanchez@usc.edu.ph",
    password: "$2b$10$URq.WnApWY.iNnZMQa4jcOlC/hjnZR4wv.1E1sN2wYI088XVnx.O2",
    student_id_number: "20101466",
    full_name: "Bryan Ignatius Sanchez",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    email: "christian.dejesus@usc.edu.ph",
    password: "$2b$10$i3KaIbiHdt.6Ejv9kMJlh.oAS9gBnWXdQmmAZp7Z9JoKb8nNy76lG",
    student_id_number: "22101295",
    full_name: "Christian Antonio IV L. de Jesus",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    email: "samuel.bonghanoy@usc.edu.ph",
    password: "$2b$10$f5MFKbiBoFzMk7fwbnN0AebCP9NaMXLQcMLU42HGiHX8FaKCeN9MS",
    student_id_number: "20103261",
    full_name: "Samuel Ethan Bonghanoy",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 4,
    email: "fitzsixto.singh@usc.edu.ph",
    password: "$2b$10$eVR88f0BKGpyNLNXWY47deVuYRn5WSk7AwS.sk98wG8HQ8cOsO4jS",
    student_id_number: "20103994",
    full_name: "Fitzsixto Angelo Singh",
    created_at: new Date(),
    updated_at: new Date()
  }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("user", seedUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("user", { id: seedUsers.map((u) => u.id) });
};
