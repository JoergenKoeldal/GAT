import kqlSearch, {kqlParse} from "../../src/web/kqlService";


describe("Test kqlParse method", () => {
    it("Will parse complex strings", () => {
        const expected = {
            body: ["one", "three"],
            subject: ["two", "four"]
        };
        const actual = kqlParse("body: one OR subject: two AND body: thrEE OR subject:   Four");
        expect(actual).toEqual(expected);
    })
});


describe("Test kqlSearch method", () => {
    it("Will handle complex strings", () => {
        const email = {
            body:{
                content:  "I have two dogs",
            },
                subject: "Actually I have four"
            };
        const expected = {
            body: [{start: 7, stop: 10}],
            subject: [{start: 16, stop: 20}],
        }
        const actual = kqlSearch("body: one OR subject: two OR body: Two OR subject:   Four", email);
        expect(actual).toEqual(expected);
    })
});
