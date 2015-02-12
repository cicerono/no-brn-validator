var noBRNValidator    = require("../lib/no_brn_validator"),
    isValid           = noBRNValidator.isValid,
    calculateChecksum = noBRNValidator.calculateChecksum;

describe("isValid", function () {
  it("should return false for undefined", function () {
    expect(isValid(undefined)).toBe(false);
  });

  it("should return false for null", function () {
    expect(isValid(null)).toBe(false);
  });

  it("should return false for an object", function () {
    expect(isValid({})).toBe(false);
  });

  it("should return false for a number", function () {
    expect(isValid(0)).toBe(false);
  });

  it("should return false for strings less than 9 characters", function () {
    expect(isValid("97476067")).toBe(false);
  });

  it("should return false for strings more than 9 characters", function () {
    expect(isValid("9747606730")).toBe(false);
  });

  it("should return false for strings containing more than just digits", function () {
    expect(isValid("97476a673")).toBe(false);
  });

  it("should return false for a number where the checksum is wrong, but is otherwise correct", function () {
    spyOn(noBRNValidator, "calculateChecksum").and.returnValue(false);

    expect(isValid("974760673")).toBe(false);
  });

  it("should return true for a correct number", function () {
    spyOn(noBRNValidator, "calculateChecksum").and.returnValue("3");

    expect(isValid("974760673")).toBe(true);
  });
});

describe("calculateChecksum", function () {
  it("should return false for undefined", function () {
    expect(calculateChecksum(undefined)).toBe(false);
  });

  it("should return false for null", function () {
    expect(calculateChecksum(null)).toBe(false);
  });

  it("should return false for an object", function () {
    expect(calculateChecksum({})).toBe(false);
  });

  it("should return false for a number", function () {
    expect(calculateChecksum(0)).toBe(false);
  });

  it("should return false for strings less than 8 characters", function () {
    expect(calculateChecksum("1102159")).toBe(false);
  });

  it("should return false for strings more than 8 characters", function () {
    expect(calculateChecksum("110215999")).toBe(false);
  });

  it("should return 0 for 99311384", function () {
    expect(calculateChecksum("99311384")).toBe(0);
  });

  it("should return 1 for 96735840", function () {
    expect(calculateChecksum("96735840")).toBe(1);
  });

  it("should return 2 for 98763173", function () {
    expect(calculateChecksum("98763173")).toBe(2);
  });

  it("should return 3 for 91385017", function () {
    expect(calculateChecksum("91385017")).toBe(3);
  });

  it("should return 4 for 99922187", function () {
    expect(calculateChecksum("99922187")).toBe(4);
  });

  it("should return 5 for 91374288", function () {
    expect(calculateChecksum("91374288")).toBe(5);
  });

  it("should return 6 for 97586509", function () {
    expect(calculateChecksum("97586509")).toBe(6);
  });

  it("should return 7 for 99356845", function () {
    expect(calculateChecksum("99356845")).toBe(7);
  });

  it("should return 8 for 96094997", function () {
    expect(calculateChecksum("96094997")).toBe(8);
  });

  it("should return 9 for 99674026", function () {
    expect(calculateChecksum("99674026")).toBe(9);
  });

  // Using the formula would yield 10, but 10 is not allowed as a checksum.
  it("should return false for 11100000", function () {
    expect(calculateChecksum("11100000")).toBe(false);
  });
});
