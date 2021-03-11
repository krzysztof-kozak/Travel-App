import {
    axios
} from '../src/client/js/app';



describe('check if axios defined', () => {
    test('check if axios defined', () => {
        expect(axios).toBeDefined();
    })
})