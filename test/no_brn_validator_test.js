import {expect} from "chai";
import sinon from "sinon";

import noBRNValidator from "../lib/no_brn_validator";

var {isValid, calculateChecksum} = noBRNValidator;

describe("noBRNValidator", () => {
  var sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe(".isValid()", () => {
    it("should return false for undefined", () => {
      expect(isValid(undefined)).to.equal(false);
    });

    it("should return false for null", () => {
      expect(isValid(null)).to.equal(false);
    });

    it("should return false for an object", () => {
      expect(isValid({})).to.equal(false);
    });

    it("should return false for a number", () => {
      expect(isValid(0)).to.equal(false);
    });

    it("should return false for strings less than 9 characters", () => {
      expect(isValid("97476067")).to.equal(false);
    });

    it("should return false for strings more than 9 characters", () => {
      expect(isValid("9747606730")).to.equal(false);
    });

    it("should return false for strings containing more than just digits", () => {
      expect(isValid("97476a673")).to.equal(false);
    });

    it("should return false for a number where the checksum is wrong, but is otherwise correct", () => {
      sandbox.stub(noBRNValidator, "calculateChecksum").returns(false);

      expect(isValid("974760673")).to.equal(false);
    });

    it("should return true for a correct number", () => {
      sandbox.stub(noBRNValidator, "calculateChecksum").returns("3");

      expect(isValid("974760673")).to.equal(true);
    });
  });

  describe(".calculateChecksum()", () => {
    it("should return false for undefined", () => {
      expect(calculateChecksum(undefined)).to.equal(false);
    });

    it("should return false for null", () => {
      expect(calculateChecksum(null)).to.equal(false);
    });

    it("should return false for an object", () => {
      expect(calculateChecksum({})).to.equal(false);
    });

    it("should return false for a number", () => {
      expect(calculateChecksum(0)).to.equal(false);
    });

    it("should return false for strings less than 8 characters", () => {
      expect(calculateChecksum("1102159")).to.equal(false);
    });

    it("should return false for strings more than 8 characters", () => {
      expect(calculateChecksum("110215999")).to.equal(false);
    });

    it("should return 0 for 99311384", () => {
      expect(calculateChecksum("99311384")).to.equal(0);
    });

    it("should return 1 for 96735840", () => {
      expect(calculateChecksum("96735840")).to.equal(1);
    });

    it("should return 2 for 98763173", () => {
      expect(calculateChecksum("98763173")).to.equal(2);
    });

    it("should return 3 for 91385017", () => {
      expect(calculateChecksum("91385017")).to.equal(3);
    });

    it("should return 4 for 99922187", () => {
      expect(calculateChecksum("99922187")).to.equal(4);
    });

    it("should return 5 for 91374288", () => {
      expect(calculateChecksum("91374288")).to.equal(5);
    });

    it("should return 6 for 97586509", () => {
      expect(calculateChecksum("97586509")).to.equal(6);
    });

    it("should return 7 for 99356845", () => {
      expect(calculateChecksum("99356845")).to.equal(7);
    });

    it("should return 8 for 96094997", () => {
      expect(calculateChecksum("96094997")).to.equal(8);
    });

    it("should return 9 for 99674026", () => {
      expect(calculateChecksum("99674026")).to.equal(9);
    });

    // Using the formula would yield 10, but 10 is not allowed as a checksum.
    it("should return false for 11100000", () => {
      expect(calculateChecksum("11100000")).to.equal(false);
    });
  });
});
