import { faker } from "@faker-js/faker";
import { catagoryItems } from "../constants/mockup";
import { Blog, User } from "@/lib/features/blog/blogSlice";

export function createRandomUser(): User {
  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name: faker.person.firstName() + " " + faker.person.lastName(),
    verified: Math.random() > 0.5,
    bio: faker.person.bio(),
    username: faker.internet.userName(),
    link: faker.internet.url(),
  };
}

function createRandomTags(): string[] {
  return new Array(Math.floor(Math.random() * 5))
    .fill(null)
    .map(faker.lorem.word);
}
export function createRandomBlog(): Blog {
  return {
    id: faker.string.uuid(),
    author: createRandomUser(),
    content: faker.lorem.paragraph(),
    image: Math.random() > 0.5 ? faker.image.url() : undefined,
    title: faker.lorem.sentence(),
    tags: createRandomTags(),
    room: catagoryItems[Math.floor(Math.random() * catagoryItems.length)].label,
  };
}

export function generateThreads(): Blog[] {
  return new Array(50).fill(null).map(createRandomBlog);
}
