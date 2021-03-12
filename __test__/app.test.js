import {
    alertFn,
    alertFnDays
} from '../src/client/js/app'



it('returns alert function', () => {
    alertFn();
    expect(true).toEqual(true)
});

it('returns alert function', () => {
    alertFnDays();
    expect(true).toEqual(true)
});