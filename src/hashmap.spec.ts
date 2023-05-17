import { HashMap } from "./hashmap";

describe("Hashmap", () => {
  it("should return a value when a key is set", () => {
    const map = new HashMap<InternationalId, Person>();

    const person1 = { id: "1", name: "John" };
    const person1InternationalId = {
      passportNumber: 123456789,
      issuedBy: "US",
    };

    const person2 = { id: "5", name: "Bob" };
    const person2InternationalId = {
      passportNumber: 64564524,
      issuedBy: "UK",
    };

    map.set(person1InternationalId, person1);
    map.set(person2InternationalId, person2);

    expect(map.get(person1InternationalId)).toEqual(person1);
    expect(map.get(person2InternationalId)).toEqual(person2);
  });

  it("should override a value when a key is set twice", () => {
    const map = new HashMap<InternationalId, Person>();

    const person1 = { id: "1", name: "John" };
    const person1InternationalId = {
      passportNumber: 123456789,
      issuedBy: "US",
    };

    const person1Updated = { id: "1", name: "Bob" };

    map.set(person1InternationalId, person1);
    map.set(person1InternationalId, person1Updated);

    expect(map.get(person1InternationalId)).toEqual(person1Updated);
  });

  it("should return null when the value does not exist", () => {
    const map = new HashMap<InternationalId, Person>();

    const nonExistantKey = {
      passportNumber: 123456789,
      issuedBy: "US",
    };

    expect(map.get(nonExistantKey)).toEqual(null);
  });

  it("should return its keys", () => {
    const map = new HashMap<InternationalId, Person>();

    const person1 = { id: "1", name: "John" };
    const person1InternationalId = {
      passportNumber: 123456789,
      issuedBy: "US",
    };

    const person2 = { id: "5", name: "Bob" };
    const person2InternationalId = {
      passportNumber: 64564524,
      issuedBy: "UK",
    };

    map.set(person1InternationalId, person1);
    map.set(person1InternationalId, person1);
    map.set(person1InternationalId, person1);
    map.set(person1InternationalId, person1);
    map.set(person2InternationalId, person2);
    map.set(person2InternationalId, person2);
    map.set(person2InternationalId, person2);
    map.set(person2InternationalId, person2);

    const actualKeys = map.keys();
    expect(actualKeys).toHaveLength(2);
    expect(actualKeys).toContain(person1InternationalId);
    expect(actualKeys).toContain(person2InternationalId);
  });
});

interface InternationalId {
  passportNumber: number;
  issuedBy: string;
}

interface Person {
  id: string;
  name: string;
}
