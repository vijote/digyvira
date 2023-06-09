import { afterEach, describe, expect, test, vitest } from 'vitest';
import Member, { MemberType }  from './Member';
import type { UUID } from '../types';
import type { Dependencies } from './Dependencies';
import Generation from './Generation';

describe('Member', () => {
  const mockedId = `test-test-test-test-test`;
  type GenerateIdFn = () => UUID;
  const mockedGenerateId: GenerateIdFn  = vitest.fn(() => mockedId);

  function provideTestDependencies(): Dependencies {
    return {
      generateId: mockedGenerateId
    }
  }

  afterEach(() => {
    vitest.clearAllMocks();
  });

  describe("constructor", () => {
    test("sets default properties", () => {
        const member = new Member({
            dependencies: provideTestDependencies(),
            x: 1
        });

        expect(member.formatted_x).toBe(1 + "%");
        expect(member.x).toBe(1);
        expect(member.id).toBe(mockedId);
    });

    test("sets generation if provided", () => {
        const generation = new Generation({
            children: [],
            dependencies: provideTestDependencies()
        });

        const member = new Member({
            dependencies: provideTestDependencies(),
            x: 0,
            generation
        });

        expect(member.generation).toEqual(generation);
    });

    test("sets type if provided", () => {

        const member = new Member({
            dependencies: provideTestDependencies(),
            x: 0,
            type: MemberType.Female
        });

        expect(member.type).toEqual(MemberType.Female);
    });
  });

  describe("changeType", () => {
    test("switches types from male to female", () => {
        const member = new Member({
            dependencies: provideTestDependencies(),
            x: 0,
            type: MemberType.Male
        });
        
        member.changeType();

        expect(member.type).toBe(MemberType.Female);
    });

    test("switches types from female to male", () => {
        const member = new Member({
            dependencies: provideTestDependencies(),
            x: 0,
            type: MemberType.Female
        });
        
        member.changeType();

        expect(member.type).toBe(MemberType.Male);
    });
  });

  describe("buildSiblingToTheRight", () => {
    test("returns new member with the right x value", () => {
        const member = new Member({
            dependencies: provideTestDependencies(),
            x: 0
        });

        const sibling = member.buildSiblingToTheRight();

        expect(sibling.x).toBe(member.x + 35);
    });
  });

  describe("setGeneration", () => {
    test("sets generation", () => {
        const member = new Member({
            dependencies: provideTestDependencies(),
            x: 0
        });

        const generation = new Generation({
            children: [member],
            dependencies: provideTestDependencies(),
        })

        member.setGeneration(generation);

        expect(member.generation).toBe(generation);
    });
  });
});
