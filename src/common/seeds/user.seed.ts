import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const userSeeds = [
  {
    id: '1',
    phoneNumber: '010-1111-1111',
    nickname: '책읽는고양이',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1995',
    gender: '여성',
    location: '37.5665, 126.9780',
  },
  {
    id: '2',
    phoneNumber: '010-2222-2222',
    nickname: '독서왕',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1990',
    gender: '남성',
    location: '37.5665, 126.9780',
  },
  {
    id: '3',
    phoneNumber: '010-3333-3333',
    nickname: '책벌레',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1998',
    gender: '여성',
    location: '37.5665, 126.9780',
  },
  {
    id: '4',
    phoneNumber: '010-4444-4444',
    nickname: '문학청년',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1992',
    gender: '남성',
    location: '37.5665, 126.9780',
  },
  {
    id: '5',
    phoneNumber: '010-5555-5555',
    nickname: '책사랑',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1994',
    gender: '여성',
    location: '37.5665, 126.9780',
  },
  {
    id: '6',
    phoneNumber: '010-6666-6666',
    nickname: '독서광',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1991',
    gender: '남성',
    location: '37.5665, 126.9780',
  },
  {
    id: '7',
    phoneNumber: '010-7777-7777',
    nickname: '책마니아',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1993',
    gender: '여성',
    location: '37.5665, 126.9780',
  },
  {
    id: '8',
    phoneNumber: '010-8888-8888',
    nickname: '문학소녀',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1997',
    gender: '여성',
    location: '37.5665, 126.9780',
  },
  {
    id: '9',
    phoneNumber: '010-9999-9999',
    nickname: '책임감',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1989',
    gender: '남성',
    location: '37.5665, 126.9780',
  },
  {
    id: '10',
    phoneNumber: '010-0000-0000',
    nickname: '독서천재',
    passwordHash: bcrypt.hashSync('password123', 10),
    birthYear: '1996',
    gender: '남성',
    location: '37.5665, 126.9780',
  },
];

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  
  for (const userData of userSeeds) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
  }
}; 